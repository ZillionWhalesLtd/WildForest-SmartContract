require('dotenv').config()

const { ethers, upgrades } = require('hardhat')
// const { PACKS_OWNER_ADDRESS, SAIGON_PACKS_NFT_OWNER_ADDRESS } = process.env
const PACKS_PROXY_ADDRESS = '0x'

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const { deployer } = await getNamedAccounts()


  const WildForestPacksContract = await ethers.getContractFactory('WildForestMedal')
  console.log('Upgrade WildForestPacksContract...')
  // const params = [name, symbol, uri, medalsOwnerAddress]

  const packsContract = await upgrades.upgradeProxy(PACKS_PROXY_ADDRESS, WildForestPacksContract, {
    // kind: 'transparent' | 'uups'
     // gasPrice: gas,
     // initializer: 'initialize',
     deployer,
     // constructorArgs: params,
     // initialOwner:
  })
  await packsContract.deployed()
  console.log('packsContract Contract logic deployed to:', packsContract.address)
}

module.exports = func
func.tags = ['nftPacks1155Update']