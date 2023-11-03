const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestSale'
  const cardsContractSymbol = `WFS`
  const baseTokenURI = 'https://localhost:3000/nfts/'
  const initialPrice = 20
  const initialSupply = 500

  const { owner } = await getNamedAccounts()

  await deploy('WildForestSale', {
    from: owner,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI, owner, initialPrice, initialSupply],
  })
}

module.exports = func
func.tags = ['sale']