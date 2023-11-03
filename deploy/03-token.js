const { ethers } = require('hardhat')

const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const initialSupply = ethers.utils.parseUnits('1000000000', 18)
  const name = 'Wild Forest'
  const symbol = 'WF'

  const { wfTokenOwner } = await getNamedAccounts()

  await deploy('WildForestToken', {
    from: wfTokenOwner,
    log: true,
    args: [initialSupply, name, symbol],
  })
}

module.exports = func
func.tags = ['token']