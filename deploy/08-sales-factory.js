const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const { baseOwner } = await getNamedAccounts()

  await deploy('WildForestSalesFactory', {
    from: baseOwner,
    log: true,
    args: [],
  })
}

module.exports = func
func.tags = ['salesFactory']