const chai = require('chai')
const { deployments, ethers } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

chai.use(deep_equal)

const { expect } = chai

const cardsContractName = 'WildForestLords'
const cardsContractSymbol = 'WFL'

const deploy = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()
  const ownerAddress = await owner.getAddress()

  const WildForestDefinedTokenUriNft = await ethers.getContractFactory("WildForestDefinedTokenUriNft")
  const nftContract = await WildForestDefinedTokenUriNft.deploy(cardsContractName, cardsContractSymbol, ownerAddress)

  return {
    owner: {
      contract: nftContract,
      address: ownerAddress,
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

const deployWithAliceOwner = async () => {
  await deployments.fixture()
  const [owner, alice, bob, steve] = await ethers.getSigners()
  const aliceOwnerAddress = await alice.getAddress()

  const WildForestDefinedTokenUriNft = await ethers.getContractFactory("WildForestDefinedTokenUriNft")
  const nftContract = await WildForestDefinedTokenUriNft.deploy(cardsContractName, cardsContractSymbol, aliceOwnerAddress)

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

const getTokenUri = (metadata) => {
  const metadataBuffer = Buffer.from(JSON.stringify(metadata))
  const tokenMetadataEncoded = metadataBuffer.toString('base64')
  const tokenUri = `data:application/json;base64,${tokenMetadataEncoded}`
  return  tokenUri
}

const tokenMetadata = {
  name: 'WildForestLords',
  description: 'Epic Lords',
  image: 'https://ipfs.image/2213123ssdsd',
  external_url: 'https://externak.com/2',
  properties: {
    coolnest: 9,
    skill: 'Assasin',
    uniqness: 9
  }
}

const _tokenUri = getTokenUri(tokenMetadata)

describe('WildForestDefinedTokenUriNft', function () {
  it('_mintFor should be NOT available', async () => {
    const { bob } = await deploy()

    let notExistsMethodError
    try {
      await bob.contract._mintFor(bob.address)
    } catch(error) {
      notExistsMethodError = error
    }

    expect(notExistsMethodError).to.be.not.undefined // eslint-disable-line
  })

  it('_mint should be NOT available', async () => {
    const { bob } = await deploy()

    let notExistsMethodError
    try {
      await bob.contract._mint(bob.address)
    } catch(error) {
      notExistsMethodError = error
    }

    expect(notExistsMethodError).to.be.not.undefined // eslint-disable-line
  })

  it('The supportsInterface function should be a simple override', async () => {
    const { steve } = await deploy()

    await expect(steve.contract.supportsInterface(0xda0d82f5)).not.to.be.reverted
  })

  it('Only Admin can call mint', async () => {
    const { owner, steve } = await deploy()

    await expect(steve.contract.mint(owner.address, _tokenUri)).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have minter role to mint'
    )

    await expect(owner.contract.mint(steve.address ,_tokenUri)).not.to.be.reverted
  })

  it('Custom owner', async () => {
    const { owner, alice } = await deployWithAliceOwner()

    await expect(owner.contract.mint(alice.address, _tokenUri)).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have minter role to mint'
    )

    await expect(alice.contract.mint(owner.address ,_tokenUri)).not.to.be.reverted

    await expect(owner.contract.pause()).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have pauser role to pause'
    )
    await expect(alice.contract.pause()).not.to.be.reverted
    await expect(alice.contract.unpause()).not.to.be.reverted
  })

  it('Only admin can paus and unpause transfers', async () => {
    const { owner, alice } = await deploy()

    await expect(alice.contract.pause()).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have pauser role to pause'
    )
    await expect(owner.contract.pause()).not.to.be.reverted

    await expect(alice.contract.unpause()).to.be.revertedWith(
      'ERC721PresetMinterPauserAutoId: must have pauser role to unpause'
    )
    await expect(owner.contract.unpause()).not.to.be.reverted
  })

  it('Anyone can retrieve tokens of an user', async () => {
    const { owner, bob, alice } = await deploy()

    const metadata = {
      name: 'WildForestLords',
      description: 'Epic Lords',
      image: 'https://ipfs.image/2213123ssdsd',
      external_url: 'https://externak.com/2',
      properties: {
        coolnest: 9,
        skill: 'Assasin',
        uniqness: 9
      }
    }
    const tokenUri = getTokenUri(metadata)

    await owner.contract.mint(bob.address, tokenUri)

    for (
      let token_index = 0;
      token_index < (await alice.contract.balanceOf(bob.address));
      token_index++
    ) {
      const tokenId = await alice.contract[
        'tokenOfOwnerByIndex(address,uint256)'
      ](bob.address, token_index)
      expect(await alice.contract['tokenURI(uint256)'](tokenId)).to.equal(tokenUri)
    }
  })

  it('Only the owner of token can burn a token', async () => {
    const { owner, bob, alice } = await deploy()
    await owner.contract.mint(bob.address, _tokenUri)

    await expect(alice.contract.burn(1)).to.be.revertedWith(
      'ERC721: caller is not token owner or approved'
    )
    await expect(bob.contract.burn(1)).to.not.be.reverted
  })

  it('Approved addresses also can burn a token', async () => {
    const { owner, bob, alice } = await deploy()
    await owner.contract.mint(bob.address, _tokenUri)

    await expect(alice.contract.burn(1)).to.be.revertedWith(
      'ERC721: caller is not token owner or approved'
    )

    await expect(bob.contract.approve(alice.address, 1)).to.not.be.reverted

    await expect(alice.contract.burn(1)).to.not.be.reverted
  })
})
