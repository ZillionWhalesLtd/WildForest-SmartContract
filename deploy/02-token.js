const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const initialSupply = 9000000000000000
  const name = 'Wild Forest'
  const symbol = 'WF'
  const { owner } = await getNamedAccounts()

  await deploy('WildForestToken', {
    from: owner,
    log: true,
    args: [initialSupply, name, symbol],
  })
}

module.exports = func
func.tags = ['token']