const groupBy = require('lodash.groupby')
const keyBy = require('lodash.keyby')
// const FileService = require('./services/FileService')
const CsvService = require('./services/CsvService')

const GENERATED_PACKS_FILE_NAME = 'minted_packs-saigon.json'
const MINTED_LORDS_FILE_NAME = 'minted_lords-saigon.json'

const main = async() => {
  // const fileService = new FileService()
  // fileService.writeFile(filePath, contentToWrite)
  const csvService = new CsvService()
  const repoPath = process.cwd()
  const skinsConfigPath = `${repoPath}/bin/csvConfigs/unitSkins.csv`
  const unitsConfigPath = `${repoPath}/bin/csvConfigs/ConfigsUnitsList.csv`

  const configSkins = await csvService.readFile(skinsConfigPath)
  const configUnits = await csvService.readFile(unitsConfigPath)
  const lords = require(`./resultData/${MINTED_LORDS_FILE_NAME}`)

  const configSkinsMap = keyBy(configSkins, 'skin_id')
  const configUnitsMap = keyBy(configUnits, 'id')
  const lordsMap = keyBy(lords, 'tokenId')

  const data = require(`./resultData/${GENERATED_PACKS_FILE_NAME}`)
  const resultsMap = { All: { units: {}, skins: {}, lords: {} } }

  const packsMap = groupBy(data, 'type')

  for (const packType in packsMap) {
    resultsMap[packType] = { units: {}, skins: {}, lords: {} }

    const packs = packsMap[packType]
    for (const pack of packs) {
      const { units, skins, lords } = pack.treasure

      for (const unit of units) {
        const unitConfig = configUnitsMap[unit.id]
        const { rarity } = unitConfig

        resultsMap[packType].units[rarity] = resultsMap[packType].units[rarity] || 0
        resultsMap[packType].units[rarity] = resultsMap[packType].units[rarity] + 1

        resultsMap.All.units[rarity] = resultsMap.All.units[rarity] || 0
        resultsMap.All.units[rarity] = resultsMap.All.units[rarity] + 1
      }

      for (const skin of skins) {
        const skinConfig = configSkinsMap[skin.id]
        const { rarity } = skinConfig

        resultsMap[packType].skins[rarity] = resultsMap[packType].skins[rarity] || 0
        resultsMap[packType].skins[rarity] = resultsMap[packType].skins[rarity] + 1

        resultsMap.All.skins[rarity] = resultsMap.All.skins[rarity] || 0
        resultsMap.All.skins[rarity] = resultsMap.All.skins[rarity] + 1
      }

      for (const lord of lords) {
        const mintedLord = lordsMap[lord.id]
        const { rank } = mintedLord

        resultsMap[packType].lords[rank] = resultsMap[packType].lords[rank] || 0
        resultsMap[packType].lords[rank] = resultsMap[packType].lords[rank] + 1

        resultsMap.All.lords[rank] = resultsMap.All.lords[rank] || 0
        resultsMap.All.lords[rank] = resultsMap.All.lords[rank] + 1
      }

    }

  }

  console.log(JSON.stringify(resultsMap))
}

main()