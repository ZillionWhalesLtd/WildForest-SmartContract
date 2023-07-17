import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import dotenv from 'dotenv'

dotenv.config()

const {
  GOERLI_ALCHEMY_KEY,
  MUMBAI_ALCHEMY_KEY,
  POLIGON_ALCHEMY_KEY,
  ETHEREUM_ALCHEMY_KEY,
  POLYGON_APIKEY,
  ETHERSCAN_APIKEY,
  // PRIVATE_KEY,
  MNEMONIC,
} = process.env

const accounts = {
  mnemonic: MNEMONIC,
  path: "m/44'/60'/0'/0",
  initialIndex: 0,
  count: 20,
  passphrase: "",
}

export default {
  solidity: '0.8.0',
  gasReporter: {
    enabled: true,
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_ALCHEMY_KEY}`,
      accounts,
      // accounts: [PRIVATE_KEY],
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${GOERLI_ALCHEMY_KEY}`,
      accounts,
      // accounts: [PRIVATE_KEY],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${POLIGON_ALCHEMY_KEY}`,
      accounts,
      // accounts: [PRIVATE_KEY],
    },
    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${ETHEREUM_ALCHEMY_KEY}`,
      accounts,
      // accounts: [PRIVATE_KEY],
    },
    ronin: {
      chainId: 2020,
      url: 'https://api.roninchain.com/rpc',
      accounts,
      // accounts: [PRIVATE_KEY],
    },
    saigon: {
      chainId: 2021,
      url: 'https://saigon-testnet.roninchain.com/rpc',
      accounts,
      // accounts: [PRIVATE_KEY],
    },
  },
  namedAccounts: {
    // deployer: 'privatekey://<PK>',
    owner: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_APIKEY,
      polygon: POLYGON_APIKEY,
      polygonMumbai: POLYGON_APIKEY,
    },
  },
}
