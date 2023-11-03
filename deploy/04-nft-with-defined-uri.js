const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestLords'
  const cardsContractSymbol = 'WFL'

  const { lordsOwner } = await getNamedAccounts()

  await deploy('WildForestDefinedTokenUriNft', {
    from: lordsOwner,
    log: true,
    args: [cardsContractName, cardsContractSymbol],
  })
}

module.exports = func
func.tags = ['definedUriNft']