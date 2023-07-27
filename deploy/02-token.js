const func = async function ({ getNamedAccounts, deployments: { deploy } }) {
  const initialSupply = 9000000000000000

  const { owner } = await getNamedAccounts()

  await deploy('ZillionWhalesToken', {
    from: owner,
    log: true,
    args: [initialSupply],
  })
}

module.exports = func
func.tags = ['token']