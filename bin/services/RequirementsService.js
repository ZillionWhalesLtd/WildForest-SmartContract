'use strict'

const keyBy = require('lodash.keyby')
const CsvService = require('./CsvService')

const LORDS_DESCRIPTION = 'Wild Forest Lords'

class RequirementsService {
  constructor(logger) {
    this._logger = logger
    this._csvService = new CsvService()
  }

  buildLordsToMint(dataRequirements, imagesMetadata) {
    const lordsToMint = []
    const imagesMap = keyBy(imagesMetadata, 'id')
    const lordsConfigPath = './csvConfigs/lords.csv'
    const lords = await this._csvService.readFile(lordsConfigPath)

    const { rank } = dataRequirements
    for (const rankType in rank) {
      const lordsTypeNumber = rank[rankType]
      const lord = lords.find(l => { return l.rank === rankType })

      for (let counter = 0; counter < lordsTypeNumber; counter++) {
        const { id: lordId, name } = lord
        const { url } = imagesMap[lordId]
        // specie - enum 1 - Fox, 2 - Wolf
        // rank - enum 0 - Basic, 1 - Common, ..., 6 - Mystic
        // dna - hex XXX - emotion, clothes, flag

        const dna = 'XXX'
        const species = '1'
        const attributes = [
          { trait_type: 'species', value: species },
          { trait_type: 'rank', value: rank },
          { trait_type: 'dna', value: dna },
        ]

        const metadata = {
          // id
          name,
          description: LORDS_DESCRIPTION,
          image: url,
          attributes,
        }
        const lord = { metadata, rank }

        lordsToMint.push(lord)
      }
    }

    return lordsToMint
  }

  buildLordsToMintbuildPacksToMint(dataRequirements, lordsData) {
    return []
  }

}

module.exports = RequirementsService