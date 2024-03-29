require('@nomicfoundation/hardhat-toolbox')
require('hardhat-deploy')
require('@nomiclabs/hardhat-ethers')
require('@openzeppelin/hardhat-upgrades')
require('@nomiclabs/hardhat-etherscan')
require('solidity-coverage')


require('dotenv').config()

const {
  GOERLI_ALCHEMY_KEY,
  MUMBAI_ALCHEMY_KEY,
  POLIGON_ALCHEMY_KEY,
  ETHEREUM_ALCHEMY_KEY,
  POLYGON_APIKEY,
  ETHERSCAN_APIKEY,
  // PRIVATE_KEY,
  MNEMONIC,
  DEPLOYER_PRIVATE_KEY,
} = process.env

const mainAccounts = [
  DEPLOYER_PRIVATE_KEY,
]

const accounts = {
  mnemonic: MNEMONIC,
  path: "m/44'/60'/0'/0",
  initialIndex: 0,
  count: 20,
  passphrase: "",
}

module.exports = {
  solidity: '0.8.16',
  gasReporter: {
    enabled: true,
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_ALCHEMY_KEY}`,
      accounts,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${GOERLI_ALCHEMY_KEY}`,
      accounts,
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${POLIGON_ALCHEMY_KEY}`,
      accounts: mainAccounts,
    },
    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${ETHEREUM_ALCHEMY_KEY}`,
      accounts: mainAccounts,
    },
    ronin: {
      chainId: 2020,
      url: 'https://api.roninchain.com/rpc',
      accounts: mainAccounts,
    },
    saigon: {
      chainId: 2021,
      url: 'https://saigon-testnet.roninchain.com/rpc',
      accounts,
    },
  },

  namedAccounts: {
    // deployer: 'privatekey://<PK>',
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_APIKEY,
      polygon: POLYGON_APIKEY,
      polygonMumbai: POLYGON_APIKEY,
    },
  },
}
