require('dotenv').config()

const { PACKS_OWNER_ADDRESS, SAIGON_PACKS_NFT_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const name = 'WildForestPacks'
  const symbol = `WFP`

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

  await deploy('WildForestMedal', {
    from: deployer,
    log: true,
    args: [name, symbol, uri, medalsOwnerAddress],
  })
}

module.exports = func
func.tags = ['nftPacks1155']