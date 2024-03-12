'use strict'

const HARDHAT_LOCAL_CHAIN_ID = 31337

const signMintData = async(signer, mintData, contractName, verifyingContractAddress) => {
  const domain = {
    name: contractName,
    version: '1',
    chainId: HARDHAT_LOCAL_CHAIN_ID,
    verifyingContract: verifyingContractAddress,
  };

  const types = {
    MintData: [
      { name: 'walletAddress', type: 'address' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  }

  return signer._signTypedData(domain, types, mintData)
}

module.exports = { signMintData }