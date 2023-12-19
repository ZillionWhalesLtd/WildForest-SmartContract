require('dotenv').config()
const { ethers } = require('hardhat')

const { WF_TOKEN_OWNER_ADDRESS } = process.env

const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const initialSupply = ethers.utils.parseUnits('1000000000', 18)
  const name = 'Wild Forest'
  const symbol = 'WF'

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestToken', {
    from: deployer,
    log: true,
    args: [initialSupply, name, symbol, WF_TOKEN_OWNER_ADDRESS],
  })
}

module.exports = func
func.tags = ['token']