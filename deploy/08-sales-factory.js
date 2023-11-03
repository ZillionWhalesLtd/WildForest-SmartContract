const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const { owner } = await getNamedAccounts()

  await deploy('WildForestSalesFactory', {
    from: owner,
    log: true,
    args: [],
  })
}

module.exports = func
func.tags = ['salesFactory']