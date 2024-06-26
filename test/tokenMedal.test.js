const chai = require('chai')
const { deployments, ethers, upgrades } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

const { ZERO_ADDRESS } = require('./_utils')

chai.use(deep_equal)

const { expect } = chai

const name = 'WildForestMedals'
const symbol = `WFM`
const uri = 'https://localhost:3000/api/mdeal/'

const keccak256MinterRole = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
const keccak256TypeCreatorRole = '0xa179fee20f85ec961934693e9c82cdcfa7a5e03830c24fff006b46f3fd75fa9e'
const keccak256DefaultAdminRole = '0x0000000000000000000000000000000000000000000000000000000000000000'

const MAXIMUM_THRESHOLD = 11

const all_events = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)

const deploy = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()
  const ownerAddress = await owner.getAddress()

  const WildForestMedal1 = await ethers.getContractFactory('WildForestMedal', owner)
  let nftContract = await upgrades.deployProxy(WildForestMedal1, [name, symbol, uri, ownerAddress])

  const WildForestMedal2 = await ethers.getContractFactory('WildForestMedal', owner)
  nftContract = await upgrades.upgradeProxy(nftContract.address, WildForestMedal2)

  const aliceContract = await nftContract.connect(alice)
  await expect(aliceContract.upgradeSetInitRoles(ownerAddress)).to.be.revertedWith(
    'only governance can call this'
  )
  await nftContract.upgradeSetInitRoles(ownerAddress)
  await expect(nftContract.upgradeSetInitRoles(ownerAddress)).to.be.revertedWith(
    'Contract already upgraded to V2'
  )

  return {
    owner: {
      contract: nftContract,
      address: ownerAddress,
    },
    alice: {
      contract: aliceContract,
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

const deployWithAliceOwner = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()
  const aliceOwnerAddress = await alice.getAddress()

  const WildForestMedal = await ethers.getContractFactory("WildForestMedal")
  const nftContract = await upgrades.deployProxy(WildForestMedal, [name, symbol, uri, aliceOwnerAddress])
  // const nftContract = await WildForestMedal.deploy(name, symbol, uri, aliceOwnerAddress)

  return {
    owner: {
      contract: nftContract,
      address: await owner.getAddress(),
    },
    alice: {
      contract: await nftContract.connect(alice),
      address: aliceOwnerAddress,
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

// const transfer_event = transaction =>
//   transaction
//     .wait()
//     .then(({ events }) => events)
//     .then(([{ args }]) => args)

// const transfer_events = transaction =>
//   transaction
//     .wait()
//     .then(({ events }) => events)
//     .then((events) => {
//       return events.filter(e => e.event === 'Transfer')
//     })

describe('WildForestMedal', function () {
  it('initialize not available second time', async () => {
    const { owner } = await deploy()
    await expect(owner.contract.initialize(name, symbol, uri, owner.address)).to.be.revertedWith(
      'Initializable: contract is already initialized'
    )
  })

  it('initialize zero address', async () => {
  const WildForestMedal = await ethers.getContractFactory("WildForestMedal")
    await expect(upgrades.deployProxy(WildForestMedal, [name, symbol, uri, ZERO_ADDRESS])).to.be.revertedWith(
      'TokenMedal: _ownerAddress is the zero address'
    )
  })

  it('custom owner', async () => {
    const { owner, alice } = await deployWithAliceOwner()

    await expect(owner.contract.addNewSeason(50)).to.be.revertedWith(
      `AccessControl: account ${owner.address.toLowerCase()} is missing role ${keccak256TypeCreatorRole}`
    )
    await alice.contract.addNewSeason(50)

    const newURI = 'http://test.com'
    await expect(owner.contract.setURI(newURI)).to.be.revertedWith(
      `AccessControl: account ${owner.address.toLowerCase()} is missing role ${keccak256DefaultAdminRole}`
    )

    const uri_transaction = await alice.contract.setURI(newURI)

    const setUriEvents = await all_events(uri_transaction)

    const changeUriEvent = setUriEvents.find(e => e.event === 'BaseUriChanged')
    const { args: { uri } } = changeUriEvent
    expect(uri).to.equal(newURI)

    expect(await alice.contract.uri(1)).to.equal(`${newURI}1`)

    await expect(owner.contract.mintBatch(alice.address, [1], [1])).to.be.revertedWith(
      `AccessControl: account ${owner.address.toLowerCase()} is missing role ${keccak256MinterRole}`
    )
    await expect(owner.contract.mint(alice.address, 1, 1)).to.be.revertedWith(
      `AccessControl: account ${owner.address.toLowerCase()} is missing role ${keccak256MinterRole}`
    )

    await expect(alice.contract.mintBatch(owner.address, [1], [1])).not.to.be.reverted
    await expect(alice.contract.mint(owner.address, 1, 1)).not.to.be.reverted
  })

  it('The supportsInterface function should be a simple override', async () => {
    const { steve } = await deploy()

    await expect(steve.contract.supportsInterface(0xda0d82f5)).not.to.be.reverted
  })

  it('Only owner could add new season', async () => {
    const { owner, alice, bob } = await deploy()
    let sesonNumber = 0
    let seasonSupply = 50
    await owner.contract.addNewSeason(seasonSupply)
    sesonNumber++

    expect(await alice.contract.seasonsCount()).to.equal(sesonNumber)
    expect(await alice.contract.totalSupply(sesonNumber)).to.equal(seasonSupply)

    seasonSupply = 80
    await owner.contract.addNewSeason(seasonSupply)
    sesonNumber++

    expect(await alice.contract.seasonsCount()).to.equal(sesonNumber)
    expect(await alice.contract.totalSupply(sesonNumber)).to.equal(seasonSupply)

    await expect(alice.contract.addNewSeason(50)).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${keccak256TypeCreatorRole}`
    )

    await expect(bob.contract.addNewSeason(50)).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role ${keccak256TypeCreatorRole}`
    )
  })

  it('Only owner could change URI', async () => {
    const { owner, alice } = await deploy()

    await expect(alice.contract.uri(1)).to.be.revertedWith(
      'season does not exists'
    )

    await owner.contract.addNewSeason(50)
    expect(await alice.contract.uri(1)).to.equal(`${uri}1`)

    const newURI = 'https://localhost:4000/api/mdeal/'
    await expect(alice.contract.setURI(newURI)).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${keccak256DefaultAdminRole}`
    )

    await owner.contract.setURI(newURI)
    expect(await alice.contract.uri(1)).to.equal(`${newURI}1`)
  })

  it('Minting should be available only for owner (error when other trying)', async () => {
    const { owner, alice, bob } = await deploy()
    await owner.contract.addNewSeason(50)

    await expect(alice.contract.mintBatch(bob.address, [1], [1])).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${keccak256MinterRole}`
    )
    await expect(alice.contract.mint(bob.address, 1, 1)).to.be.revertedWith(
      `AccessControl: account ${alice.address.toLowerCase()} is missing role ${keccak256MinterRole}`
    )

    await expect(owner.contract.mintBatch(bob.address, [2], [1])).to.be.revertedWith(
      'season does not exists'
    )
    await expect(owner.contract.mint(bob.address, 2, 1)).to.be.revertedWith(
      'season does not exists'
    )

    await expect(owner.contract.mintBatch(bob.address, [1], [1])).not.to.be.reverted
    await expect(owner.contract.mint(bob.address, 1, 1)).not.to.be.reverted
  })

  it('Burning should be available only for approved or token owners (error when other trying)', async () => {
    const { owner, alice, bob } = await deploy()
    await owner.contract.addNewSeason(50)
    await owner.contract.mintBatch(bob.address, [1], [3])

    await expect(bob.contract.burnBatch(bob.address, [2], [1])).to.be.revertedWith(
      'season does not exists'
    )
    await expect(bob.contract.burn(bob.address, 2, 1)).to.be.revertedWith(
      'season does not exists'
    )

    await expect(alice.contract.burnBatch(bob.address, [1], [1])).to.be.revertedWith(
      'ERC1155: caller is not token owner or approved'
    )
    await expect(alice.contract.burn(bob.address, 1, 1)).to.be.revertedWith(
      'ERC1155: caller is not token owner or approved'
    )

    await bob.contract.setApprovalForAll(alice.address, true)

    const seasonsLimitExceeded = []
    const tokensToBurn = []
    for (let _i = 0; _i < MAXIMUM_THRESHOLD; _i++) {
      seasonsLimitExceeded.push(_i + 1)
      tokensToBurn.push(1)
      await owner.contract.addNewSeason(10)
    }
    await expect(bob.contract.burnBatch(bob.address, seasonsLimitExceeded, tokensToBurn)).to.be.revertedWithCustomError(
      bob.contract, 'MaximumSeasonIdsExceeded'
    )

    await expect(alice.contract.burnBatch(bob.address, [1], [1])).not.to.be.reverted
    await expect(alice.contract.burn(bob.address, 1, 1)).not.to.be.reverted
    // await expect(owner.contract.burnBatch(bob.address, [1], [1])).not.to.be.reverted
    // await expect(owner.contract.burn(bob.address, 1, 1)).not.to.be.reverted
  })


  it('Anyone can retrieve tokens of an user', async () => {
    const { owner, bob, alice } = await deploy()
    await owner.contract.addNewSeason(40)
    await owner.contract.addNewSeason(40)

    await owner.contract.mintBatch(bob.address, [1, 2], [15, 16])

    expect(await alice.contract.balanceOf(bob.address, 1)).to.equal(15)
    expect(await alice.contract.balanceOf(bob.address, 2)).to.equal(16)
  })


  // it('Approved addresses also can burn a token', async () => {
  //   const { owner, bob, alice } = await deploy()
  //   await owner.contract.mintBatch([bob.address])

  //   await expect(alice.contract.burn(1)).to.be.revertedWith(
  //     'ERC721: caller is not token owner or approved'
  //   )

  //   await expect(bob.contract.approve(alice.address, 1)).to.not.be.reverted

  //   await expect(alice.contract.burn(1)).to.not.be.reverted
  // })


  // it('setApprovalForAll user can set some member as approved for all tokens', async () => {
  //   const { owner, bob, alice } = await deploy()
  //   await owner.contract.mintBatch([bob.address, bob.address])

  //   await expect(bob.contract.setApprovalForAll(owner.address, true)).to.not.be.reverted
  //   await expect(owner.contract.burn(1)).to.not.be.reverted

  //   await expect(owner.contract.bulkApprove(alice.address, [2])).to.not.be.reverted
  //   await expect(alice.contract.burn(2)).to.not.be.reverted
  // })
})
