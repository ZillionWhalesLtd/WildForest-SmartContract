const chai = require('chai')
const { deployments, ethers } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

chai.use(deep_equal)

const { expect } = chai

const cardsContractName = 'ZillionWhalesCards'
const cardsContractSymbol = `WHC`
const baseTokenURI = 'https://localhost:3000/nfts/'
const initialPrice = 20
const initialSupply = 3

const deploy = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()

  const ZillionWhalesSalesFactory = await ethers.getContractFactory("ZillionWhalesSalesFactory")
  const saleFactoryContract = await ZillionWhalesSalesFactory.deploy()

  return {
    owner: {
      contract: saleFactoryContract,
      address: await owner.getAddress(),
    },
    alice: {
      contract: await saleFactoryContract.connect(alice),
      address: await alice.getAddress(),
    },
    bob: {
      contract: await saleFactoryContract.connect(bob),
      address: await bob.getAddress(),
    },
    steve: {
      contract: await saleFactoryContract.connect(steve),
      address: await steve.getAddress(),
    },
  }
}

const ADMIN_ROLE = '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775'

// const transfer_details = (transaction) => {
//   return transfer_events(transaction)
//     .then((events) => {
//       const [event] = events
//       const { address, args } = event
//       const { from, to, tokenId } = args

//       return { address, from, to, tokenId: Number(tokenId) }
//     })
// }

// const transfer_events = transaction =>
//   transaction
//     .wait()
//     .then(({ events }) => events)
//     .then((events) => {
//       return events.filter(e => e.event === 'Transfer')
//     })

describe('ZillionWhalesSalesFactory', function () {
  it('Only owner can CreateNewZillionWhalesSale', async () => {
    const { owner, alice } = await deploy()

    await expect(alice.contract.CreateNewZillionWhalesSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${ADMIN_ROLE}`
    )

    await expect(owner.contract.CreateNewZillionWhalesSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)).not.to.be.reverted
  })

  it('Only owner can salePause', async () => {
    const { owner, alice } = await deploy()

    await owner.contract.CreateNewZillionWhalesSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)

    await expect(alice.contract.salePause(0)).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${ADMIN_ROLE}`
    )

    await expect(owner.contract.salePause(0)).not.to.be.reverted
  })

  it('Only owner can saleUnpause', async () => {
    const { owner, alice } = await deploy()

    await owner.contract.CreateNewZillionWhalesSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)
    await owner.contract.salePause(0)

    await expect(alice.contract.saleUnpause(0)).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${ADMIN_ROLE}`
    )

    await expect(owner.contract.saleUnpause(0)).not.to.be.reverted
  })

  it('Only owner can saleSetMintPrice', async () => {
    const { owner, alice } = await deploy()

    await owner.contract.CreateNewZillionWhalesSale(cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply)

    await expect(alice.contract.saleSetMintPrice(0, 17)).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${ADMIN_ROLE}`
    )

    await expect(owner.contract.saleSetMintPrice(0, 17)).not.to.be.reverted
  })
})
