require('dotenv').config()
const {
  LORDS_NFT_OWNER_ADDRESS,
  SAIGON_LORDS_NFT_OWNER_ADDRESS,
  LORDS_CONTRACT_ADDRESS,
  SAIGON_LORDS_CONTRACT_ADDRESS,
} = process.env

const func = async function ({ getChainId, getNamedAccounts, deployments: { deploy } }) {
  const contractName = 'Wild-Forest-Lords-Lock'
  const lockPeriod = 90 * 24 * 60 * 60

  const chainId = await getChainId()
  const isSaigon = chainId === '2021'

  let ownerAddress = LORDS_NFT_OWNER_ADDRESS
  let nftContractAddress = LORDS_CONTRACT_ADDRESS

  if (isSaigon) {
    ownerAddress = SAIGON_LORDS_NFT_OWNER_ADDRESS
    nftContractAddress = SAIGON_LORDS_CONTRACT_ADDRESS
  }

  const { deployer } = await getNamedAccounts()

  console.log({ contractName, ownerAddress, nftContractAddress, lockPeriod }) // eslint-disable-line

  await deploy('WildForestLockNft', {
    from: deployer,
    log: true,
    proxy: {
      execute: {
        init: {
          methodName: 'initialize',
          args: [contractName, ownerAddress, nftContractAddress, lockPeriod],
        },
      },
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  })

}

module.exports = func
func.tags = ['nftLock']