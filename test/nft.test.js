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

const transfer_event = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)
    .then(([{ args }]) => args)

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

  it('The stateOf function should be just called', async () => {
    const { owner, steve } = await deploy()

    await owner.contract.mint(steve.address)
    const response = await steve.contract.stateOf(1)

    expect(response).not.to.be.undefined // eslint-disable-line
  })

  it('Admin can setBaseURI', async () => {
    const { owner } = await deploy()
    await expect(owner.contract.setBaseURI('http:localhost:4000')).not.to.be.reverted
  })

  it('Admin can paus and unpause transfers', async () => {
    const { owner } = await deploy()
    await expect(owner.contract.pause()).not.to.be.reverted
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

  it('Approved addresses also can burn a token', async () => {
    const { owner, bob, alice } = await deploy()
    await owner.contract.bulkMint([bob.address])

    await expect(alice.contract.burn(1)).to.be.revertedWith(
      'ERC721: caller is not token owner or approved'
    )

    await expect(bob.contract.approve(alice.address, 1)).to.not.be.reverted

    await expect(alice.contract.burn(1)).to.not.be.reverted
  })
})
