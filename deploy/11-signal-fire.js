require('dotenv').config()
const {
  SIGNAL_FIRE_OWNER_ADDRESS,
  SAIGON_SIGNAL_FIRE_OWNER_ADDRESS,
} = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const contractName = 'Wild Forest Signal Fire'
  const cooldownPeriod = 1 * 24 * 60 * 60

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let ownerAddress = SIGNAL_FIRE_OWNER_ADDRESS

  if (isSaigon) {
    ownerAddress = SAIGON_SIGNAL_FIRE_OWNER_ADDRESS
  }

  const { deployer } = await getNamedAccounts()

  console.log({ contractName, ownerAddress, cooldownPeriod }) // eslint-disable-line

  await deploy('WildForestSignalFire', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [contractName, ownerAddress, cooldownPeriod],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })

}

module.exports = func
func.tags = ['signalFire']