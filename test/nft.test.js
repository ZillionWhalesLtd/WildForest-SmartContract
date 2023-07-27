const chai = require('chai')
const { deployments, ethers } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

chai.use(deep_equal)

const { expect } = chai

const cardsContractName = 'ZillionWhalesCards'
const cardsContractSymbol = `WHC`
const baseTokenURI = 'https://localhost:3000/nfts/'

const deploy = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()

  const ZillionWhalesNft = await ethers.getContractFactory("ZillionWhalesNft")
  const nftContract = await ZillionWhalesNft.deploy(cardsContractName, cardsContractSymbol, baseTokenURI)

  return {
    owner: {
      contract: nftContract,
      address: await owner.getAddress(),
    },
    alice: {
      contract: await nftContract.connect(alice),
      address: await alice.getAddress(),
    },
    bob: {
      contract: await nftContract.connect(bob),
      address: await bob.getAddress(),
    },
    steve: {
      contract: await nftContract.connect(steve),
      address: await steve.getAddress(),
    },
  }
}

// keccak256('MINTER_ROLE')
const keccak256MinterRole = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
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

describe('ZillionWhalesNft', function () {
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
      'ZillionWhalesNft: invalid array lengths'
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
})
