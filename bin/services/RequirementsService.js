'use strict'

require('dotenv').config()

const keyBy = require('lodash.keyby')
const groupBy = require('lodash.groupby')

const CsvService = require('./CsvService')
const CryptoService = require('./CryptoService')

// const { PACKS_ENCRYPTION_KEY } = process.env

// const LORDS_DESCRIPTION = 'Wild Forest Lords'
const LORDS_DESCRIPTION = ''

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

class RequirementsService {
  constructor(logger) {
    this._logger = logger
    this._csvService = new CsvService()
  }

  async buildLordsToMintFromMetadata(dataRequirements) {
    // const baseImagePath = 'https://ww-nft-static.sfo3.cdn.digitaloceanspaces.com/images_lord'
    const lordsToMint = []

    const lordRecords = dataRequirements

    for (const lordRecord of lordRecords) {

      // const { nft_id, specie, lordRank, dna, name, url } = lordRecord
      const { nft_id: recordId, specie, rank: lordRank, dna, name, imageUrl: url } = lordRecord

      const attributes = [
        { trait_type: 'specie', value: specie },
        { trait_type: 'rank', value: lordRank },
        { trait_type: 'dna', value: dna },
      ]


      // const url = `${baseImagePath}/${imagePath}`
      const metadata = {
        // id
        name,
        description: LORDS_DESCRIPTION,
        image: url,
        attributes,
      }

      const lordToMint = {
        recordId,
        metadata,
        rank: lordRank,
        attributesJSON: JSON.stringify(attributes),
      }

      lordsToMint.push(lordToMint)
    }

    return lordsToMint
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
          { trait_type: 'specie', value: species },
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

  _extendArrayByRecordNTimes(array, item, nTimes) {
    for(let i = 0; i < nTimes; i++){
      array.push(item)
    }
  }

  _prepareArrayWithWeights(cleanArray, weights, unitsTypesMap) {
    const recordWeightIdMap = {}
    for (const weight in weights) {
      const typeIds = weights[weight]
      for (const typeId of typeIds) {
        const units = unitsTypesMap[typeId]

        for (const unit of units) {
          recordWeightIdMap[unit.id]= Number(weight)
        }

      }
    }

    const arrayWithWeights = []
    for (const record of cleanArray) {
      const recordWeight = recordWeightIdMap[record.id] || 100
      this._extendArrayByRecordNTimes(arrayWithWeights, record, recordWeight)
    }

    return arrayWithWeights
  }

  async buildPacksToMint(dataRequirements, lordsData) {

    const cryptoService = new CryptoService(this._logger)
    const lordsGroupedMap = groupBy(lordsData, 'rank')

    const repoPath = process.cwd()
    const unitsWeights = require(`${repoPath}/bin/mintRequirements/unitsWeights.json`)

    const skinsConfigPath = `${repoPath}/bin/csvConfigs/unitSkins.csv`
    const unitsConfigPath = `${repoPath}/bin/csvConfigs/ConfigsUnitsList.csv`

    const configSkins = await this._csvService.readFile(skinsConfigPath)
    const configUnits = await this._csvService.readFile(unitsConfigPath)

    const skinsGroupedMap = groupBy(configSkins, 'rarity')
    const unitsGroupedMap = groupBy(configUnits, 'rarity')
    const unitsTypesMap  = groupBy(configUnits, 'type_id')
    const packsToMint = []

    let packCounter = 18801
    for (const packType in dataRequirements.types) {
      const typeDistribution = dataRequirements.types[packType]
      const { pack_id, number, lords, units, skins: originalSkins } = typeDistribution

      const lordsDstributionArray = []

      for (const lordType in lords) {
        const lordTypeNumber = lords[lordType]

        for (let counter = 0; counter < lordTypeNumber; counter++) {
          lordsDstributionArray.push({ rank: lordType })
        }
      }

      const lordsLength = lordsDstributionArray.length

      if (lordsLength < number) {
        for (let counter = 0; counter < number - lordsLength ; counter++) {
          lordsDstributionArray.push({ isEmpty: true })
        }
      }

      for (let counter = 0; counter < number; counter++) {
        const skins = { ...originalSkins }
        const randomLordPosition = randomNumber(0, lordsDstributionArray.length)
        const [randomLord] = lordsDstributionArray.splice(randomLordPosition, 1)

        const skinsTreasury = []
        let legendaryIsPicked
        if ( (skins.Legendary > 0 && skins.Legendary < 1) && (skins.Epic > 0 && skins.Epic < 1) ) {
          const randomLegendary = randomNumber(1, 100) / 100
          legendaryIsPicked = randomLegendary < skins.Legendary
          if (legendaryIsPicked) {
            skins.Legendary = 1
            skins.Epic = 0
          } else {
            skins.Legendary = 0
            skins.Epic = 1
          }
        }

        for (const skinType in skins) {
          const skinsTypeNumber = skins[skinType]
          if (skinsTypeNumber > 0) {
            const skinsTypeArray = [...skinsGroupedMap[skinType]]
            for (let counter = 0; counter < skinsTypeNumber; counter++) {
              const randomSkinTypePosition = randomNumber(0, skinsTypeArray.length)
              const [pickedSkin] = skinsTypeArray.splice(randomSkinTypePosition, 1)
              const { skin_id } = pickedSkin
              skinsTreasury.push({ id: skin_id })
            }
          }
        }

        const unitsTreasury = []
        for (const unitType in units) {
          const unitsTypeNumber = units[unitType]
          if (unitsTypeNumber > 0) {
            const unitsTypeArray = [...unitsGroupedMap[unitType]]
            let unitsArrayWithWeights = this._prepareArrayWithWeights(unitsTypeArray, unitsWeights.chance, unitsTypesMap)
            for (let counter = 0; counter < unitsTypeNumber; counter++) {

              const randomUnitTypePosition = randomNumber(0, unitsArrayWithWeights.length)
              const pickedUnit = unitsArrayWithWeights[randomUnitTypePosition]
              const { id } = pickedUnit
              unitsArrayWithWeights = unitsArrayWithWeights.filter((u) => { return u.id !== id })

              // const randomUnitTypePosition = randomNumber(0, unitsTypeArray.length - 1)
              // const [pickedUnit] = unitsTypeArray.splice(randomUnitTypePosition, 1)
              // const { id } = pickedUnit
              unitsTreasury.push({ id })
              // unitsTreasury.push(unitTreasury)
            }
          }
        }

        const treasure = {
          units: unitsTreasury,
          skins: skinsTreasury,
          // "tokens": 125,
        }

        if (!randomLord.isEmpty) {
          const mintedLordsRanks = lordsGroupedMap[randomLord.rank]
          const randomLorTypePosition = randomNumber(0, mintedLordsRanks.length)
          const [mintedTypeLord] = mintedLordsRanks.splice(randomLorTypePosition, 1)
          const { tokenId } = mintedTypeLord
          treasure.lords = [{ tokenId }]
        }

        const csvUnits = treasure.units.map(ut => ut.id)
        const csvSkins = treasure.skins.map(ut => ut.id)

        let csvLords = ''
        if (treasure.lords) {
          csvLords = treasure.lords.map(ut => ut.tokenId)
        }
        const csvBased = {
          id: packCounter,
          type: packType,
          lords: csvLords,
          units: csvUnits,
          skins: csvSkins,
          wfTokens: '',
          bpSeasonId: ''
        }

        const packToMint = {
          name: 'Treasure Pack',
          type: packType,
          treasure,
          id: packCounter,
          treasureJSON: JSON.stringify(treasure),
          csvBased,
        }

        packCounter++

        // const ecnryptedTreasure = cryptoService.encrypt(treasure, PACKS_ENCRYPTION_KEY)
        // const treasureHash = await cryptoService.hash(treasure)
        // const publickMetadata = {
        //   name: 'Treasure Pack',
        //   description: 'Treasure Pack',
        //   image: "https://image.com/closedTreasure",
        //   properties: {
        //      state: 'locked',
        //       treasure: ecnryptedTreasure
        //    }
        // }

        // const rawMetadata = {
        //   ...publickMetadata, properties: { state: 'unlocked', treasure }
        // }

        // const hashedApproachMetdata = {
        //   ...publickMetadata, properties: { state: 'locked', treasure: treasureHash }
        // }

        // const packToMint = {
        //   publickMetadata,
        //   ecnryptedTreasure,
        //   rawMetadata,
        //   treasure: JSON.stringify(treasure),
        //   hashedApproachMetdata,
        //   treasureHash
        // }
        packsToMint.push(packToMint)

      }

    }

    return packsToMint
  }

}

module.exports = RequirementsService
