require('dotenv').config()
const { UNITS_OWNER_ADDRESS } = process.env

const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestUnits'
  const cardsContractSymbol = 'WFU'
  const baseTokenURI = 'https://nft-info.server.playwildforest.io/v1/unit_info?nftId='

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: deployer,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI, UNITS_OWNER_ADDRESS],
  })
}

module.exports = func
func.tags = ['nftUnits']