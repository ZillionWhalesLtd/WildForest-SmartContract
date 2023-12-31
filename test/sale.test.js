const chai = require('chai')
const { deployments, ethers } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

chai.use(deep_equal)

const { expect } = chai

const cardsContractName = 'WildForestCards'
const cardsContractSymbol = `WFS`
const baseTokenURI = 'https://localhost:3000/nfts/'
const initialPrice = 20
const initialSupply = 3

const deploy = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()
  const ownerAddress = await owner.getAddress()

  const WildForestSale = await ethers.getContractFactory("WildForestSale")
  const saleContract = await WildForestSale.deploy(cardsContractName, cardsContractSymbol, baseTokenURI, ownerAddress, initialPrice, initialSupply)

  return {
    owner: {
      contract: saleContract,
      address: ownerAddress,
    },
    alice: {
      contract: await saleContract.connect(alice),
      address: await alice.getAddress(),
    },
    bob: {
      contract: await saleContract.connect(bob),
      address: await bob.getAddress(),
    },
    steve: {
      contract: await saleContract.connect(steve),
      address: await steve.getAddress(),
    },
  }
}

const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000'

const transfer_details = (transaction) => {
  return transfer_events(transaction)
    .then((events) => {
      const [event] = events
      const { address, args } = event
      const { from, to, tokenId } = args

      return { address, from, to, tokenId: Number(tokenId) }
    })
}

const transfer_events = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)
    .then((events) => {
      return events.filter(e => e.event === 'Transfer')
    })

describe('WildForestSale', function () {
  it('Only owner can setMintPrice', async () => {
    const { owner, alice } = await deploy()
    const amountToPay = 7
    const newPrice = 5

    await expect(alice.contract.setMintPrice(10)).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
    )

    await expect(alice.contract.publicMint({ value: amountToPay })).to.be.revertedWith(
      'Provide more Ronin'
    )

    await expect(owner.contract.setMintPrice(newPrice)).not.to.be.reverted
    const actualMintPrice = await owner.contract.mintPrice()

    expect(actualMintPrice).to.equal(newPrice)
    await expect(alice.contract.publicMint({ value: amountToPay })).not.to.be.reverted
  })

  it('No mint function', async () => {
    const { owner } = await deploy()

    let notFunctionError
    try {
      await owner.contract.mint()
    } catch(error) {
      notFunctionError = error
    }

    expect(notFunctionError).to.be.not.undefined // eslint-disable-line
  })

  it('No _mintFor function', async () => {
    const { owner } = await deploy()

    let notFunctionError
    try {
      await owner.contract._mintFor()
    } catch(error) {
      notFunctionError = error
    }

    expect(notFunctionError).to.be.not.undefined // eslint-disable-line
  })

  it('No _mint function', async () => {
    const { owner } = await deploy()

    let notFunctionError
    try {
      await owner.contract._mint()
    } catch(error) {
      notFunctionError = error
    }

    expect(notFunctionError).to.be.not.undefined // eslint-disable-line
  })

  it('publicMint', async () => {
    const { owner, alice, steve } = await deploy()
    const notEnoughAmount = 10

    const initialBalance = await ethers.provider.getBalance(owner.address)

    await expect(alice.contract.publicMint({ value: notEnoughAmount })).to.be.revertedWith(
      'Provide more Ronin'
    )

    const transaction = await alice.contract.publicMint({ value: initialPrice })
    const { address, to, tokenId } = await transfer_details(transaction)

    expect(address).to.equal(owner.contract.address)
    expect(to).to.equal(alice.address)
    expect(tokenId).to.equal(1)

    const balanceAfter = await ethers.provider.getBalance(owner.address)

    expect(Number(initialBalance) + initialPrice).to.equal(Number(balanceAfter))

    await steve.contract.publicMint({ value: initialPrice })
    await expect(steve.contract.publicMint({ value: initialPrice })).to.be.revertedWith(
      'Out of tokens'
    )
  })

  it('publicMint with transaction error', async () => {
    const { owner } = await deploy()

    const WildForestSale = await ethers.getContractFactory("WildForestSale")
    const initContract = await WildForestSale.deploy(cardsContractName, cardsContractSymbol, baseTokenURI, owner.address, initialPrice, initialSupply)

    const saleContract = await WildForestSale.deploy(cardsContractName, cardsContractSymbol, baseTokenURI, initContract.address, initialPrice, initialSupply)

    // FAILURE: since money could not be transfered to the contract without receive() external payable {} AND fallback() external payable
    await expect(saleContract.publicMint({ value: initialPrice })).to.be.revertedWith(
      'Failed to send Ronin'
    )
  })
})
