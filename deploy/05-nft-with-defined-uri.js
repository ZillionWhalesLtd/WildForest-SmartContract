require('dotenv').config()

const { LORDS_NFT_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestLords'
  const cardsContractSymbol = 'WFL'

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let lordsOwnerAddress = LORDS_NFT_OWNER_ADDRESS
  if (isSaigon) {
    lordsOwnerAddress = SAIGON_LORDS_NFT_OWNER_ADDRESS
  }

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestDefinedTokenUriNft', {
    from: deployer,
    log: true,
    args: [cardsContractName, cardsContractSymbol, lordsOwnerAddress],
  })
}

module.exports = func
func.tags = ['definedUriNft']