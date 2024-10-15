const chai = require('chai')
const { deployments, ethers, upgrades } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')
const { time } = require('@nomicfoundation/hardhat-network-helpers')

const { ZERO_ADDRESS } = require('./_utils')

chai.use(deep_equal)

const { expect } = chai

const contractName = 'WildForestUnits'
const cardsContractName = 'WildForestCards'
const cardsContractSymbol = `WFC`
const baseTokenURI = 'https://localhost:3000/nfts/'

const lockPeriod = 10
const MILLISECONDS_IN_SECOND = 1000

const all_events = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)

const transfer_events = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)
    .then((events) => {
      return events.filter(e => e.event === 'Transfer')
    })

let nftContractAddress

const deploy = async (period) => {
  const lockExpiration = period || lockPeriod
  await deployments.fixture()
  const accounts = await ethers.getSigners()
  const [owner, alice, bob, steve] = accounts
  const ownerAddress = await owner.getAddress()

  const WildForestNft = await ethers.getContractFactory("WildForestNft")
  const nftContract = await upgrades.deployProxy(WildForestNft, [cardsContractName, cardsContractSymbol, baseTokenURI, ownerAddress])

  nftContractAddress = nftContract.address

  const WildForestLockNft = await ethers.getContractFactory("WildForestLockNft")
  const lockContract = await upgrades.deployProxy(WildForestLockNft, ['lock-lords', ownerAddress, nftContractAddress, lockExpiration])

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
    await expect(owner.contract.initialize(contractName, owner.address, nftContractAddress, lockPeriod)).to.be.revertedWith(
      'Initializable: contract is already initialized'
    )
  })

  it('setNftContractAddress should be available only for admin', async () => {
    const { owner, bob } = await deploy()

    await expect(bob.contract.setNftContractAddress(nftContractAddress)).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
    )

    await expect(owner.contract.setNftContractAddress(ZERO_ADDRESS)).to.be.revertedWith(
      'LockNFT: nftContractAddress is the zero address'
    )

    const set_transaction = await owner.contract.setNftContractAddress(nftContractAddress)
    const events = await all_events(set_transaction)

    const setSignerEvent = events.find(e => e.event === 'NftContractChanged')
    const { args: { nftContractAddress: updatedContract } } = setSignerEvent
    expect(updatedContract).to.equal(nftContractAddress)
  })

  it('stake should be available only if user approved and own token', async () => {
    const { owner, bob } = await deploy()

    await expect(bob.contract.stake([1])).to.be.revertedWith(
      'ERC721: invalid token ID'
    )

    const recipients = [owner.address, owner.address]
    const mintTransaction = await owner.nftContract.bulkMint(recipients)
    const transferEvents = await transfer_events(mintTransaction)
    const tokenIds = []
    for (const transferEvent of transferEvents) {
      const { args } = transferEvent
      tokenIds.push(Number(args.tokenId))
    }

    await expect(owner.contract.stake(tokenIds)).to.be.revertedWith(
      'ERC721: caller is not token owner or approved'
    )

    await owner.nftContract.bulkApprove(owner.contract.address, tokenIds)

    const beforestakeOwner1 = await owner.nftContract.ownerOf(tokenIds[0])
    expect(beforestakeOwner1).to.equal(owner.address)
    const beforestakeOwner2 = await owner.nftContract.ownerOf(tokenIds[1])
    expect(beforestakeOwner2).to.equal(owner.address)

    const stakeTransaction = await owner.contract.stake(tokenIds)

    const afterstakeOwner1 = await owner.nftContract.ownerOf(tokenIds[0])
    expect(afterstakeOwner1).to.equal(owner.contract.address)
    const afterstakeOwner2 = await owner.nftContract.ownerOf(tokenIds[1])
    expect(afterstakeOwner2).to.equal(owner.contract.address)

    const events = await all_events(stakeTransaction)
    const stakeLockEvent = events.find(e => e.event === 'StakeLock')

    const { args: { account, tokenIds: lockedTokenIds } } = stakeLockEvent
    expect(account).to.equal(owner.address)
    expect(lockedTokenIds.length).to.equal(tokenIds.length)
    expect(Number(lockedTokenIds[0])).to.equal(tokenIds[0])
    expect(Number(lockedTokenIds[1])).to.equal(tokenIds[1])
  })

  it('everbody should be able to get lockTime for any token', async () => {
    const { owner, bob } = await deploy()

    const recipients = [owner.address, owner.address]
    const mintTransaction = await owner.nftContract.bulkMint(recipients)
    const transferEvents = await transfer_events(mintTransaction)
    const tokenIds = []
    for (const transferEvent of transferEvents) {
      const { args } = transferEvent
      tokenIds.push(Number(args.tokenId))
    }

    await owner.nftContract.bulkApprove(owner.contract.address, tokenIds)

    await owner.contract.stake(tokenIds)

    const secondInDay = 24 * 60 * 60
    const days = 2
    await time.increase(days * secondInDay - 20)

    let lockTime = await bob.contract.lockTime(tokenIds[0])
    lockTime = Number(lockTime)

    expect(lockTime).to.equal(days - 1)

    await time.increase(20)
    let lockTimeAfter = await bob.contract.lockTime(tokenIds[0])
    lockTimeAfter = Number(lockTimeAfter)

    expect(lockTimeAfter).to.equal(days)

    await expect(bob.contract.lockTime(7)).to.be.revertedWith(
      'Token not locked'
    )
  })

  it('unstake (not pass validation)', async () => {
    const { owner, bob } = await deploy()

    const recipients = [owner.address, owner.address, bob.address]
    await owner.nftContract.bulkMint(recipients)

    await owner.nftContract.approve(owner.contract.address, [1])
    await bob.nftContract.approve(owner.contract.address, [3])
    await owner.contract.stake([1])
    await bob.contract.stake([3])

    await expect(owner.contract.unstake([3])).to.be.revertedWithCustomError(
      owner.contract,
      'NoLockedTokenForAddress'
    )
  })

  it('unstake', async () => {
    const lockPeriodInSeconds = 3600
    const { owner, bob } = await deploy(lockPeriodInSeconds)

    const recipients = [owner.address, owner.address]
    await owner.nftContract.bulkMint(recipients)
    const tokenIds = [1,2]

    await owner.nftContract.bulkApprove(owner.contract.address, tokenIds)
    await owner.contract.stake(tokenIds)

    const beforeunstakeOwner1 = await owner.nftContract.ownerOf(tokenIds[0])
    expect(beforeunstakeOwner1).to.equal(owner.contract.address)
    const beforeunstakeOwner2 = await owner.nftContract.ownerOf(tokenIds[1])
    expect(beforeunstakeOwner2).to.equal(owner.contract.address)

    // await time.increase(lockPeriodInSeconds)

    await expect(bob.contract.unstake(tokenIds)).to.be.revertedWithCustomError(
      owner.contract,
      'NoLockedTokenForAddress'
    )

    const unstakeTransaction = await owner.contract.unstake(tokenIds)

    const afterunstakeOwner1 = await owner.nftContract.ownerOf(tokenIds[0])
    expect(afterunstakeOwner1).to.equal(owner.address)
    const afterunstakeOwner2 = await owner.nftContract.ownerOf(tokenIds[1])
    expect(afterunstakeOwner2).to.equal(owner.address)

    const events = await all_events(unstakeTransaction)
    const unstakeLockEvent = events.find(e => e.event === 'UnstakeLock')

    const { args: { account, tokenIds: unlockedTokenIds } } = unstakeLockEvent
    expect(account).to.equal(owner.address)
    expect(unlockedTokenIds.length).to.equal(tokenIds.length)
    expect(Number(unlockedTokenIds[0])).to.equal(tokenIds[0])
  })

  it('upgradeV2Stake ERROR', async () => {
    const lockPeriodInSeconds = 3600
    const { owner, bob } = await deploy(lockPeriodInSeconds)

    const recipients = [owner.address, owner.address]
    await owner.nftContract.bulkMint(recipients)
    const tokenIds = [1,2]

    await expect(bob.contract.upgradeV2Stake(tokenIds)).to.be.revertedWithCustomError(
      owner.contract,
      'NoLockedTokenForAddress'
    )
  })

  it('balanceOf, tokenOfOwnerByIndex', async () => {
    const lockPeriodInSeconds = 3600
    const { owner, bob } = await deploy(lockPeriodInSeconds)

    await expect(owner.contract.balanceOf(ZERO_ADDRESS)).to.be.revertedWith(
      'ERC721: address zero is not a valid owner'
    )

    const recipients = [owner.address, owner.address, bob.address]
    await owner.nftContract.bulkMint(recipients)
    const tokenIds = [1,2,3]

    await owner.nftContract.bulkApprove(owner.contract.address, [tokenIds[0], tokenIds[1]])
    await owner.contract.stake([tokenIds[0], tokenIds[1]])

    await bob.nftContract.bulkApprove(owner.contract.address, [tokenIds[2]])
    await bob.contract.stake([tokenIds[2]])

    const beforeunstakeOwner1 = await owner.nftContract.ownerOf(tokenIds[0])
    expect(beforeunstakeOwner1).to.equal(owner.contract.address)
    const beforeunstakeOwner2 = await owner.nftContract.ownerOf(tokenIds[1])
    expect(beforeunstakeOwner2).to.equal(owner.contract.address)
    const beforeunstakeBob1 = await owner.nftContract.ownerOf(tokenIds[2])
    expect(beforeunstakeBob1).to.equal(bob.contract.address)

    const numberOfOwnerTokens = await bob.contract.balanceOf(owner.address)
    expect(Number(numberOfOwnerTokens)).to.equal(2)

    const numberOfBobTokens = await bob.contract.balanceOf(bob.address)
    expect(Number(numberOfBobTokens)).to.equal(1)

    const nftId1 = await bob.contract.tokenOfOwnerByIndex(owner.address, 0)
    expect(Number(nftId1)).to.equal(tokenIds[0])
    const nftId2 = await bob.contract.tokenOfOwnerByIndex(owner.address, 1)
    expect(Number(nftId2)).to.equal(tokenIds[1])
    await expect(bob.contract.tokenOfOwnerByIndex(owner.address, 2)).to.be.revertedWith(
      'ERC721Enumerable: owner index out of bounds'
    )

    const nftId3 = await bob.contract.tokenOfOwnerByIndex(bob.address, 0)
    expect(Number(nftId3)).to.equal(tokenIds[2])
    await expect(bob.contract.tokenOfOwnerByIndex(bob.address, 1)).to.be.revertedWith(
      'ERC721Enumerable: owner index out of bounds'
    )

    // Doing Unstake and check that tokens is properly in place in proper order
    await owner.contract.unstake([tokenIds[0]])
    await bob.contract.unstake([tokenIds[2]])

    const numberOfOwnerTokensAfter = await bob.contract.balanceOf(owner.address)
    expect(Number(numberOfOwnerTokensAfter)).to.equal(1)

    const numberOfBobTokensAfter = await bob.contract.balanceOf(bob.address)
    expect(Number(numberOfBobTokensAfter)).to.equal(0)

    const nftId1After = await owner.contract.tokenOfOwnerByIndex(owner.address, 0)
    expect(Number(nftId1After)).to.equal(2)
    await expect(owner.contract.tokenOfOwnerByIndex(owner.address, 1)).to.be.revertedWith(
      'ERC721Enumerable: owner index out of bounds'
    )
    await expect(owner.contract.tokenOfOwnerByIndex(bob.address, 0)).to.be.revertedWith(
      'ERC721Enumerable: owner index out of bounds'
    )

    // Doing one more stake to check proper tokens enumiration
    await owner.nftContract.bulkMint([bob.address])
    const tokenIdsAfter = [4]

    await bob.nftContract.bulkApprove(owner.contract.address, tokenIdsAfter)
    await bob.contract.stake(tokenIdsAfter)

    const numberOfOwnerTokensAfterNewStake_ = await bob.contract.balanceOf(bob.address)
    expect(Number(numberOfOwnerTokensAfterNewStake_)).to.equal(1)

    const nftId4After_ = await bob.contract.tokenOfOwnerByIndex(bob.address, 0)
    expect(Number(nftId4After_)).to.equal(tokenIdsAfter[0])
    await expect(bob.contract.tokenOfOwnerByIndex(bob.address, 1)).to.be.revertedWith(
      'ERC721Enumerable: owner index out of bounds'
    )

    await bob.contract.unstake(tokenIdsAfter)
    await bob.nftContract.bulkApprove(owner.contract.address, tokenIdsAfter)
    await bob.contract.stake(tokenIdsAfter)


    const numberOfOwnerTokensAfterNewStake__ = await bob.contract.balanceOf(bob.address)
    expect(Number(numberOfOwnerTokensAfterNewStake__)).to.equal(1)

    const nftId4After__ = await bob.contract.tokenOfOwnerByIndex(bob.address, 0)
    expect(Number(nftId4After__)).to.equal(tokenIdsAfter[0])
    await expect(bob.contract.tokenOfOwnerByIndex(bob.address, 1)).to.be.revertedWith(
      'ERC721Enumerable: owner index out of bounds'
    )

    ///// -------
    await owner.nftContract.bulkApprove(owner.contract.address, [tokenIds[0]])
    await owner.contract.stake([tokenIds[0]])

    const numberOfOwnerTokensAfterNewStake = await bob.contract.balanceOf(owner.address)
    expect(Number(numberOfOwnerTokensAfterNewStake)).to.equal(2)

    const nftId2After = await owner.contract.tokenOfOwnerByIndex(owner.address, 0)
    expect(Number(nftId2After)).to.equal(2)
    const nftId4After = await owner.contract.tokenOfOwnerByIndex(owner.address, 1)
    expect(Number(nftId4After)).to.equal(tokenIds[0])
    await expect(owner.contract.tokenOfOwnerByIndex(owner.address, 2)).to.be.revertedWith(
      'ERC721Enumerable: owner index out of bounds'
    )
  })

  it.skip('upgradeV2Stake', async () => {
    const lockPeriodInSeconds = 3600
    const { owner, bob } = await deploy(lockPeriodInSeconds)

    const recipients = [owner.address, owner.address]
    await owner.nftContract.bulkMint(recipients)
    const tokenIds = [1,2]

    await owner.nftContract.bulkApprove(owner.contract.address, tokenIds)
    await owner.contract.obsoleteStake(tokenIds)

    const beforeunstakeOwner1 = await owner.nftContract.ownerOf(tokenIds[0])
    expect(beforeunstakeOwner1).to.equal(owner.contract.address)
    const beforeunstakeOwner2 = await owner.nftContract.ownerOf(tokenIds[1])
    expect(beforeunstakeOwner2).to.equal(owner.contract.address)

    await expect(owner.contract.lockTime(tokenIds[0])).to.be.revertedWith(
      'Token not locked'
    )

    const secondsInDay = 24 * 60 * 60
    const days = 2
    await time.increase(days * secondsInDay + 20)

    // UPDAGRADE CONTRACT
    const upgradeV2Transaction = await owner.contract.upgradeV2Stake(tokenIds)

    let lockInitialTime = await bob.contract.lockTime(tokenIds[0])
    lockInitialTime = Number(lockInitialTime)

    expect(lockInitialTime).to.equal(days)

    const afterUpgradeOwner1 = await owner.nftContract.ownerOf(tokenIds[0])
    expect(afterUpgradeOwner1).to.equal(owner.contract.address)
    const afterUpgradeOwner2 = await owner.nftContract.ownerOf(tokenIds[1])
    expect(afterUpgradeOwner2).to.equal(owner.contract.address)

    const events = await all_events(upgradeV2Transaction)
    const upgradeLockEvent = events.find(e => e.event === 'UpgradeStakeV2')

    const { args: { account, tokenIds: upgradedTokenIds } } = upgradeLockEvent
    expect(account).to.equal(owner.address)
    expect(upgradedTokenIds.length).to.equal(tokenIds.length)
    expect(Number(upgradedTokenIds[0])).to.equal(tokenIds[0])

    let lockTime = await bob.contract.lockTime(tokenIds[0])
    lockTime = Number(lockTime)

    expect(lockTime).to.equal(days)

    await expect(bob.contract.unstake(tokenIds)).to.be.revertedWithCustomError(
      owner.contract,
      'NoLockedTokenForAddress'
    )

    await owner.contract.unstake(tokenIds)
  })

  it.skip('systemStakeV2Upgrade', async () => {
    const lockPeriodInSeconds = 3600
    const { owner, bob } = await deploy(lockPeriodInSeconds)

    const recipients = [bob.address, bob.address]
    await owner.nftContract.bulkMint(recipients)
    const tokenIds = [1,2]

    await bob.nftContract.bulkApprove(owner.contract.address, tokenIds)
    await bob.contract.obsoleteStake(tokenIds)

    const beforeunstakeOwner1 = await bob.nftContract.ownerOf(tokenIds[0])
    expect(beforeunstakeOwner1).to.equal(owner.contract.address)
    const beforeunstakeOwner2 = await bob.nftContract.ownerOf(tokenIds[1])
    expect(beforeunstakeOwner2).to.equal(bob.contract.address)

    await expect(bob.contract.lockTime(tokenIds[0])).to.be.revertedWith(
      'Token not locked'
    )

    const secondsInDay = 24 * 60 * 60
    const days = 2
    await time.increase(days * secondsInDay + 20)

    // UPDAGRADE CONTRACT

    await expect(bob.contract.systemStakeV2Upgrade(tokenIds, [bob.address])).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
    )

    await expect(owner.contract.systemStakeV2Upgrade(tokenIds, [owner.address, owner.address])).to.be.revertedWithCustomError(
      owner.contract,
      'NoLockedTokenForAddress'
    )

    await expect(owner.contract.systemStakeV2Upgrade(tokenIds, [bob.address])).to.be.revertedWith(
      'OwnerAddresses should match tokenIds'
    )

    const upgradeV2Transaction = await owner.contract.systemStakeV2Upgrade(tokenIds, [bob.address, bob.address])

    let lockInitialTime = await bob.contract.lockTime(tokenIds[0])
    lockInitialTime = Number(lockInitialTime)

    expect(lockInitialTime).to.equal(days)

    const afterUpgradeOwner1 = await owner.nftContract.ownerOf(tokenIds[0])
    expect(afterUpgradeOwner1).to.equal(owner.contract.address)
    const afterUpgradeOwner2 = await owner.nftContract.ownerOf(tokenIds[1])
    expect(afterUpgradeOwner2).to.equal(owner.contract.address)

    const events = await all_events(upgradeV2Transaction)
    const upgradeLockEvent = events.find(e => e.event === 'SystemUpgradeStakeV2')

    const { args: { accounts, tokenIds: upgradedTokenIds } } = upgradeLockEvent
    expect(accounts[0]).to.equal(bob.address)
    expect(accounts[1]).to.equal(bob.address)
    expect(upgradedTokenIds.length).to.equal(tokenIds.length)
    expect(Number(upgradedTokenIds[0])).to.equal(tokenIds[0])

    let lockTime = await bob.contract.lockTime(tokenIds[0])
    lockTime = Number(lockTime)

    expect(lockTime).to.equal(days)

    await expect(owner.contract.unstake(tokenIds)).to.be.revertedWithCustomError(
      owner.contract,
      'NoLockedTokenForAddress'
    )

    await bob.contract.unstake(tokenIds)
  })

})
