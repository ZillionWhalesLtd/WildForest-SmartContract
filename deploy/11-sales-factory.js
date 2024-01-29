const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const { deployer } = await getNamedAccounts()

  await deploy('WildForestSalesFactory', {
    from: deployer,
    log: true,
    args: [],
  })
}

module.exports = func
func.tags = ['salesFactory']