const chai = require('chai')
const { deployments, ethers, upgrades } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')
const { time } = require('@nomicfoundation/hardhat-network-helpers')

chai.use(deep_equal)

const { expect } = chai

const contractName = 'WildForestSignalFire'

const cooldownPeriod = 10

const all_events = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)

const deploy = async (period) => {
  const cooldownExpiration = period || cooldownPeriod
  await deployments.fixture()
  const accounts = await ethers.getSigners()
  const [owner, alice, bob, steve] = accounts
  const ownerAddress = await owner.getAddress()

  const WildForestSignalFire = await ethers.getContractFactory("WildForestSignalFire")
  const expeditionContract = await upgrades.deployProxy(WildForestSignalFire, [contractName, ownerAddress, cooldownExpiration])

  return {
    owner: {
      contract: expeditionContract,
      address: ownerAddress,
    },
    alice: {
      contract: await expeditionContract.connect(alice),
      address: await alice.getAddress(),
    },
    bob: {
      contract: await expeditionContract.connect(bob),
      address: await bob.getAddress(),
    },
    steve: {
      contract: await expeditionContract.connect(steve),
      address: await steve.getAddress(),
    },
  }
}

describe('WildForestSignalFire', function () {
  it('initialize not available second time', async () => {
    const { owner } = await deploy()
    await expect(owner.contract.initialize(contractName, owner.address, cooldownPeriod)).to.be.revertedWith(
      'Initializable: contract is already initialized'
    )
  })

  it('setCooldownPeriod should be available only for admin', async () => {
    const { owner, bob } = await deploy()

    const newCooldownPeriod = 1
    await expect(bob.contract.setCooldownPeriod(newCooldownPeriod)).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
    )

    const set_transaction = await owner.contract.setCooldownPeriod(newCooldownPeriod)
    const events = await all_events(set_transaction)

    const setLockPeriodEvent = events.find(e => e.event === 'CooldownPeriodChanged')
    const { args: { cooldownPeriod } } = setLockPeriodEvent
    expect(cooldownPeriod).to.equal(newCooldownPeriod)
  })


  it('fire (cooldown not passed)', async () => {
    const { owner } = await deploy()

    const fireTransaction = await owner.contract.fire()
    const events = await all_events(fireTransaction)
    const FireEvent = events.find(e => e.event === 'Fire')

    const { args: { account, fireCounter, accountCounter } } = FireEvent
    expect(account).to.equal(owner.address)
    expect(Number(fireCounter)).to.equal(1)
    expect(Number(accountCounter)).to.equal(1)

    await expect(owner.contract.fire()).to.be.revertedWithCustomError(
      owner.contract,
      'CooldownActive'
    )
  })

  it('fire', async () => {
    const cooldownPeriodInSeconds = 3600
    const { owner, bob } = await deploy(cooldownPeriodInSeconds)

    await owner.contract.fire()
    await bob.contract.fire()

    await time.increase(cooldownPeriodInSeconds / 2)
    await expect(owner.contract.fire()).to.be.revertedWithCustomError(
      owner.contract,
      'CooldownActive'
    )
    await expect(bob.contract.fire()).to.be.revertedWithCustomError(
      bob.contract,
      'CooldownActive'
    )

    await time.increase(cooldownPeriodInSeconds / 2)

    const fireTransaction = await bob.contract.fire()

    const events = await all_events(fireTransaction)
    const FireEvent = events.find(e => e.event === 'Fire')

    const { args: { account, fireCounter, accountCounter, cooldownPeriod } } = FireEvent
    expect(account).to.equal(bob.address)
    expect(Number(fireCounter)).to.equal(3)
    expect(Number(accountCounter)).to.equal(2)
    expect(Number(cooldownPeriod)).to.equal(cooldownPeriodInSeconds)
  })

})
