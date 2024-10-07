#!/usr/bin/env node

const yargs = require('yargs')
const inquirer = require('inquirer')
const json2Csv = require('json-2-csv')

const RoninChainService = require('./services/RoninChainService')
const FileService = require('./services/FileService')
const IPFSService = require('./services/IPFSService')
const RequirementsService = require('./services/RequirementsService')
const CsvService = require('./services/CsvService')

const {
  SAIGON_LORDS_OWNER_ADDRESS,
  SAIGON_PACKS_OWNER_ADDRESS,
  RONIN_LORDS_OWNER_ADDRESS,
  RONIN_PACKS_OWNER_ADDRESS,
} = process.env

const hintEnvironment = 'test | prod'
const hintPath = 'testData.json'
const hintLordsPath = 'minted_lords-123121.json'

const environmentCommandOptions = {
  description: 'Environment where command to execute.',
  alias: 'e',
  type: 'string',
  demandOption: true,
  default: hintEnvironment,
}

const pathCommandOptions = {
  description: 'Path to the distribution data requirement to mint against.',
  alias: 'p',
  type: 'string',
  demandOption: true,
  default: hintPath,
}

const lordsPathCommandOptions = {
  description: 'Path to the minted results of Lords.',
  alias: 'l',
  type: 'string',
  demandOption: true,
  default: hintLordsPath,
}

const getPathCommandOptions = (description, hint) => {
  const customPathCommandOptions = { ...pathCommandOptions, description, default: hint }
  return customPathCommandOptions
}

const argv = yargs
  .command('mintLords', 'Mint Lords NFTs according to the distribution data', {
    environment: environmentCommandOptions,
    path: pathCommandOptions,
  })
  .command('mintPacks', 'Mint Packs NFTs according to the distribution data', {
    environment: environmentCommandOptions,
    path: pathCommandOptions,
    lordsPath: lordsPathCommandOptions
  })
  .command('uploadImages', 'Upload images to IPFS', {
    path: getPathCommandOptions('Path to the images folder', 'lordImages'),
  })
  .help()
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .alias('help', 'h').argv

const _askToProcessLords = () => {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: 'checkbox', // confirm
          name: 'isOk',
          message: 'Is the prepared metadata looks correct? Are you OK to proceed and mint Lord NFTs ?',
          choices: ['Yes', 'No']
        },
      ])
      .then((details) => {
        resolve(details)
      })
  })
}

const _askPreviouslyMintedLords = () => {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: 'number',
          name: 'previouslyMinetdRecord',
          message: 'If minting was interupted please pass here record if of previously minted lord',
        },
      ])
      .then((details) => {
        resolve(details)
      })
  })
}

const _askToProcessPacks = () => {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          type: 'checkbox', // confirm
          name: 'isOk',
          message: 'Is the prepared metadata looks correct? Are you OK to proceed and mint Pack NFTs ?',
          choices: ['Yes', 'No']
        },
      ])
      .then((details) => {
        resolve(details)
      })
  })
}

const CHAINS_MAP = {
  '2021': 'Saigon',
  '2020': 'RONIN',
}

const main = async() => {
  const repoPath = process.cwd()

  const fileService = new FileService()
  const ipfsService = new IPFSService(console)
  const requirementsService = new RequirementsService(console)

  let roninChainId = 'saigon'
  const isMainNet = argv.environment === 'prod'
  if (isMainNet) {
    roninChainId = 'ronin'
  }
  const roninChainService = new RoninChainService(console, roninChainId)

  switch (argv._[0]) {
    case 'migrateStakes': {
      console.log('Migratin stakess...') // eslint-disable-line

      const { path } = argv

      const repoPath = process.cwd()
      const lordsToMigratePath = `${repoPath}/bin/migrationConfigs/${path}`
      const csvService = new CsvService()
      const lordsToMigrate = await csvService.readFile(lordsToMigratePath)

      const filteredLords = await roninChainService.filterNotMigratedStakes(lordsToMigrate)
      await roninChainService.upgradeV2Stakes(filteredLords)

      console.log(`Done, migrated ${filteredLords.length} NFTs`) // eslint-disable-line
      // console.log(`Result written into: \n ${filePath}`) // eslint-disable-line
      break
    }
    case 'mintLords': {
      console.log('Preparing metadata for Lord NFTs...') // eslint-disable-line

      const { path } = argv
      let addressTo = SAIGON_LORDS_OWNER_ADDRESS

      if (isMainNet) {
        addressTo = RONIN_LORDS_OWNER_ADDRESS
      }

      const LORDS_TO_MINT = 1000
      await roninChainService.mintLordsNFT(addressTo, LORDS_TO_MINT)
      // // const dataRequirements = require(`./mintRequirements/${path}`)
      // // const imagesMetadata = require('./resultData/uploaded_images.json')

      // // const lordsToMint = await requirementsService.buildLordsToMint(dataRequirements, imagesMetadata)

      // const repoPath = process.cwd()
      // const lordsConfigPath = `${repoPath}/bin/csvConfigs/${path}`
      // const csvService = new CsvService()
      // const dataRequirements = await csvService.readFile(lordsConfigPath)

      // const lordsToMint = await requirementsService.buildLordsToMintFromMetadata(dataRequirements)

      // const { previouslyMinetdRecord } = await _askPreviouslyMintedLords()

      // if (!previouslyMinetdRecord) {
      //   console.log('Prepared Lords To Mint:', lordsToMint) // eslint-disable-line
      //   const { isOk } = await _askToProcessLords()
      //   if (isOk[0] !== 'Yes') {
      //     console.log('Terminating..') // eslint-disable-line
      //     return
      //   }
      // }

      // console.log('Minting Lord NFTs...') // eslint-disable-line
      // let mintedCounter = 0

      // // const now = Date.now()
      // const now = 'saigon'
      // const fileName = `minted_lords-${now}.json`
      // const filePath = `${repoPath}/bin/resultData/${fileName}`

      // for (const lordToMint of lordsToMint) {
      //   const { metadata: lordToMintMetadata, recordId } = lordToMint

      //   if (previouslyMinetdRecord && Number(recordId) <= previouslyMinetdRecord) {
      //     continue
      //   }

      //   console.log(`Trying to mint recordId: ${recordId}...`) // eslint-disable-line
      //   const { tokenId, hash, chainId: chainIdentifier, tokenUri } = await roninChainService.mintLordNFT(addressTo, lordToMintMetadata)
      //   mintedCounter++
      //   console.log(`minted ${tokenId} tokenId. Counter: ${mintedCounter}`) // eslint-disable-line
      //   let chainId = chainIdentifier
      //   if (CHAINS_MAP[chainId]) {
      //     chainId = CHAINS_MAP[chainId]
      //   }

      //   lordToMint.tokenId = tokenId
      //   lordToMint.chainId = chainId
      //   lordToMint.hash = hash
      //   lordToMint.tokenUri = tokenUri
      //   delete lordToMint.attributesJSON

      //   const previouslyMintedLordsContent = fileService.readFile(filePath)
      //   const previouslyMintedLords = JSON.parse(previouslyMintedLordsContent)
      //   const mintedLords = [...previouslyMintedLords, lordToMint]
      //   const contentToWrite = JSON.stringify(mintedLords, null, 2)
      //   fileService.writeFile(filePath, contentToWrite)
      // }


      // console.log(`Done, minted ${mintedCounter} Lord NFTs`) // eslint-disable-line
      // console.log(`Result written into: \n ${filePath}`) // eslint-disable-line
      break
    }
    case 'mintPacks': {
      console.log('Preparing metadata for Pack NFTs...') // eslint-disable-line

      const { path, lordsPath } = argv
      let addressTo = SAIGON_PACKS_OWNER_ADDRESS

      if (isMainNet) {
        addressTo = RONIN_PACKS_OWNER_ADDRESS
      }
      const dataRequirements = require(`./mintRequirements/${path}`)

      const packsToMint = await requirementsService.buildPacksToMint(dataRequirements, lordsPath)
      console.log('Prepared Packs To Mint:', packsToMint) // eslint-disable-line

      const { isOk } = await _askToProcessPacks()
      if (isOk[0] !== 'Yes') {
        console.log('Terminating..') // eslint-disable-line
        return
      }

      const csvRecords = []
      for (const packToMint of packsToMint) {
        delete packToMint.treasureJSON
        const { csvBased } = packToMint
        csvRecords.push(csvBased)
        delete packToMint.csvBased
      }

      const csvData = await json2Csv.json2csv(csvRecords, {})

      const now = Date.now()
      const fileName = `minted_packs-${now}.json`
      const csvFileName = `packs_config-${now}.csv`
      const filePath = `${repoPath}/bin/resultData/${fileName}`
      const csvFilePath = `${repoPath}/bin/resultData/${csvFileName}`

      fileService.writeFile(filePath, JSON.stringify(packsToMint, null, 2))
      fileService.writeFile(csvFilePath, csvData)
      console.log(`Done, Result written into: \n ${filePath}\n\n CSV written into: \n ${csvFilePath}`) // eslint-disable-line

      // console.log('Minting Pack NFTs...') // eslint-disable-line
      // let mintedCounter = 0
      // for (const packToMint of packsToMint) {
      //   const { tokenId, hash, chainId } = await roninChainService.mintPackNFT(addressTo)
      //   mintedCounter++
      //   console.log(`minted ${tokenId} tokenId. Counter: ${mintedCounter}`) // eslint-disable-line
      //   packToMint.tokenId = tokenId
      //   packToMint.chainId = chainId
      //   packToMint.hash = hash

      //   delete packToMint.ecnryptedTreasure
      //   delete packToMint.treasureHash
      //   delete packToMint.treasure
      // }

      // const now = Date.now()
      // const fileName = `minted_packs-${now}.json`
      // const filePath = `${repoPath}/bin/resultData/${fileName}`

      // fileService.writeFile(filePath, JSON.stringify(packsToMint, null, 2))

      // console.log(`Done, minted ${mintedCounter} Pack NFTs`) // eslint-disable-line
      // console.log(`Result written into: \n ${filePath}`) // eslint-disable-line
      break
    }
    case 'uploadImages': {
      console.log('Uploading images to IPFS...') // eslint-disable-line

      const { path } = argv
      const dir = `${repoPath}/${path}`
      const filePaths = fileService.readAllFilesAtDir(dir)

      let uploadedCounter = 0
      const uploadedImages = []
      for (const filePath of filePaths) {
        const imageContent = fileService.readFile(filePath)
        const { url, uri } = await ipfsService.uploadImage(imageContent)
        const fileParts = filePath.split('/')
        const fileName = fileParts[fileParts.length - 1]
        uploadedCounter++
        console.log(`Uploaded ${fileName}. Counter: ${uploadedCounter}`) // eslint-disable-line

        const lordId = fileName.split('.')[0].replace('lord_', '')
        uploadedImages.push({
          id: lordId,
          uri,
          url,
          filePath,
          fileName,
        })
      }

      const now = Date.now()
      const resultFileName = `uploaded_images-${now}.json`
      const resultFilePath = `${repoPath}/bin/resultData/${resultFileName}`

      fileService.writeFile(resultFilePath, JSON.stringify(uploadedImages, null, 2))

      console.log(`Done, uploaded ${uploadedCounter} Images`) // eslint-disable-line
      console.log(`Result written into: \n ${resultFilePath}`) // eslint-disable-line
      break
    }

    default:
      console.log(`Not known command ${argv._[0]}.`) // eslint-disable-line
  }
}

main()
