require('dotenv').config()
const { SKINS_OWNER_ADDRESS, SAIGON_SKINS_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'Wild Forest Skins'
  const cardsContractSymbol = 'WildForestSkin'

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let basePathUrl = 'https://nft-info.server.playwildforest.io'
  let skinsOwnerAddress = SKINS_OWNER_ADDRESS

  if (isSaigon) {
    basePathUrl = 'https://stage-nft-info.server.playwildforest.io'
    skinsOwnerAddress = SAIGON_SKINS_OWNER_ADDRESS
  }

  const baseTokenURI = `${basePathUrl}/v1/skin_info?nftId=`

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [cardsContractName, cardsContractSymbol, baseTokenURI, skinsOwnerAddress],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })
}

module.exports = func
func.tags = ['nftSkins']