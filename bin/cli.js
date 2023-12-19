#!/usr/bin/env node

const yargs = require('yargs')
const inquirer = require('inquirer')
const fs = require('fs')

const RoninChainService = require('./services/RoninChainService')

const {
  SAIGON_LORDS_OWNER_ADDRESS,
  SAIGON_PACKS_OWNER_ADDRESS,
  RONIN_LORDS_OWNER_ADDRESS,
  RONIN_PACKS_OWNER_ADDRESS,
} = process.env

const hintEnvironment = 'test | prod'
const hintPath = 'testData.json'

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

const argv = yargs
  .command('mintLords', 'Mint Lords NFTs according to the distribution data', {
    environment: environmentCommandOptions,
    path: pathCommandOptions,
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

const buildLordsToMint = (dataRequirements) => {
  return []
}

const writeToFile = (filePath, data) => {
  fs.writeFileSync(filePath, data)
}

const main = async() => {

  switch (argv._[0]) {
    case 'mintLords': {
      console.log('Preparing metadata for Lord NFTs...') // eslint-disable-line

      const { environment, path } = argv
      let roninChainId = 'saigon'
      let addressTo = SAIGON_LORDS_OWNER_ADDRESS

      if (environment === 'prod') {
        roninChainId = 'ronin'
        addressTo = RONIN_LORDS_OWNER_ADDRESS
      }
      const roninChainService = new RoninChainService(console, roninChainId)
      const dataRequirements = require(`./mintRequirements/${path}`)

      const lordsToMint = buildLordsToMint(dataRequirements)
      console.log('Prepared Lords To Mint:', lordsToMint) // eslint-disable-line

      const { isOk } = await _askToProcessLords()
      if (isOk[0] !== 'Yes') {
        console.log('Terminating..') // eslint-disable-line
        return
      }

      console.log('Minting Lord NFTs...') // eslint-disable-line
      let mintedCounter = 0
      for (const lordToMint of lordsToMint) {
        const { metadata: lordToMintMetadata } = lordToMint
        const { tokenId, hash, chainId } = await roninChainService.mintLordNFT(addressTo, lordToMintMetadata)
        mintedCounter++
        console.log(`minted ${tokenId} tokenId. Counter: ${mintedCounter}`) // eslint-disable-line
        lordToMint.tokenId = tokenId
        lordToMint.chainId = chainId
        lordToMint.hash = hash
      }

      const now = Date.now()
      const fileName = `minted_lords-${now}.json`
      const repoPath = process.cwd()
      const filePath = `${repoPath}/bin/resultData/${fileName}`

      writeToFile(filePath, JSON.stringify(lordsToMint, null, 2))

      console.log(`Done, minted ${mintedCounter} Lord NFTs`) // eslint-disable-line
      console.log(`Result written into: \n ${filePath}`) // eslint-disable-line
      break
    }

    default:
      console.log(`Not known command ${argv._[0]}.`) // eslint-disable-line
  }
}

main()
