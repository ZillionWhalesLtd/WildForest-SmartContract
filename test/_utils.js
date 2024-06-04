'use strict'

const HARDHAT_LOCAL_CHAIN_ID = 31337

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

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
      { name: 'playerId', type: 'string' },
      { name: 'identificators', type: 'string[]' },
      { name: 'deadline', type: 'uint256' },
    ],
  }

  return signer._signTypedData(domain, types, mintData)
}

const signTransferData = async(signer, transferData, contractName, verifyingContractAddress) => {
  const domain = {
    name: contractName,
    version: '1',
    chainId: HARDHAT_LOCAL_CHAIN_ID,
    verifyingContract: verifyingContractAddress,
  };

  const types = {
    TransferData: [
      { name: 'walletAddress', type: 'address' },
      { name: 'playerId', type: 'string' },
      { name: 'senderAddress', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'identificator', type: 'string' },
      { name: 'deadline', type: 'uint256' },
    ],
  }

  return signer._signTypedData(domain, types, transferData)
}

module.exports = { signMintData, signTransferData, ZERO_ADDRESS }