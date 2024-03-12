const chai = require('chai')
const { deployments, ethers, upgrades } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

const { signMintData } = require('./_utils')

chai.use(deep_equal)

const { expect } = chai

const cardsContractName = 'WildForestCards'
const cardsContractSymbol = `WFC`
const baseTokenURI = 'https://localhost:3000/nfts/'

const deploy = async () => {
  await deployments.fixture()
  const accounts = await ethers.getSigners()
  const [owner, alice, bob, steve] = accounts
  const ownerAddress = await owner.getAddress()

  const WildForestNft = await ethers.getContractFactory("WildForestNft")
  const nftContract = await upgrades.deployProxy(WildForestNft, [cardsContractName, cardsContractSymbol, baseTokenURI, ownerAddress])
  // const nftContract = await WildForestNft.deploy(cardsContractName, cardsContractSymbol, baseTokenURI, ownerAddress)

  return {
    owner: {
      contract: nftContract,
      address: ownerAddress,
      signer: owner,
    },
    alice: {
      contract: await nftContract.connect(alice),
      address: await alice.getAddress(),
      signer: alice,
    },
    bob: {
      contract: await nftContract.connect(bob),
      address: await bob.getAddress(),
      signer: bob,
    },
    steve: {
      contract: await nftContract.connect(steve),
      address: await steve.getAddress(),
      signer: steve,
    },
  }
}

const deployWithAliceOwner = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()
  const aliceOwnerAddress = await alice.getAddress()

  const WildForestNft = await ethers.getContractFactory("WildForestNft")
  const nftContract = await upgrades.deployProxy(WildForestNft, [cardsContractName, cardsContractSymbol, baseTokenURI, aliceOwnerAddress])
  // const nftContract = await WildForestNft.deploy(cardsContractName, cardsContractSymbol, baseTokenURI, aliceOwnerAddress)

  return {
    owner: {
      contract: nftContract,
      address: await owner.getAddress(),
      signer: owner,
    },
    alice: {
      contract: await nftContract.connect(alice),
      address: aliceOwnerAddress,
      signer: alice,
    },
    bob: {
      contract: await nftContract.connect(bob),
      address: await bob.getAddress(),
      signer: bob,
    },
    steve: {
      contract: await nftContract.connect(steve),
      address: await steve.getAddress(),
      signer: steve,
    },
  }
}

// keccak256('MINTER_ROLE')
const keccak256MinterRole = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
const keccak256PauserRole = '0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a'
const keccak256DefaultAdminRole = '0x0000000000000000000000000000000000000000000000000000000000000000'

const transfer_event = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)
    .then(([{ args }]) => args)

const transfer_events = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)
    .then((events) => {
      return events.filter(e => e.event === 'Transfer')
    })

describe('WildForestNft', function () {
  it('Minting should be available only for owner (error when other trying)', async () => {
    const { alice, bob, steve } = await deploy()
    const recipients = [bob.address, steve.address]
    await expect(alice.contract.bulkMint(recipients)).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${keccak256MinterRole}`
    )
  })
  // revertedWithCustomError

  it('Minting should be available only for owner (success on owner)', async () => {
    const { owner, bob, steve } = await deploy()
    const recipients = [bob.address, steve.address]
    const mint_transaction = await owner.contract.bulkMint(recipients)
    const { _tokenId } = await transfer_event(mint_transaction)
    await expect(Number(_tokenId)).to.equal(1)

    const events = await transfer_events(mint_transaction)
    await expect(events.length).to.equal(recipients.length)
  })

  it('_mintFor should be NOT available', async () => {
    const { bob } = await deploy()

    let notExistsMethodError
    try {
      await bob.contract._mintFor(bob.address)
    } catch(error) {
      notExistsMethodError = error
    }

    expect(notExistsMethodError).to.be.not.undefined // eslint-disable-line
  })

  it('_mint should be NOT available', async () => {
    const { bob } = await deploy()

    let notExistsMethodError
    try {
      await bob.contract._mint(bob.address)
    } catch(error) {
      notExistsMethodError = error
    }

    expect(notExistsMethodError).to.be.not.undefined // eslint-disable-line
  })

  it('UserMint should be available only with correct signature', async () => {
    const { owner, bob } = await deploy()
    const deadlineExpired = BigInt((await ethers.provider.getBlock('latest')).timestamp) // + 60 * 60 * 24
    const deadline = BigInt((await ethers.provider.getBlock('latest')).timestamp + 60 * 60 * 24)

    const expiredMintData = {
      walletAddress: bob.address,
      nonce: 0,
      deadline: deadlineExpired,
    }

    const mintData = {
      walletAddress: bob.address,
      nonce: 0,
      deadline,
    }

    const verififyingContractAddress = await bob.contract.address
    const expiredSignature = await signMintData(owner.signer, expiredMintData, cardsContractName, verififyingContractAddress)
    const signature = await signMintData(owner.signer, mintData, cardsContractName, verififyingContractAddress)

    const invalidContractAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    const invalidAddressSignature = await signMintData(owner.signer, mintData, cardsContractName, invalidContractAddress)

    await expect(owner.contract.userMint(mintData, signature)).to.be.revertedWith(
      'Caller address is not MintData.walletAddress'
    )

    await expect(bob.contract.userMint(expiredMintData, expiredSignature)).to.be.revertedWithCustomError(
      bob.contract, 'Expired'
    )

    await expect(bob.contract.userMint(mintData, signature)).to.be.revertedWithCustomError(
      bob.contract, 'InvalidSignature'
    )

    await owner.contract.setUserMintSigner(owner.address)

    const invalidData = Object.assign({}, mintData, { nonce: 1 })
    await expect(bob.contract.userMint(invalidData, signature)).to.be.revertedWithCustomError(
      bob.contract, 'InvalidSignature'
    )

    await expect(bob.contract.userMint(mintData, invalidAddressSignature)).to.be.revertedWithCustomError(
      bob.contract, 'InvalidSignature'
    )

    // await expect(bob.contract.userMint(mintData, signature)).not.to.be.reverted
    const mint_transaction = await bob.contract.userMint(mintData, signature)
    const { _tokenId } = await transfer_event(mint_transaction)
    await expect(Number(_tokenId)).to.equal(1)
    await expect(bob.contract['burn(uint256)'](Number(_tokenId))).not.to.be.reverted

    await expect(bob.contract.userMint(mintData, signature)).to.be.revertedWithCustomError(
      bob.contract,
      'NonceAlreadyUsed'
    )
  })

  // NOTE: we need to override methods to make owner be able burn trandfed token (e.g. added his to approved scope)
  it('The _burn function should be a simple override', async () => {
    const { owner, bob } = await deploy()

    const mint_transaction = await owner.contract.mint(bob.address)
    const { _tokenId } = await transfer_event(mint_transaction)
    await expect(bob.contract['burn(uint256)'](Number(_tokenId))).not.to.be.reverted
  })

  it('The supportsInterface function should be a simple override', async () => {
    const { steve } = await deploy()

    await expect(steve.contract.supportsInterface(0xda0d82f5)).not.to.be.reverted
  })

  it('Only Admin can call admin', async () => {
    const { owner, steve } = await deploy()

    await expect(steve.contract.mint(owner.address)).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have minter role to mint'
    )
  })

  it('The stateOf function should be just called', async () => {
    const { owner, steve } = await deploy()

    await owner.contract.mint(steve.address)
    const response = await steve.contract.stateOf(1)

    expect(response).not.to.be.undefined // eslint-disable-line
  })

  it('Admin can setBaseURI', async () => {
    const { owner, bob } = await deploy()
    await expect(owner.contract.setBaseURI('http:localhost:4000')).not.to.be.reverted

    await expect(bob.contract.setBaseURI('http:localhost:5000')).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role ${keccak256DefaultAdminRole}`
    )
  })

  it('Only admin can paus and unpause transfers', async () => {
    const { owner, alice } = await deploy()

    await expect(alice.contract.pause()).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have pauser role to pause'
    )
    await expect(owner.contract.pause()).not.to.be.reverted

    await expect(alice.contract.unpause()).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have pauser role to unpause'
    )
    await expect(owner.contract.unpause()).not.to.be.reverted
  })

  it('Anyone can retrieve tokens of an user', async () => {
    const { owner, bob, alice } = await deploy()

    await owner.contract.bulkMint([bob.address])

    for (
      let token_index = 0;
      token_index < (await alice.contract.balanceOf(bob.address));
      token_index++
    ) {
      const tokenId = await alice.contract[
        'tokenOfOwnerByIndex(address,uint256)'
      ](bob.address, token_index)
      expect(await alice.contract['tokenURI(uint256)'](tokenId)).to.equal(
        `${baseTokenURI}1`
      )
    }
  })

  it('Only the owner of token can burn a token', async () => {
    const { owner, bob, alice } = await deploy()
    await owner.contract.bulkMint([bob.address])

    await expect(alice.contract.burn(1)).to.be.revertedWith(
      'ERC721: caller is not token owner or approved'
    )
    await expect(bob.contract.burn(1)).to.not.be.reverted
  })

  it('Only the owner of token can bulkBurn a token', async () => {
    const { owner, bob, alice } = await deploy()
    await owner.contract.bulkMint([bob.address, bob.address])

    await expect(alice.contract.bulkBurn([1,2])).to.be.revertedWith(
      'ERC721: caller is not token owner or approved'
    )
    await expect(bob.contract.bulkBurn([1,2])).to.not.be.reverted
  })

  it('owner can mint several tokens to the same address', async () => {
    const { owner, bob } = await deploy()
    const addresses = [bob.address, bob.address, bob.address, bob.address]
    const mint_transaction = await owner.contract.bulkMint(addresses)

    const events = await transfer_events(mint_transaction)
    expect(events.length).to.equal(addresses.length)

    expect(Number(events[0].args.tokenId)).to.equal(1)
    expect(events[0].args.to).to.equal(addresses[0])

    expect(Number(events[1].args.tokenId)).to.equal(2)
    expect(events[1].args.to).to.equal(addresses[1])

    expect(Number(events[2].args.tokenId)).to.equal(3)
    expect(events[2].args.to).to.equal(addresses[2])

    expect(Number(events[3].args.tokenId)).to.equal(4)
    expect(events[3].args.to).to.equal(addresses[3])
  })

  it('Approved addresses also can burn a token', async () => {
    const { owner, bob, alice } = await deploy()
    await owner.contract.bulkMint([bob.address])

    await expect(alice.contract.burn(1)).to.be.revertedWith(
      'ERC721: caller is not token owner or approved'
    )

    await expect(bob.contract.approve(alice.address, 1)).to.not.be.reverted

    await expect(alice.contract.burn(1)).to.not.be.reverted
  })

  it('owner can do bulkApprove only for tokens which he owns', async () => {
    const { owner, bob, alice, steve } = await deploy()
    await owner.contract.bulkMint([bob.address, bob.address, alice.address])

    await expect(bob.contract.bulkApprove(steve.address, [1,2,3])).to.be.revertedWith(
      'ERC721: approve caller is not token owner or approved for all'
    )

    await expect(bob.contract.bulkApprove(bob.address, [1,2])).to.be.revertedWith(
      'ERC721: approval to current owner'
    )

    await expect(bob.contract.bulkApprove(alice.address, [1,2])).to.not.be.reverted

    await expect(alice.contract.burn(1)).to.not.be.reverted
    await expect(alice.contract.burn(2)).to.not.be.reverted
  })

  it('bulkApprove with empty array and with invalid token ids', async () => {
    const { bob, alice } = await deploy()

    await expect(bob.contract.bulkApprove(alice.address, [])).to.be.revertedWith(
      'WildForestNft: invalid array lengths'
    )

    await expect(bob.contract.bulkApprove(bob.address, [5])).to.be.revertedWith(
      'ERC721: invalid token ID'
    )
  })

  it('setApprovalForAll user can set some member as approved for all tokens', async () => {
    const { owner, bob, alice } = await deploy()
    await owner.contract.bulkMint([bob.address, bob.address])

    await expect(bob.contract.setApprovalForAll(owner.address, true)).to.not.be.reverted
    await expect(owner.contract.burn(1)).to.not.be.reverted

    await expect(owner.contract.bulkApprove(alice.address, [2])).to.not.be.reverted
    await expect(alice.contract.burn(2)).to.not.be.reverted
  })

  it('Minter and admin role available for custom owner (Alice)', async () => {
    const { owner, bob, alice } = await deployWithAliceOwner()
    const recipients = [bob.address, owner.address]
    const mint_transaction = await alice.contract.bulkMint(recipients)
    const { _tokenId } = await transfer_event(mint_transaction)
    await expect(Number(_tokenId)).to.equal(1)

    const events = await transfer_events(mint_transaction)
    await expect(events.length).to.equal(recipients.length)

    await expect(owner.contract.bulkMint(recipients)).to.be.revertedWith(
      `AccessControl: account ${owner.address.toLowerCase()} is missing role ${keccak256MinterRole}`
    )

    await expect(alice.contract.setBaseURI('http:localhost:4000')).not.to.be.reverted

    await expect(owner.contract.setBaseURI('http:localhost:5000')).to.be.revertedWith(
      `AccessControl: account ${owner.address.toLowerCase()} is missing role ${keccak256DefaultAdminRole}`
    )

    await expect(owner.contract.pause()).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have pauser role to pause'
    )
    await expect(alice.contract.pause()).not.to.be.reverted
    await expect(alice.contract.unpause()).not.to.be.reverted
  })

  it('Minter and admin role available for custom owner (Alice) after granting permissions to it and revoke permissions from previous admin', async () => {
    const DEFAULT_ADMIN_ROLE = keccak256DefaultAdminRole
    const MINTER_ROLE = keccak256MinterRole
    const PAUSER_ROLE = keccak256PauserRole

    const { owner, bob, alice } = await deploy()
    const grantAdminTransaction = await owner.contract.grantRole(DEFAULT_ADMIN_ROLE, alice.address)
    await transfer_event(grantAdminTransaction)

    const grantMinterTransaction = await owner.contract.grantRole(MINTER_ROLE, alice.address)
    await transfer_event(grantMinterTransaction)

    const grantPauserTransaction = await owner.contract.grantRole(PAUSER_ROLE, alice.address)
    await transfer_event(grantPauserTransaction)
    // ------
    const revokeMinterTransaction = await owner.contract.revokeRole(MINTER_ROLE, owner.address)
    await transfer_event(revokeMinterTransaction)

    const revokePauserTransaction = await owner.contract.revokeRole(PAUSER_ROLE, owner.address)
    await transfer_event(revokePauserTransaction)

    const revokeAdminTransaction = await owner.contract.revokeRole(DEFAULT_ADMIN_ROLE, owner.address)
    await transfer_event(revokeAdminTransaction)

    await expect(owner.contract.grantRole(MINTER_ROLE, bob.address)).to.be.revertedWith(
      `AccessControl: account ${owner.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
    )

    await expect(alice.contract.grantRole(MINTER_ROLE, bob.address)).not.to.be.reverted

    const recipients = [bob.address, owner.address]
    const mint_transaction = await alice.contract.bulkMint(recipients)
    const { _tokenId } = await transfer_event(mint_transaction)
    await expect(Number(_tokenId)).to.equal(1)

    const events = await transfer_events(mint_transaction)
    await expect(events.length).to.equal(recipients.length)

    await expect(owner.contract.bulkMint(recipients)).to.be.revertedWith(
      `AccessControl: account ${owner.address.toLowerCase()} is missing role ${keccak256MinterRole}`
    )

    await expect(alice.contract.setBaseURI('http:localhost:4000')).not.to.be.reverted

    await expect(owner.contract.setBaseURI('http:localhost:5000')).to.be.revertedWith(
      `AccessControl: account ${owner.address.toLowerCase()} is missing role ${keccak256DefaultAdminRole}`
    )

    await expect(owner.contract.pause()).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have pauser role to pause'
    )
    await expect(alice.contract.pause()).not.to.be.reverted
    await expect(alice.contract.unpause()).not.to.be.reverted
  })
})
