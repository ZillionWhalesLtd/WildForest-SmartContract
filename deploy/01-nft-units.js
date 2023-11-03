const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestUnits'
  const cardsContractSymbol = 'WFU'
  const baseTokenURI = 'https://localhost:3000/nfts/'

  const { unitsOwner } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: unitsOwner,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI],
  })
}

module.exports = func
func.tags = ['nftUnits']