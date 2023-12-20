require('dotenv').config()
const { ethers } = require('hardhat')

const { WF_TOKEN_OWNER_ADDRESS, SAIGON_WF_TOKEN_OWNER_ADDRESS } = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const initialSupply = ethers.utils.parseUnits('1000000000', 18)
  const name = 'Wild Forest'
  const symbol = 'WF'

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let wfTokenOwnerAddress = WF_TOKEN_OWNER_ADDRESS
  if (isSaigon) {
    wfTokenOwnerAddress = SAIGON_WF_TOKEN_OWNER_ADDRESS
  }

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestToken', {
    from: deployer,
    log: true,
    args: [initialSupply, name, symbol, wfTokenOwnerAddress],
  })
}

module.exports = func
func.tags = ['token']