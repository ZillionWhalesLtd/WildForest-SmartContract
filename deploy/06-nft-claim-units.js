require('dotenv').config()
const {
  UNITS_OWNER_ADDRESS,
  SAIGON_UNITS_OWNER_ADDRESS,
  RONIN_SIGNER,
  SAIGON_SIGNER,
  UNITS_CONTRACT_ADDRESS,
  SAIGON_UNITS_CONTRACT_ADDRESS,
} = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const contractName = 'Wild-Forest-Claim-Units'

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let unitsOwnerAddress = UNITS_OWNER_ADDRESS
  let signerAddress = RONIN_SIGNER
  let nftContractAddress = UNITS_CONTRACT_ADDRESS

  if (isSaigon) {
    unitsOwnerAddress = SAIGON_UNITS_OWNER_ADDRESS
    signerAddress = SAIGON_SIGNER
    nftContractAddress = SAIGON_UNITS_CONTRACT_ADDRESS
  }

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestClaimNft', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [contractName, unitsOwnerAddress, signerAddress, nftContractAddress],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })

}

module.exports = func
func.tags = ['nftClaimUnits']