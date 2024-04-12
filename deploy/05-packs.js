require('dotenv').config()
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

  const uri = `${basePathUrl}/v1/pack_metadata?typeId=`

  const { deployer } = await getNamedAccounts()
  const params = [name, symbol, uri, medalsOwnerAddress]

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