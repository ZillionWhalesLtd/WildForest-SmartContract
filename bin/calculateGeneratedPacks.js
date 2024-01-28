const groupBy = require('lodash.groupby')
const keyBy = require('lodash.keyby')
const uniq = require('lodash.uniq')
// const FileService = require('./services/FileService')
const CsvService = require('./services/CsvService')

const GENERATED_PACKS_FILE_NAME = 'minted_packs-1706389873132.json'
// const GENERATED_PACKS_FILE_NAME = 'minted_packs-1706387582481.json'
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
  const mintedLords = require(`./resultData/${MINTED_LORDS_FILE_NAME}`)

  const configSkinsMap = keyBy(configSkins, 'skin_id')
  const configUnitsMap = keyBy(configUnits, 'id')
  const lordsMap = keyBy(mintedLords, 'tokenId')

  const data = require(`./resultData/${GENERATED_PACKS_FILE_NAME}`)
  const resultsMap = { All: { units: {}, skins: {}, lords: {} } }
  const resultsIdsMap = { All: { units: {}, skins: {} } }
  const unitsMap = { All: {} }
  const skinsMap = { All: {} }

  const packsMap = groupBy(data, 'type')

  for (const packType in packsMap) {
    resultsMap[packType] = { units: {}, skins: {}, lords: {} }
    resultsIdsMap[packType] = { units: {}, skins: {} }
    unitsMap[packType] = {}
    skinsMap[packType] = {}

    const packs = packsMap[packType]
    for (const pack of packs) {
      const { units, skins } = pack.treasure
      const lords = pack.treasure.lords || []

      for (const unit of units) {
        const unitConfig = configUnitsMap[unit.id]
        const { rarity } = unitConfig

        resultsMap[packType].units[rarity] = resultsMap[packType].units[rarity] || 0
        resultsMap[packType].units[rarity] = resultsMap[packType].units[rarity] + 1

        resultsMap.All.units[rarity] = resultsMap.All.units[rarity] || 0
        resultsMap.All.units[rarity] = resultsMap.All.units[rarity] + 1

        unitsMap[packType][unit.id] = unitsMap[packType][unit.id] || 0
        unitsMap[packType][unit.id] = unitsMap[packType][unit.id] + 1
        unitsMap.All[unit.id] = unitsMap.All[unit.id] || 0
        unitsMap.All[unit.id] = unitsMap.All[unit.id] + 1

        ///// IDS ////
        resultsIdsMap[packType].units[rarity] = resultsIdsMap[packType].units[rarity] || []
        resultsIdsMap[packType].units[rarity].push(unit.id)

        resultsIdsMap.All.units[rarity] = resultsIdsMap.All.units[rarity] || []
        resultsIdsMap.All.units[rarity].push(unit.id)
      }

      for (const skin of skins) {
        const skinConfig = configSkinsMap[skin.id]
        const { rarity } = skinConfig

        resultsMap[packType].skins[rarity] = resultsMap[packType].skins[rarity] || 0
        resultsMap[packType].skins[rarity] = resultsMap[packType].skins[rarity] + 1

        resultsMap.All.skins[rarity] = resultsMap.All.skins[rarity] || 0
        resultsMap.All.skins[rarity] = resultsMap.All.skins[rarity] + 1

        skinsMap[packType][skin.id] = skinsMap[packType][skin.id] || 0
        skinsMap[packType][skin.id] = skinsMap[packType][skin.id] + 1
        skinsMap.All[skin.id] = skinsMap.All[skin.id] || 0
        skinsMap.All[skin.id] = skinsMap.All[skin.id] + 1

        ///// IDS ////
        resultsIdsMap[packType].skins[rarity] = resultsIdsMap[packType].skins[rarity] || []
        resultsIdsMap[packType].skins[rarity].push(skin.id)

        resultsIdsMap.All.skins[rarity] = resultsIdsMap.All.skins[rarity] || []
        resultsIdsMap.All.skins[rarity].push(skin.id)
      }

      for (const lord of lords) {
        const mintedLord = lordsMap[lord.tokenId]
        const { rank } = mintedLord

        resultsMap[packType].lords[rank] = resultsMap[packType].lords[rank] || 0
        resultsMap[packType].lords[rank] = resultsMap[packType].lords[rank] + 1

        resultsMap.All.lords[rank] = resultsMap.All.lords[rank] || 0
        resultsMap.All.lords[rank] = resultsMap.All.lords[rank] + 1

        // ///// IDS ////
        // resultsIdsMap[packType].lords[rank] = resultsIdsMap[packType].lords[rank] || []
        // resultsIdsMap[packType].lords[rank].push(lord.tokenId)

        // resultsIdsMap.All.lords[rank] = resultsIdsMap.All.lords[rank] || []
        // resultsIdsMap.All.lords[rank].push(lord.tokenId)
      }

    }

  }

  for (const key in resultsIdsMap) {
    for (const rarity in resultsIdsMap[key].units) {
      resultsIdsMap[key].units[rarity] = uniq(resultsIdsMap[key].units[rarity])
    }
    for (const rarity in resultsIdsMap[key].skins) {
      resultsIdsMap[key].skins[rarity] = uniq(resultsIdsMap[key].skins[rarity])
    }
    // for (const rarity in resultsIdsMap[key].lords) {
    //   resultsIdsMap[key].lords[rarity] = uniq(resultsIdsMap[key].lords[rarity])
    // }
  }

  // console.log(JSON.stringify(resultsMap))
  console.log(JSON.stringify(resultsIdsMap))
  // console.log(JSON.stringify(skinsMap))
  // console.log(JSON.stringify(unitsMap))
}

main()
