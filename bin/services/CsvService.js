'use strict'

const csv = require('csvtojson')

class CsvService {
  constructor(options = {}) {
    this._options = options
  }

  async readFile(csvFilePath) {
    const objects = await csv().fromFile(csvFilePath)

    return objects
  }
}

module.exports = CsvService