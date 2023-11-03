const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestUnits'
  // const cardsContractName = 'WildForestSkills'
  const cardsContractSymbol = 'WFU'
  // const cardsContractSymbol = 'WFS'
  const baseTokenURI = 'https://localhost:3000/nfts/'

  const { owner } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: owner,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI],
  })
}

module.exports = func
func.tags = ['nft']