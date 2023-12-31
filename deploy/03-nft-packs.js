require('dotenv').config()
const { PACKS_OWNER_ADDRESS, SAIGON_PACKS_NFT_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestPacks'
  const cardsContractSymbol = 'WFP'

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
    args: [cardsContractName, cardsContractSymbol, baseTokenURI, packsOwnerAddress],
  })
}

module.exports = func
func.tags = ['nftPacks']