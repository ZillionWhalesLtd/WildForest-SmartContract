const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestBattlePass'
  const cardsContractSymbol = 'WFB'
  const baseTokenURI = 'https://localhost:3000/battlePass/'

  const { baseOwner } = await getNamedAccounts()

  await deploy('WildForestTimeLockNft', {
    from: baseOwner,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI],
  })
}

module.exports = func
func.tags = ['timeLockNft']