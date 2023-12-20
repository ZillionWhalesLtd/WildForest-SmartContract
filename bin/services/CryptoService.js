'use strict'

const crypto = require('crypto')

const ENCRYPTION_ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16

class CryptoService {
  constructor(logger) {
    this._logger = logger
  }

  encrypt(data, encryptionKey) {
    const dataString = JSON.stringify(data)
    const dataBuffer = Buffer.from(dataString)
    const iv = crypto.randomBytes(IV_LENGTH)

    const encryptionKeyBuffer = Buffer.from(encryptionKey)
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, encryptionKeyBuffer, iv)
    const encryptedData = Buffer.concat([cipher.update(dataBuffer), cipher.final()])

    return Buffer.concat([iv, encryptedData]).toString('hex')
  }

  decrypt(encryptedString, encryptionKey) {
    const encryptedBuffer = Buffer.from(encryptedString, 'hex')
    const iv = encryptedBuffer.slice(0, IV_LENGTH)
    const encryptedWtihoutVector = encryptedBuffer.slice(IV_LENGTH)

    const encryptionKeyBuffer = Buffer.from(encryptionKey)
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, encryptionKeyBuffer, iv)

    const decryptedBuffer = Buffer.concat([decipher.update(encryptedWtihoutVector), decipher.final()])
    const decryptedString = decryptedBuffer.toString()
    const decryptedObject = JSON.parse(decryptedString)

    return decryptedObject
  }

  async hash(data) {
    const dataString = JSON.stringify(data)
    const buffer = Buffer.from(dataString)
    const digest = await crypto.createHash('sha256').update(buffer).digest()
    return digest
  }
}

module.exports = CryptoService