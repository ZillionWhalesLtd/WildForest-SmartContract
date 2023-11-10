require('dotenv').config()
const { SKINS_OWNER_ADDRESS } = process.env

const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestSkins'
  const cardsContractSymbol = 'WFS'

  const baseTokenURI = 'https://nft-info.server.playwildforest.io/v1/skin_info?nftId='

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: deployer,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI, SKINS_OWNER_ADDRESS],
  })
}

module.exports = func
func.tags = ['nftSkins']