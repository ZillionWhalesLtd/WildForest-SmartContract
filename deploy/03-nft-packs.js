require('dotenv').config()
const { PACKS_OWNER_ADDRESS } = process.env

const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestPacks'
  const cardsContractSymbol = 'WFP'

  const baseTokenURI = 'https://nft-info.server.playwildforest.io/v1/pack_info?nftId='

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: deployer,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI, PACKS_OWNER_ADDRESS],
  })
}

module.exports = func
func.tags = ['nftPacks']