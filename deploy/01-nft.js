// export default async ({ getNamedAccounts, deployments: { deploy } }) => {
//   const { owner } = await getNamedAccounts()
//   await deploy('ZillionWhalesNft', {
//     from: owner,
//     log: true,
//     args: [],
//   })
// }
const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'ZillionWhalesCards'
  const cardsContractSymbol = `WHC`
  const baseTokenURI = 'https://localhost:3000/nfts/'

  const { owner } = await getNamedAccounts()

  await deploy('ZillionWhalesNft', {
    from: owner,
    log: true,
    args: [cardsContractName, cardsContractSymbol, baseTokenURI],
  })
}

module.exports = func
func.tags = ['nft']