'use strict'

require('dotenv').config()

const { ThirdwebStorage } = require('@thirdweb-dev/storage')

const { THIRD_WEB_CLIENT_ID, THIRD_WEB_SECRET_KEY } = process.env

class IPFSService {
  constructor(logger) {
    this._logger = logger
    this._storage = new ThirdwebStorage({
      clientId: THIRD_WEB_CLIENT_ID,
      secretKey: THIRD_WEB_SECRET_KEY,
    })
  }

  async uploadImage(imageContent) {
    const uri = await this._storage.upload(imageContent)
    const url = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
    return { uri, url }
  }

}

module.exports = IPFSService