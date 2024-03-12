'use strict'

const signMintData = async(signer, mintData, verifyingContractAddress) => {
  const domain = {
    name: mintData.contractName,
    version: '1',
    chainId: 31337,
    verifyingContract: verifyingContractAddress,
  };

  const types = {
    MintData: [
      { name: 'walletAddress', type: 'address' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
      { name: 'contractName', type: 'string' },
    ],
  }

  return signer._signTypedData(domain, types, mintData)
}

module.exports = { signMintData }