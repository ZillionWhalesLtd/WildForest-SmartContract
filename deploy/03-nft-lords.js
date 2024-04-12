require('dotenv').config()
const { LORDS_NFT_OWNER_ADDRESS, SAIGON_LORDS_NFT_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'Wild Forest Lords'
  const cardsContractSymbol = 'WildForestLord'

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let basePathUrl = 'https://nft-info.server.playwildforest.io'
  let lordsOwnerAddress = LORDS_NFT_OWNER_ADDRESS

  if (isSaigon) {
    basePathUrl = 'https://stage-nft-info.server.playwildforest.io'
    lordsOwnerAddress = SAIGON_LORDS_NFT_OWNER_ADDRESS
  }

  const baseTokenURI = `${basePathUrl}/v1/lord_metadata?nftId=`

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [cardsContractName, cardsContractSymbol, baseTokenURI, lordsOwnerAddress],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })
}

module.exports = func
func.tags = ['nftLords']