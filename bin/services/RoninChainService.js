'use strict'

require('dotenv').config()
const { ethers } = require('ethers')

const ContractService = require('./ContractService')

const RONIN_DECIMALS = 18

const isTest = process.env.NODE_ENV === 'test'

class RoninChainService {
  constructor(logger, chainId) {
    this._logger  = logger
    this._chainId = chainId
  }

  _parseValue(value, decimals) {
    const parsedValue = ethers.utils.formatUnits(value, decimals)

    return parsedValue
  }

  _normilizeAddress(address) {
    let parsedAddress = address

    if (parsedAddress.startsWith('ronin:')) {
      parsedAddress = parsedAddress.replace('ronin:', '0x')
    }

    return parsedAddress
  }

  _normilizeAddresses(addresses) {
    const normilizedAddresses = []

    for (const address of addresses) {
      const parsedAddress = this._normilizeAddress(address)
      normilizedAddresses.push(parsedAddress)
    }

    return normilizedAddresses
  }

  _parseBigNumber(bigNumber) {
    return bigNumber.toNumber()
  }

  async sendToken(addressTo, value, decimals = 18, from, nonce = null) {
    const address = this._normilizeAddress(addressTo)
    const contractService = new ContractService(this._logger, 'TOKEN', this._chainId)
    const options = {}
    if (nonce) {
      options.nonce = nonce
    }

    const { contract } = contractService

    const parsedValue = ethers.utils.parseUnits(value, decimals)
    const transaction = await contract.transfer(address, parsedValue, options)
    await transaction.wait()

    const { hash, chainId, to: smartContractAddress } = transaction

    // const provider = contract.provider;
    // const transactionReceipt = await provider.waitForTransaction(hash);
    //
    // console.log( transactionReceipt)

    return { hash, chainId, smartContractAddress, transaction }
  }

  // async balanceOf(addressFrom, decimals = 18) {
  //   const address = this._normilizeAddress(addressFrom)
  //   const contractService = new ContractService(this._logger, 'TOKEN', this._chainId)
  //   const { contract } = contractService

  //   const balance = await contract.balanceOf(address)
  //   const readableBalance = ethers.utils.formatUnits(balance, decimals)

  //   return readableBalance
  // }

  async mintPackNFT(addressTo) {
    const address = this._normilizeAddress(addressTo)
    const contractService = new ContractService(this._logger, 'NFT_PACKS', this._chainId)
    const { contract } = contractService

    const transaction = await contract.mint(address)
    const { hash, chainId, to: smartContractAddress } = transaction
    const [{ tokenId, recieverAddress }] = await contractService.getMintTransactionMetadata(transaction)

    return { hash, chainId, smartContractAddress, tokenId, recieverAddress }
  }

  async bulkMint(addresses) {
    const mormilizedAddresses = this._normilizeAddresses(addresses)
    const contractService = new ContractService(this._logger, 'NFT_UNITS', this._chainId)
    const { contract } = contractService

    const transaction = await contract.bulkMint(mormilizedAddresses)
    const { hash, chainId, to: smartContractAddress } = transaction
    const tokens = await contractService.getMintTransactionMetadata(transaction)

    return { hash, chainId, smartContractAddress, tokens }
  }

  async bulkMintMedalNft(address, amount) {
    const mormilizedAddress = this._normilizeAddress(address)
    const contractService = new ContractService(this._logger, 'NFT_MEDALS', this._chainId)
    const { contract } = contractService

    const transaction = await contract.mintBatch(mormilizedAddress, [2], [amount])
    const { hash, chainId, to: smartContractAddress } = transaction

    return { hash, chainId, smartContractAddress }
  }

  // async burnNft(tokenId) {
  //   const contractService = new ContractService(this._logger, 'NFT_UNITS', this._chainId)
  //   const { contract } = contractService
  //   const transaction = await contract.burn(Number(tokenId))
  //   const { hash, chainId, to: smartContractAddress } = transaction
  //   const [{ tokenId: burnedTokenId, recieverAddress }] = await contractService.getMintTransactionMetadata(transaction)

  //   return { hash, chainId, smartContractAddress, tokenId: burnedTokenId, recieverAddress }
  // }

  // async bulkBurnNfts(tokenIds) {
  //   const numberTokenIds = []
  //   for (const tokenId of tokenIds) {
  //     numberTokenIds.push(Number(tokenId))
  //   }

  //   const contractService = new ContractService(this._logger, 'NFT_UNITS', this._chainId)
  //   const { contract } = contractService
  //   const transaction = await contract.bulkBurn(numberTokenIds)
  //   const { hash, chainId, to: smartContractAddress } = transaction
  //   const tokens = await contractService.getMintTransactionMetadata(transaction)

  //   return { hash, chainId, smartContractAddress, tokens }
  // }

  _getTokenUri(metadata) {
    const metadataBuffer = Buffer.from(JSON.stringify(metadata))
    const tokenMetadataEncoded = metadataBuffer.toString('base64')
    const tokenUri = `data:application/json;base64,${tokenMetadataEncoded}`
    return  tokenUri
  }

  async mintLordNFT(addressTo, tokenMetadata) {
    const address = this._normilizeAddress(addressTo)
    const tokenUri = this._getTokenUri(tokenMetadata)

    const contractService = new ContractService(this._logger, 'NFT_LORDS', this._chainId)
    const { contract } = contractService

    const transaction = await contract.mint(address, tokenUri)
    const { hash, chainId, to: smartContractAddress } = transaction
    const [{ tokenId, recieverAddress }] = await contractService.getMintTransactionMetadata(transaction)

    return { hash, chainId, smartContractAddress, tokenId, recieverAddress }
  }

  // async setApprovalForAll(address, isApproved) {
  // }

  // async bulkApprove(address, tokenIds) {
  // }
}

module.exports = RoninChainService
