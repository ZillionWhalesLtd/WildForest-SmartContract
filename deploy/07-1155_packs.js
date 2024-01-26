require('dotenv').config()

// const { ethers, upgrades } = require('hardhat')
const { PACKS_OWNER_ADDRESS, SAIGON_PACKS_NFT_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const name = 'Wild Forest Packs'
  const symbol = `WildForestPack`

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let basePathUrl = 'https://nft-info.server.playwildforest.io'
  let medalsOwnerAddress = PACKS_OWNER_ADDRESS

  if (isSaigon) {
    basePathUrl = 'https://stage-nft-info.server.playwildforest.io'
    medalsOwnerAddress = SAIGON_PACKS_NFT_OWNER_ADDRESS
  }

  const uri = `${basePathUrl}/v1/pack_info?type=`

  const { deployer } = await getNamedAccounts()
  const params = [name, symbol, uri, medalsOwnerAddress]

  // // const gas = await ethers.provider.getGasPrice()
  // const WildForestPacksContract = await ethers.getContractFactory('WildForestMedal')
  // console.log('Deploying WildForestPacksContract...')
  // const packsContract = await upgrades.deployProxy(WildForestPacksContract, params, {
  //   // kind: 'transparent' | 'uups'
  //    // gasPrice: gas,
  //    initializer: 'initialize',
  //    deployer,
  //    // constructorArgs: params,
  //    // initialOwner:
  // })
  // await packsContract.deployed()
  // console.log('packsContract Contract deployed to:', packsContract.address)

  await deploy('WildForestMedal', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: params,
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })
}

module.exports = func
func.tags = ['nftPacks1155']