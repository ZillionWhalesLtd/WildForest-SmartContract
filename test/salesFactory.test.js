const chai = require('chai')
const { deployments, ethers } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

chai.use(deep_equal)

const { expect } = chai

const cardsContractName = 'WildForestCards'
const cardsContractSymbol = 'WHC'
const baseTokenURI = 'https://localhost:3000/nfts/'
const initialPrice = 20
const initialSupply = 3

const deploy = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()

  const WildForestSalesFactory = await ethers.getContractFactory("WildForestSalesFactory")
  const saleFactoryContract = await WildForestSalesFactory.deploy()
  const WildForestSale = await ethers.getContractFactory("WildForestSale")

  return {
    owner: {
      contract: saleFactoryContract,
      address: await owner.getAddress(),
      saleContract: async (contractAddress) => {
        const sale = await WildForestSale.attach(contractAddress)
        return await sale.connect(owner)
      },
    },
    alice: {
      contract: await saleFactoryContract.connect(alice),
      address: await alice.getAddress(),
      saleContract: async (contractAddress) => {
        const sale = await WildForestSale.attach(contractAddress)
        return await sale.connect(alice)
      },
    },
    bob: {
      contract: await saleFactoryContract.connect(bob),
      address: await bob.getAddress(),
      saleContract: async (contractAddress) => {
        const sale = await WildForestSale.attach(contractAddress)
        return await sale.connect(bob)
      },
    },
    steve: {
      contract: await saleFactoryContract.connect(steve),
      address: await steve.getAddress(),
      saleContract: async (contractAddress) => {
        const sale = await WildForestSale.attach(contractAddress)
        return await sale.connect(steve)
      },
    },
  }
}

describe('WildForestSalesFactory', function () {
  it('Only owner can CreateNewWildForestSale', async () => {
    const { owner, alice } = await deploy()

    await expect(alice.contract.CreateNewWildForestSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)).to.be.revertedWith(
      'AccessControl: account is missing admin role'
    )

    await expect(owner.contract.CreateNewWildForestSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)).not.to.be.reverted
  })

  it('Only owner can salePause and its effect sale contract', async () => {
    const { owner, alice } = await deploy()

    await owner.contract.CreateNewWildForestSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)
    const contractAddress = await owner.contract.WildForestSaleArray(0)
    const ownerSaleContract = await owner.saleContract(contractAddress)

    await expect(alice.contract.salePause(0)).to.be.revertedWith(
      'AccessControl: account is missing admin role'
    )

    await expect(ownerSaleContract.pause()).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have pauser role to pause'
    )

    await expect(ownerSaleContract.publicMint({ value: initialPrice })).not.to.be.reverted

    await expect(owner.contract.salePause(0)).not.to.be.reverted

    await expect(ownerSaleContract.publicMint({ value: initialPrice })).to.be.revertedWith(
      'ERC721Pausable: token transfer while paused'
    )
  })

  it('Only owner can saleUnpause and its effect sale contract', async () => {
    const { owner, alice } = await deploy()

    await owner.contract.CreateNewWildForestSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)
    const contractAddress = await owner.contract.WildForestSaleArray(0)
    const ownerSaleContract = await owner.saleContract(contractAddress)

    await owner.contract.salePause(0)

    await expect(alice.contract.saleUnpause(0)).to.be.revertedWith(
      'AccessControl: account is missing admin role'
    )

    await expect(ownerSaleContract.unpause()).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have pauser role to unpause'
    )

    await expect(ownerSaleContract.publicMint({ value: initialPrice })).to.be.revertedWith(
      'ERC721Pausable: token transfer while paused'
    )

    await expect(owner.contract.saleUnpause(0)).not.to.be.reverted
    await expect(ownerSaleContract.publicMint({ value: initialPrice })).not.to.be.reverted
  })

  it('Only owner can saleSetMintPrice and its effected sale contract', async () => {
    const { owner, alice } = await deploy()
    const newPrice = 17

    await owner.contract.CreateNewWildForestSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)
    const contractAddress = await owner.contract.WildForestSaleArray(0)
    const ownerSaleContract = await owner.saleContract(contractAddress)

    const initlMintPrice = await ownerSaleContract.mintPrice()
    expect(Number(initlMintPrice)).to.equal(initialPrice)

    await expect(alice.contract.saleSetMintPrice(0, newPrice)).to.be.revertedWith(
      'AccessControl: account is missing admin role'
    )

    await expect(owner.contract.saleSetMintPrice(0, newPrice)).not.to.be.reverted

    const aliceSaleContract = await alice.saleContract(contractAddress)
    await expect(aliceSaleContract.mintPrice()).not.to.be.reverted

    const actualMintPrice = await ownerSaleContract.mintPrice()
    expect(Number(actualMintPrice)).to.equal(newPrice)
  })
})
