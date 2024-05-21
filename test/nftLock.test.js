const chai = require('chai')
const { deployments, ethers, upgrades } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

chai.use(deep_equal)

const { expect } = chai

const contractName = 'WildForestUnitsClaim'
const cardsContractName = 'WildForestCards'
const cardsContractSymbol = `WFC`
const baseTokenURI = 'https://localhost:3000/nfts/'

const lockPeriod = 10

const all_events = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)

let nftContractAddress

const deploy = async () => {
  await deployments.fixture()
  const accounts = await ethers.getSigners()
  const [owner, alice, bob, steve] = accounts
  const ownerAddress = await owner.getAddress()

  const WildForestNft = await ethers.getContractFactory("WildForestNft")
  const nftContract = await upgrades.deployProxy(WildForestNft, [cardsContractName, cardsContractSymbol, baseTokenURI, ownerAddress])

  nftContractAddress = nftContract.address

  const WildForestLockNft = await ethers.getContractFactory("WildForestLockNft")
  const lockContract = await upgrades.deployProxy(WildForestLockNft, [contractName, ownerAddress, nftContractAddress, lockPeriod])

  return {
    owner: {
      contract: lockContract,
      nftContract,
      address: ownerAddress,
      signer: owner,
    },
    alice: {
      contract: await lockContract.connect(alice),
      address: await alice.getAddress(),
      signer: alice,
    },
    bob: {
      contract: await lockContract.connect(bob),
      nftContract: nftContract.connect(bob),
      address: await bob.getAddress(),
      signer: bob,
    },
    steve: {
      contract: await lockContract.connect(steve),
      address: await steve.getAddress(),
      signer: steve,
    },
  }
}

describe('WildForestLockNft', function () {
  it('initialize not available second time', async () => {
    const { owner } = await deploy()
    await expect(owner.contract.initialize(contractName, owner.address, owner.address, nftContractAddress, lockPeriod)).to.be.revertedWith(
      'Initializable: contract is already initialized'
    )
  })

  it('setNftLockPeriod should be available only for admin', async () => {
    const { owner, bob } = await deploy()

    const newLockPeriod = 1
    await expect(bob.contract.setNftLockPeriod(newLockPeriod)).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
    )

    const set_transaction = await owner.contract.setNftLockPeriod(newLockPeriod)
    const events = await all_events(set_transaction)

    const setLockPeriodEvent = events.find(e => e.event === 'LockPeriodChanged')
    const { args: { lockPeriod } } = setLockPeriodEvent
    expect(lockPeriod).to.equal(newLockPeriod)
  })

  it('setNftContractAddress should be available only for admin', async () => {
    const { owner, bob } = await deploy()

    await expect(bob.contract.setNftContractAddress(nftContractAddress)).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
    )

    const set_transaction = await owner.contract.setNftContractAddress(nftContractAddress)
    const events = await all_events(set_transaction)

    const setSignerEvent = events.find(e => e.event === 'NftContractChanged')
    const { args: { nftContractAddress: updatedContract } } = setSignerEvent
    expect(updatedContract).to.equal(nftContractAddress)
  })

  it('deposit should be available only if user approved and own token', async () => {
    const { owner, bob } = await deploy()

    await expect(bob.contract.deposit([1])).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
    )

    const mintTransaction = await owner.nftContract.bulkMint([owner.address, owner.address])
    const mintTransactionEvents = await all_events(mintTransaction)
    const mintEvents = events.filter(e => e.event === 'DepositLock')

    const depositTransaction = await owner.contract.deposit([nftId])
    const events = await all_events(depositTransaction)

    const depositLockEvent = events.find(e => e.event === 'DepositLock')
    const { args: { account, tokenIds, lockPeriod: currentLockPeriod } } = depositLockEvent
    expect(account).to.equal(owner.address)
    expect(tokenIds.length).to.equal(1)
    expect(currentLockPeriod).to.equal(lockPeriod)
  })

  // it('UserMint should be available only with correct signature', async () => {
  //   const { owner, bob } = await deploy()

  //   const deadlineExpired = BigInt((await ethers.provider.getBlock('latest')).timestamp) // + 60 * 60 * 24
  //   const deadline = BigInt((await ethers.provider.getBlock('latest')).timestamp + 60 * 60 * 24)

  //   const playerId = '660e8400-e29b-41d4-a716-446655441234'

  //   const expiredMintData = {
  //     walletAddress: bob.address,
  //     playerId,
  //     identificators: ['550e8400-e29b-41d4-a716-446655440000'],
  //     deadline: deadlineExpired,
  //   }

  //   const exceededIdentificators = []
  //   for (let _i = 0; _i < MAXIMUM_THRESHOLD; _i++) {
  //     exceededIdentificators.push('550e8400-e29b-41d4-a716-446655440000')
  //   }
  //   const exceededMaximumMintData = {
  //     walletAddress: bob.address,
  //     playerId,
  //     identificators: exceededIdentificators,
  //     deadline,
  //   }

  //   const mintData = {
  //     walletAddress: bob.address,
  //     playerId,
  //     identificators: ['550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'],
  //     deadline,
  //   }

  //   const verififyingContractAddress = await bob.contract.address
  //   const expiredSignature = await signMintData(owner.signer, expiredMintData, contractName, verififyingContractAddress)
  //   const exceededMaxSignature = await signMintData(owner.signer, exceededMaximumMintData, contractName, verififyingContractAddress)
  //   const signature = await signMintData(owner.signer, mintData, contractName, verififyingContractAddress)

  //   const invalidContractAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  //   const invalidAddressSignature = await signMintData(owner.signer, mintData, contractName, invalidContractAddress)

  //   await expect(owner.contract.userMint(mintData, signature)).to.be.revertedWith(
  //     'Caller address is not MintData.walletAddress'
  //   )

  //   await expect(bob.contract.userMint(expiredMintData, expiredSignature)).to.be.revertedWithCustomError(
  //     bob.contract, 'Expired'
  //   )

  //   await expect(bob.contract.userMint(exceededMaximumMintData, exceededMaxSignature)).to.be.revertedWithCustomError(
  //     bob.contract, 'MaximumIdentificatorsExceeded'
  //   )

  //   const invalidData = { ...mintData, identificators: ['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'] }
  //   await expect(bob.contract.userMint(invalidData, signature)).to.be.revertedWithCustomError(
  //     bob.contract, 'InvalidSignature'
  //   )

  //   await expect(bob.contract.userMint(mintData, invalidAddressSignature)).to.be.revertedWithCustomError(
  //     bob.contract, 'InvalidSignature'
  //   )

  //   // await expect(bob.contract.userMint(mintData, signature)).not.to.be.reverted
  //   const mint_transaction = await bob.contract.userMint(mintData, signature)
  //   const events = await all_events(mint_transaction)

  //   const userMintEvent = events.find(e => e.event === 'UserMint')
  //   const { args: { walletAddress, tokenIds, identificators, playerId: playerIdFromEvent } } = userMintEvent

  //   expect(Number(tokenIds[0])).to.equal(1)
  //   expect(Number(tokenIds[1])).to.equal(2)
  //   expect(tokenIds.length).to.equal(2)
  //   expect(mintData.walletAddress).to.equal(walletAddress)
  //   expect(mintData.identificators[0]).to.equal(identificators[0])
  //   expect(mintData.identificators[1]).to.equal(identificators[1])
  //   expect(identificators.length).to.equal(2)
  //   expect(playerId).to.equal(playerIdFromEvent)

  //   await expect(bob.nftContract['burn(uint256)'](Number(tokenIds[0]))).not.to.be.reverted
  //   await expect(bob.nftContract['burn(uint256)'](Number(tokenIds[1]))).not.to.be.reverted

  //   await expect(bob.contract.userMint(mintData, signature)).to.be.revertedWithCustomError(
  //     bob.contract,
  //     'NonceAlreadyUsed'
  //   )
  // })

})
