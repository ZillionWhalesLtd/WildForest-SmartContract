require('dotenv').config()

const { MEDAL_OWNER_ADDRESS } = process.env

const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const cardsContractName = 'WildForestBattlePass'
  const cardsContractSymbol = 'WFB'
  const baseTokenURI = 'https://localhost:3000/battlePass/'

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestTimeLockNft', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [cardsContractName, cardsContractSymbol, baseTokenURI, MEDAL_OWNER_ADDRESS],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })
}

module.exports = func
func.tags = ['timeLockNft']