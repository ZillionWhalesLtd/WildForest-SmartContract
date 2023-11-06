require('dotenv').config()

const { LORDS_NFT_OWNER_ADDRESS } = process.env

const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestLords'
  const cardsContractSymbol = 'WFL'

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestDefinedTokenUriNft', {
    from: deployer,
    log: true,
    args: [cardsContractName, cardsContractSymbol, LORDS_NFT_OWNER_ADDRESS],
  })
}

module.exports = func
func.tags = ['definedUriNft']