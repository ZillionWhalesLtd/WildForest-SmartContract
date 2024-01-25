'use strict'

const {
  NFT_ABI,
  NFT_MEDAL_ABI,
  NFT_DEFINED_URI_ABI,
  TOKEN_ABI
} = require('./abi')

require('dotenv').config()
const { ethers } = require('ethers')

const {
  // MNEMONIC,
  // MNEMONIC_BP,
  SAIGON_RPC_URL,
  RONIN_RPC_URL,
  SKY_MAVIS_API_KEY,
  //
  SAIGON_NFT_UNITS_CONTRACT_ADDRESS,
  SAIGON_NFT_SKINS_CONTRACT_ADDRESS,
  SAIGON_NFT_PACKS_CONTRACT_ADDRESS,
  SAIGON_NFT_LORDS_CONTRACT_ADDRESS,
  SAIGON_NFT_MEDALS_CONTRACT_ADDRESS,
  SAIGON_TOKENS_CONTRACT_ADDRESS,
  //
  SAIGON_UNITS_OWNER_PK,
  SAIGON_SKINS_OWNER_PK,
  SAIGON_PACKS_OWNER_PK,
  SAIGON_LORDS_OWNER_PK,
  SAIGON_MEDALS_OWNER_PK,
  SAIGON_TOKENS_OWNER_PK,
  //
  RONIN_NFT_UNITS_CONTRACT_ADDRESS,
  RONIN_NFT_SKINS_CONTRACT_ADDRESS,
  RONIN_NFT_PACKS_CONTRACT_ADDRESS,
  RONIN_NFT_LORDS_CONTRACT_ADDRESS,
  RONIN_NFT_MEDALS_CONTRACT_ADDRESS,
  RONIN_TOKENS_CONTRACT_ADDRESS,
  //
  RONIN_UNITS_OWNER_PK,
  RONIN_SKINS_OWNER_PK,
  RONIN_PACKS_OWNER_PK,
  RONIN_LORDS_OWNER_PK,
  RONIN_MEDALS_OWNER_PK,
  RONIN_TOKENS_OWNER_PK,
} = process.env


const SUPPORTED_CHAIN_IDS = [
  'ronin',
  'saigon'
]

const _validateChainId = (chainId) => {
  if (!SUPPORTED_CHAIN_IDS.includes(chainId)) {
    throw new Error(`Not supported chainId: ${chainId}, supported are: ${SUPPORTED_CHAIN_IDS}`)
  }
}

class ContractService {
  constructor(logger, contractType = 'NFT_UNITS', chainId) {
    let contractAddress
    let abi
    let privateKey

    _validateChainId(chainId)
    const isMainNet = chainId === 'ronin'

    let skyMavisConnection = {
      url: SAIGON_RPC_URL,
      headers: {
        'x-api-key': SKY_MAVIS_API_KEY
      }
    }

    let tokenContractAddress = SAIGON_TOKENS_CONTRACT_ADDRESS
    let unitsContractAddress = SAIGON_NFT_UNITS_CONTRACT_ADDRESS
    let skinsContractAddress = SAIGON_NFT_SKINS_CONTRACT_ADDRESS
    let packsContractAddress = SAIGON_NFT_PACKS_CONTRACT_ADDRESS
    let lordsContractAddress = SAIGON_NFT_LORDS_CONTRACT_ADDRESS
    let medalsContractAddress = SAIGON_NFT_MEDALS_CONTRACT_ADDRESS

    let tokenOwnerPrivateKey = SAIGON_TOKENS_OWNER_PK
    let unitsOwnerPrivateKey = SAIGON_UNITS_OWNER_PK
    let skinsOwnerPrivateKey = SAIGON_SKINS_OWNER_PK
    let packsOwnerPrivateKey = SAIGON_PACKS_OWNER_PK
    let lordsOwnerPrivateKey = SAIGON_LORDS_OWNER_PK
    let medalsOwnerPrivateKey = SAIGON_MEDALS_OWNER_PK

    if (isMainNet) {
      tokenContractAddress = RONIN_TOKENS_CONTRACT_ADDRESS
      unitsContractAddress = RONIN_NFT_UNITS_CONTRACT_ADDRESS
      skinsContractAddress = RONIN_NFT_SKINS_CONTRACT_ADDRESS
      packsContractAddress = RONIN_NFT_PACKS_CONTRACT_ADDRESS
      lordsContractAddress = RONIN_NFT_LORDS_CONTRACT_ADDRESS
      medalsContractAddress = RONIN_NFT_MEDALS_CONTRACT_ADDRESS

      tokenOwnerPrivateKey = RONIN_TOKENS_OWNER_PK
      unitsOwnerPrivateKey = RONIN_UNITS_OWNER_PK
      skinsOwnerPrivateKey = RONIN_SKINS_OWNER_PK
      packsOwnerPrivateKey = RONIN_PACKS_OWNER_PK
      lordsOwnerPrivateKey = RONIN_LORDS_OWNER_PK
      medalsOwnerPrivateKey = RONIN_MEDALS_OWNER_PK

      skyMavisConnection = {
        url: RONIN_RPC_URL,
        headers: {
          'x-api-key': SKY_MAVIS_API_KEY
        }
      }
    }

    switch (contractType) {
      case 'TOKEN':
        contractAddress = tokenContractAddress
        privateKey = tokenOwnerPrivateKey
        abi = TOKEN_ABI
        break
      case 'NFT_UNITS':
        contractAddress = unitsContractAddress
        privateKey = unitsOwnerPrivateKey
        abi = NFT_ABI
        break
      case 'NFT_SKINS':
        contractAddress = skinsContractAddress
        privateKey = skinsOwnerPrivateKey
        abi = NFT_ABI
        break
      case 'NFT_PACKS':
        contractAddress = packsContractAddress
        privateKey = packsOwnerPrivateKey
        abi = NFT_ABI
        break
      case 'NFT_LORDS':
        contractAddress = lordsContractAddress
        privateKey = lordsOwnerPrivateKey
        abi = NFT_DEFINED_URI_ABI
        break
      case 'NFT_MEDALS':
        contractAddress = medalsContractAddress
        privateKey = medalsOwnerPrivateKey
        abi = NFT_MEDAL_ABI
        break
      default:
        throw Error(`Sorry, we do not support ${contractType} contract.`)
    }

    const provider = new ethers.providers.JsonRpcProvider(skyMavisConnection)

     //const signer = ethers.Wallet.fromMnemonic(mnemonic).connect(provider)

    const signerWallet = new ethers.Wallet(privateKey, provider);
    const signer = signerWallet.connect(provider);

    const contract = new ethers.Contract(contractAddress, abi, signer)

    this._contract = contract
    this._signerWallet = signerWallet
    this._provider = provider
  }

  get contract() {
    return this._contract
  }

  get walletAddress () {
    return this._signerWallet.address
  }

  async getSignerNonce() {
    const nonce = await this._provider.getTransactionCount(this._signerWallet.address)
    return nonce
  }

  // async getSignerNonce() {
  //   const nonce = await this._signerWallet.getNonce()

  //   return nonce
  // }

  _parseBigNumber(bigNumber) {
    return bigNumber.toNumber()
  }

  async getEventsFromTransaction(transaction) {
    return transaction
      .wait()
      .then(({ events }) => events)
      // .then(([, { args = [] }]) => args[0]?.toNumber())
  }

  async getMintTransactionMetadata(transaction) {
    const tokens = []
    const events = await this.getEventsFromTransaction(transaction)
    const filteredEvents = events.filter(e => e.event === 'Transfer')

    for (const event of filteredEvents) {
      const tokenId = this._parseBigNumber(event.args.tokenId)
      const recieverAddress = event.args.to

      tokens.push({ tokenId, recieverAddress })
    }

    return tokens
  }

  async getNewMedalSeasonTransactionMetadata(transaction) {
    const tokens = []
    const events = await this.getEventsFromTransaction(transaction)
    const filteredEvents = events.filter(e => e.event === 'TransferSingle')

    for (const event of filteredEvents) {
      const id = this._parseBigNumber(event.args.id)
      const value = this._parseBigNumber(event.args.value)

      tokens.push({ id, value })
    }

    return tokens
  }

}

module.exports = ContractService
