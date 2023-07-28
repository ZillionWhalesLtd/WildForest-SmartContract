const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'ZillionWhalesCards'
  const cardsContractSymbol = `WHC`
  const baseTokenURI = 'https://localhost:3000/nfts/'
  const initialPrice = 20
  const initialSupply = 500

  const { owner } = await getNamedAccounts()

  await deploy('ZillionWhalesSale', {
    from: owner,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI, initialPrice, initialSupply],
  })
}

module.exports = func
func.tags = ['sale']