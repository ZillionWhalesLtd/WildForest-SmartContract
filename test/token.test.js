const chai = require('chai')
const { deployments, ethers } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

chai.use(deep_equal)

const { expect } = chai

const initialSupply = 9000000000000000
const name = 'Wild Forest'
const symbol = 'WF'

const deploy = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()

  const WildForestToken = await ethers.getContractFactory("WildForestToken")
  const tokenContract = await WildForestToken.deploy(initialSupply, name, symbol)

  return {
    owner: {
      contract: tokenContract,
      address: await owner.getAddress(),
    },
    alice: {
      contract: await tokenContract.connect(alice),
      address: await alice.getAddress(),
    },
    bob: {
      contract: await tokenContract.connect(bob),
      address: await bob.getAddress(),
    },
    steve: {
      contract: await tokenContract.connect(steve),
      address: await steve.getAddress(),
    },
  }
}

const transfer_details = (transaction) => {
  return transfer_events(transaction)
    .then((events) => {
      const [event] = events
      const { address, args } = event
      const { from, to, value } = args

      return { address, from, to, value: Number(value) }
    })
}

const transfer_events = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)
    .then((events) => {
      return events.filter(e => e.event === 'Transfer')
    })

describe('WildForestToken', function () {
  it('transfer', async () => {
    const { owner, alice, bob, steve } = await deploy()
    const amount1 = 100

    await expect(alice.contract.transfer(bob.address, amount1)).to.be.revertedWith(
      'ERC20: transfer amount exceeds balance'
    )

    const amount = 900
    const transfer_transaction = await owner.contract.transfer(alice.address, amount)
    const { from, to, value } = await transfer_details(transfer_transaction)

    expect(from).to.equal(owner.address)
    expect(to).to.equal(alice.address)
    expect(value).to.equal(amount)

    await expect(alice.contract.transfer(bob.address, amount1)).not.to.be.reverted

    const aliceBalance = await steve.contract.balanceOf(alice.address)
    expect(aliceBalance).to.equal(amount - amount1)

    const bobBalance = await steve.contract.balanceOf(bob.address)
    expect(bobBalance).to.equal(amount1)
  })
})
