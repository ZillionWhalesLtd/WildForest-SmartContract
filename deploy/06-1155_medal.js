require('dotenv').config()

const { MEDAL_OWNER_ADDRESS, SAIGON_MEDAL_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const name = 'WildForestMedals'
  const symbol = `WFM`

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let basePathUrl = 'https://nft-info.server.playwildforest.io'
  let medalsOwnerAddress = MEDAL_OWNER_ADDRESS

  if (isSaigon) {
    basePathUrl = 'https://stage-nft-info.server.playwildforest.io'
    medalsOwnerAddress = SAIGON_MEDAL_OWNER_ADDRESS
  }

  const uri = `${basePathUrl}/v1/mdeal_info?season=`

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestMedal', {
    from: deployer,
    log: true,
    args: [name, symbol, uri, medalsOwnerAddress],
  })
}

module.exports = func
func.tags = ['medal']