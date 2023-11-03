const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestSkins'
  const cardsContractSymbol = 'WFS'
  const baseTokenURI = 'https://localhost:3000/nfts/'

  const { skinsOwner } = await getNamedAccounts()

  await deploy('WildForestNft', {
    from: skinsOwner,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI],
  })
}

module.exports = func
func.tags = ['nftSkins']