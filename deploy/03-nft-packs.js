require('dotenv').config()
const { PACKS_OWNER_ADDRESS, SAIGON_PACKS_NFT_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'Wild Forest Packs'
  const cardsContractSymbol = 'WildForestPack'

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let basePathUrl = 'https://nft-info.server.playwildforest.io'
  let packsOwnerAddress = PACKS_OWNER_ADDRESS

  if (isSaigon) {
    basePathUrl = 'https://stage-nft-info.server.playwildforest.io'
    packsOwnerAddress = SAIGON_PACKS_NFT_OWNER_ADDRESS
  }

  const baseTokenURI = `${basePathUrl}/v1/pack_info?nftId=`

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [cardsContractName, cardsContractSymbol, baseTokenURI, packsOwnerAddress],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })
}

module.exports = func
func.tags = ['nftPacks']