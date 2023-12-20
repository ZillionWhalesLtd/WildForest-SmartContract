'use strict'

const { expect } = require('chai')
const CryptoService = require('../../bin/services/CryptoService')

const crypto = require('crypto')

const cryptoService = new CryptoService(console)
const dummyEncryptionKey = crypto.randomBytes(32).toString('hex')
const data = {
  units: 2,
  skins: [{ rare: 3 }],
  lords: [1,2,5]
}

describe('CryptoService', async() => {
  it('encrypt, decrypt (success)', async() => {
    const encrypted = cryptoService.encrypt(data, dummyEncryptionKey)

    // console.log('encrypted!!', encrypted) // eslint-disable-line
    expect(encrypted).to.be.not.undefined

    const decryptedResult = cryptoService.decrypt(encrypted, dummyEncryptionKey)
    expect(decryptedResult).to.be.not.undefined
    expect(decryptedResult).to.be.deep.equal(data)
  })

  it('hash (success)', async() => {
    const result = await cryptoService.hash(data)

    expect(result).to.be.not.undefined

    const secondResult = await cryptoService.hash(data)
    expect(secondResult).to.be.deep.equal(result)
  })

})
