const chai = require('chai')
const { deployments, ethers, upgrades } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')
const { time } = require('@nomicfoundation/hardhat-network-helpers')

chai.use(deep_equal)

const { expect } = chai

const contractName = 'WildForestUnits'
const cardsContractName = 'WildForestCards'
const cardsContractSymbol = `WFC`
const baseTokenURI = 'https://localhost:3000/nfts/'

const lockPeriod = 10

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
      'ERC721: invalid token ID'
    )

    const recipients = [owner.address, owner.address]
    console.log('recipients!', recipients)
    const mintTransaction = await owner.nftContract.bulkMint(recipients)
    const transferEvents = await transfer_events(mintTransaction)
    const tokenIds = []
    for (const transferEvent of transferEvents) {
      const { args } = transferEvent
      tokenIds.push(Number(args.tokenId))
    }

    await expect(owner.contract.deposit(tokenIds)).to.be.revertedWith(
      'ERC721: caller is not token owner or approved'
    )

    console.log('tokenIds!!', tokenIds)
    await owner.nftContract.approve(owner.contract.address, [1])
    console.log('APPROVE')

    const beforeDepositOwner = await owner.nftContract.ownerOf(1)
    expect(beforeDepositOwner).to.equal(owner.address)

    const depositTransaction = await owner.contract.deposit([1])
    console.log('AFTER DEPOSIT')

    const afterDepositOwner = await owner.nftContract.ownerOf(1)
    expect(afterDepositOwner).to.equal(owner.contract.address)

    const events = await all_events(depositTransaction)
    const depositLockEvent = events.find(e => e.event === 'DepositLock')

    const { args: { account, tokenIds: lockedTokenIds, lockPeriod: currentLockPeriod } } = depositLockEvent
    expect(account).to.equal(owner.address)
    expect(lockedTokenIds[0]).to.equal(tokenIds[0])
    // expect(lockedTokenIds.length).to.equal(tokenIds.length)
    expect(currentLockPeriod).to.equal(lockPeriod)
  })

  it('withdraw (not pass validation)', async () => {
    const { owner } = await deploy()

    const recipients = [owner.address, owner.address]
    await owner.nftContract.bulkMint(recipients)

    await owner.nftContract.approve(owner.contract.address, [1])
    await owner.contract.deposit([1])

    await expect(owner.contract.withdraw([3])).to.be.revertedWithCustomError(
      owner.contract,
      'NoLockedTokenForAddress'
    )
    await expect(owner.contract.withdraw([1])).to.be.revertedWithCustomError(
      owner.contract,
      'LockActive'
    )
  })

  it('withdraw (not pass validation)', async () => {
    const lockPeriodInSeconds = 3600
    const { owner } = await deploy(lockPeriodInSeconds)

    const recipients = [owner.address, owner.address]
    await owner.nftContract.bulkMint(recipients)

    await owner.nftContract.approve(owner.contract.address, [1])
    await owner.contract.deposit([1])

    const beforeWithdrawOwner = await owner.nftContract.ownerOf(1)
    expect(beforeWithdrawOwner).to.equal(owner.contract.address)

    await time.increase(lockPeriodInSeconds / 2)
    await expect(owner.contract.withdraw([1])).to.be.revertedWithCustomError(
      owner.contract,
      'LockActive'
    )

    await time.increase(lockPeriodInSeconds / 2)
    const withdrawTransaction = await owner.contract.withdraw([1])

    const afterWithdrawOwner = await owner.nftContract.ownerOf(1)
    expect(afterWithdrawOwner).to.equal(owner.address)

    const events = await all_events(withdrawTransaction)
    const withdrawLockEvent = events.find(e => e.event === 'WithdrawLock')

    const { args: { account, tokenIds: unlockedTokenIds } } = withdrawLockEvent
    expect(account).to.equal(owner.address)
    expect(unlockedTokenIds[0]).to.equal(1)
    // expect(lockedTokenIds.length).to.equal(tokenIds.length)
  })

})
