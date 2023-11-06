require('dotenv').config()

const { MEDAL_OWNER_ADDRESS } = process.env

const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const name = 'WildForestMedals'
  const symbol = `WFM`
  // const uri = 'https://localhost:3000/api/mdeal/{id}.json'
  const uri = 'https://localhost:3000/api/mdeal/'

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestMedal', {
    from: deployer,
    log: true,
    args: [name, symbol, uri, MEDAL_OWNER_ADDRESS],
  })
}

module.exports = func
func.tags = ['medal']