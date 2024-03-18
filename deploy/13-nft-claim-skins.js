require('dotenv').config()
const {
  SKINS_OWNER_ADDRESS,
  SAIGON_SKINS_OWNER_ADDRESS,
  RONIN_SIGNER,
  SAIGON_SIGNER,
  SKINS_CONTRACT_ADDRESS,
  SAIGON_SKINS_CONTRACT_ADDRESS,
} = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const contractName = 'Wild-Forest-Claim-Skins'

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let skinsOwnerAddress = SKINS_OWNER_ADDRESS
  let signerAddress = RONIN_SIGNER
  let nftContractAddress = SKINS_CONTRACT_ADDRESS

  if (isSaigon) {
    skinsOwnerAddress = SAIGON_SKINS_OWNER_ADDRESS
    signerAddress = SAIGON_SIGNER
    nftContractAddress = SAIGON_SKINS_CONTRACT_ADDRESS
  }

  const { deployer } = await getNamedAccounts()

  await deploy('WildForestClaimNft', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [contractName, skinsOwnerAddress, signerAddress, nftContractAddress],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })

}

module.exports = func
func.tags = ['nftClaimSkins']