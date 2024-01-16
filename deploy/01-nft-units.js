require('dotenv').config()
const { UNITS_OWNER_ADDRESS, SAIGON_UNITS_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestUnits'
  const cardsContractSymbol = 'WFU'

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let basePathUrl = 'https://nft-info.server.playwildforest.io'
  let unitsOwnerAddress = UNITS_OWNER_ADDRESS

  if (isSaigon) {
    basePathUrl = 'https://stage-nft-info.server.playwildforest.io'
    unitsOwnerAddress = SAIGON_UNITS_OWNER_ADDRESS
  }

  const baseTokenURI = `${basePathUrl}/v1/unit_info?nftId=`

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [cardsContractName, cardsContractSymbol, baseTokenURI, unitsOwnerAddress],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })

}

module.exports = func
func.tags = ['nftUnits']