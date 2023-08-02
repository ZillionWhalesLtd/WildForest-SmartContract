const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestLords'
  const cardsContractSymbol = 'WFL'

  const { owner } = await getNamedAccounts()

  await deploy('WildForestDefinedTokenUriNft', {
    from: owner,
    log: true,
    args: [cardsContractName, cardsContractSymbol],
  })
}

module.exports = func
func.tags = ['definedUriNft']