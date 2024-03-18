require('dotenv').config()
const {
  WF_TOKEN_OWNER_ADDRESS,
  SAIGON_WF_TOKEN_OWNER_ADDRESS,
  RONIN_SIGNER,
  SAIGON_SIGNER,
  TOKENS_CONTRACT_ADDRESS,
  SAIGON_TOKENS_CONTRACT_ADDRESS,
} = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const contractName = 'Wild-Forest-Claim-Tokens'

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let ownerAddress = WF_TOKEN_OWNER_ADDRESS
  let signerAddress = RONIN_SIGNER
  let tokenContractAddress = TOKENS_CONTRACT_ADDRESS

  if (isSaigon) {
    ownerAddress = SAIGON_WF_TOKEN_OWNER_ADDRESS
    signerAddress = SAIGON_SIGNER
    tokenContractAddress = SAIGON_TOKENS_CONTRACT_ADDRESS
  }

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestClaimTokenTransfer', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [contractName, ownerAddress, signerAddress, tokenContractAddress],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })

}

module.exports = func
func.tags = ['tokenClaimTransfer']