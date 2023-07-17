import chai, { expect } from 'chai'
import { deployments, ethers } from 'hardhat'
import deep_equal from 'deep-equal-in-any-order'

chai.use(deep_equal)

const IMAGE_URI = '<image>'
const BADGE_TYPE = '<badge_type>'
const METADATA = JSON.stringify({ hello: 'world' })

const deploy = async () => {
  await deployments.fixture()
  const [alice, bob, steve] = await ethers.getSigners()
  return {
    owner: {
      contract: await ethers.getContract('ZillionWhalesNft', owner),
      address: await owner.getAddress(),
    },
    alice: {
      contract: await ethers.getContract('ZillionWhalesNft', alice),
      address: await alice.getAddress(),
    },
    bob: {
      contract: await ethers.getContract('ZillionWhalesNft', bob),
      address: await bob.getAddress(),
    },
    steve: {
      contract: await ethers.getContract('ZillionWhalesNft', steve),
      address: await steve.getAddress(),
    },
  }
}

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
      'transfer_not_allowed'
    )
  })

  // revertedWith
  // revertedWithCustomError

  it('Minting should be available only for owner (success on owner)', async () => {
    const { owner, bob, steve } = await deploy()
    const recipients = [bob.address, steve.address]
    const mint_transaction = await owner.contract.bulkMint(recipients)
    const { tokenId } = await transfer_event(mint_transaction)
    await expect(tokenId).to.equal(2)
  })


  it('The _burn function should be a simple override', async () => {
    const { tony, bruce } = await deploy()

    await bruce.contract.issue(tony.address, IMAGE_URI, BADGE_TYPE, METADATA)
    await expect(tony.contract['burn(uint256)'](0)).not.to.be.reverted
  })

  it('The supportsInterface function should be a simple override', async () => {
    const { tony } = await deploy()

    await expect(tony.contract.supportsInterface(0xda0d82f5)).not.to.be.reverted
  })

  it('Anyone can retrieve tokens of an user', async () => {
    const { owner, bob, alice } = await deploy()

    await owner.contract.issue([bob.address])

    for (
      let token_index = 0;
      token_index < (await alice.contract.balanceOf(bob.address));
      token_index++
    ) {
      const tokenId = await alice.contract[
        'tokenOfOwnerByIndex(address,uint256)'
      ](bob.address, token_index)
      expect(await alice.contract['tokenURI(uint256)'](tokenId)).to.equal(
        '/1'
      )
    }
  })

  it('Only the owner can burn a token', async () => {
    const { owner, bob, alice } = await deploy()
    await owner.contract.bulkMint([bob.address, alice.address])

    await expect(bob.contract.burn(0)).to.be.revertedWith(
      'Must be the owner to burn a token'
    )
    await expect(owner.contract.burn(0)).to.not.be.reverted
    await expect(owner.contract.burn(1)).to.not.be.reverted
  })
})
