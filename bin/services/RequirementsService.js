'use strict'

require('dotenv').config()

const keyBy = require('lodash.keyby')
const CsvService = require('./CsvService')
const CryptoService = require('./CryptoService')

const { PACKS_ENCRYPTION_KEY } = process.env

const LORDS_DESCRIPTION = 'Wild Forest Lords'

class RequirementsService {
  constructor(logger) {
    this._logger = logger
    this._csvService = new CsvService()
  }

  async buildLordsToMint(dataRequirements, imagesMetadata) {
    const lordsToMint = []
    const imagesMap = keyBy(imagesMetadata, 'id')

    const repoPath = process.cwd()
    const lordsConfigPath = `${repoPath}/bin/csvConfigs/lords.csv`
    const lords = await this._csvService.readFile(lordsConfigPath)

    const { rank } = dataRequirements
    for (const rankType in rank) {
      const lordsTypeNumber = rank[rankType]
      const lord = lords.find(l => { return l.rank === rankType })

      for (let counter = 0; counter < lordsTypeNumber; counter++) {
        const { id: lordId, name, rank: lordRank, species, dna } = lord
        const { url } = imagesMap[lordId]
        // specie - enum 1 - Fox, 2 - Wolf
        // rank - enum 0 - Basic, 1 - Common, ..., 6 - Mystic
        // dna - hex XXX - emotion, clothes, flag

        const attributes = [
          { trait_type: 'species', value: species },
          { trait_type: 'rank', value: lordRank },
          { trait_type: 'dna', value: dna },
        ]

        const metadata = {
          // id
          name,
          description: LORDS_DESCRIPTION,
          image: url,
          attributes,
        }
        const lordToMint = { metadata, attributesJSON: JSON.stringify(attributes), rank: lordRank }

        lordsToMint.push(lordToMint)
      }
    }

    return lordsToMint
  }

  async buildPacksToMint(dataRequirements, lordsData) {
    const cryptoService = new CryptoService(this._logger)
    const packsToMint = []

    const treasure = {
      // "units": [{ image: '...', properties: { "type_id":8101,"tier":1,"rarity":"Common","level":1 } }],
      // "skins": [{ image: '...', properties: {..?.} }],
      // "lords": [{ image: '...', properties: {..?.} }],
      // "tokens": 125,
    }
    const ecnryptedTreasure = cryptoService.encrypt(treasure, PACKS_ENCRYPTION_KEY)
    const treasureHash = await cryptoService.hash(treasureHash)
    const publickMetadata = {
      name: 'Treasure Pack',
      description: 'Treasure Pack',
      image: "https://image.com/closedTreasure",
      properties: {
         state: 'locked',
          treasure: ecnryptedTreasure
       }
    }

    const rawMetadata = {
      ...publickMetadata, properties: { state: 'unlocked', treasure }
    }

    const hashedApproachMetdata = {
      ...publickMetadata, properties: { state: 'locked', treasure: treasureHash }
    }

    const packToMint = {
      publickMetadata,
      rawMetadata,
      hashedApproachMetdata
    }
    packsToMint.push(packToMint)

    return packsToMint
  }

}

module.exports = RequirementsService