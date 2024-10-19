'use strict'

require('dotenv').config()
const { ethers } = require('ethers')

const chunk = require('lodash.chunk')

const ContractService = require('./ContractService')

const RONIN_DECIMALS = 18

const isTest = process.env.NODE_ENV === 'test'

const transactionOptions = {
  gasPrice: ethers.utils.parseUnits('20', 'gwei')
}

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

    return { hash, chainId, smartContractAddress, tokenId, recieverAddress, tokenUri }
  }

  async filterNotMigratedStakes(tokensToRestake) {
    const filteredStakes = []

    const contractService = new ContractService(this._logger, 'LORDS_STAKE', this._chainId)
    const { contract } = contractService

    let i = 0
    for (const tokenToRestake of tokensToRestake) {
      i = i +1

      const { token_id: tokenId, user_wallet_address: ownerAddress } = tokenToRestake

      const lockExpiration = await contract._lockedTokens(tokenId, ownerAddress)

      if (this._parseBigNumber(lockExpiration) < 2) {
        this._logger.log(`tokenId: ${tokenId} owner: ${ownerAddress}, not old stake, lockExpiration: ${lockExpiration}, skip...`)
        continue
      }

      this._logger.log(`tokenId: ${tokenId} added to be migrated, index: ${i}.`)
      filteredStakes.push({ token_id: tokenId, user_wallet_address: ownerAddress })
    }

    return filteredStakes
  }

  async filterNotLockedFragments(tokensToLock) {
    const filteredFragments = []

    const contractService = new ContractService(this._logger, 'NFT_UNITS', this._chainId)
    const { contract } = contractService

    let i = 0
    for (const tokenToLock of tokensToLock) {
      i = i +1

      const { token_id: tokenId } = tokenToLock

      const isUnlocked = await contract.isUnlocked(tokenId)

      if (!isUnlocked) {
        this._logger.log(`tokenId: ${tokenId}, is already locked, skip...`)
        continue
      }

      this._logger.log(`tokenId: ${tokenId} added to be locked, index: ${i}.`)
      filteredFragments.push({ token_id: tokenId })
    }

    return filteredFragments
  }

  async lockFragments(tokensToLock) {
    const CHUNKS_THRESHOLD = 20

    const allTokenIds = []
    for (const tokenToLock of tokensToLock) {
      const { token_id: tokenId } = tokenToLock
      allTokenIds.push(tokenId)
    }

    const contractService = new ContractService(this._logger, 'NFT_UNITS', this._chainId)
    const { contract } = contractService

    const tokensChunks = chunk(allTokenIds, CHUNKS_THRESHOLD)
    for (const tokenIds of tokensChunks) {
      const transaction = await contract.lockIds(tokenIds)
      const events = await contractService.getEventsFromTransaction(transaction)
      const lockedEvents = events.filter(e => e.event === 'TokenLocked')
      console.log('lockedEvents!!', lockedEvents)

      console.log('lockedTokens.length!!', lockedEvents.length)
      console.log('lockedTokenIds!!', tokenIds)
      console.log('-------------------------!!\n\n')
    }
  }

  async upgradeV2Stakes(tokensToRestake) {
    const CHUNKS_THRESHOLD = 20

    const allTokenIds = []
    const allOwners = []
    for (const tokenToRestake of tokensToRestake) {
      const { token_id: tokenId, user_wallet_address: ownerAddress } = tokenToRestake
      allTokenIds.push(tokenId)
      allOwners.push(ownerAddress)
    }

    const tokensChunks = chunk(allTokenIds, CHUNKS_THRESHOLD)
    const ownerChunks = chunk(allOwners, CHUNKS_THRESHOLD)

    const contractService = new ContractService(this._logger, 'LORDS_STAKE', this._chainId)
    const { contract } = contractService

    for (const [i, tokenIds] of tokensChunks.entries()) {
      const owners = ownerChunks[i]
      const transaction = await contract.systemStakeV2Upgrade(tokenIds, owners, transactionOptions)
      const events = await contractService.getEventsFromTransaction(transaction)
      const upgradeEvent = events.find(e => e.event === 'SystemUpgradeStakeV2')
      console.log('upgradeEvent!!', upgradeEvent.args)

      const migratedTokenIds = []
      for (const migratedTokenId of upgradeEvent.args.tokenIds) {
        migratedTokenIds.push(this._parseBigNumber(migratedTokenId))
      }
      console.log('migratedTokenIds!!', migratedTokenIds)
      console.log('-------------------------!!\n\n')
    }
  }

  async mintLordsNFT(addressTo, number) {
    const CHUNKS_THRESHOLD = 20
    const address = this._normilizeAddress(addressTo)

    const contractService = new ContractService(this._logger, 'NFT_LORDS', this._chainId)
    const { contract } = contractService

    const allRecipients = []

    for (let step = 0; step < number; step++) {
      allRecipients.push(address)
    }

    const chunks = chunk(allRecipients, CHUNKS_THRESHOLD)

    for (const recipients of chunks) {
      const transaction = await contract.bulkMint(recipients)
      const { hash, chainId, to: smartContractAddress } = transaction
      const transferEvents = await contractService.getMintTransactionMetadata(transaction)

      for (const transferEvent of transferEvents) {
        const { tokenId } = transferEvent
        console.log(`Minted tokenId ${tokenId}`)
      }
    }
    // return { hash, chainId, smartContractAddress, tokenId, recieverAddress, tokenUri }
  }

  // async setApprovalForAll(address, isApproved) {
  // }

  // async bulkApprove(address, tokenIds) {
  // }
}

module.exports = RoninChainService
