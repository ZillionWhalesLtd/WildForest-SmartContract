const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const name = 'WildForestMedals'
  const symbol = `WFM`
  // const uri = 'https://localhost:3000/api/mdeal/{id}.json'
  const uri = 'https://localhost:3000/api/mdeal/'

  const { medalOwner } = await getNamedAccounts()

  await deploy('WildForestMedal', {
    from: medalOwner,
    log: true,
    args: [name, symbol, uri],
  })
}

module.exports = func
func.tags = ['medal']