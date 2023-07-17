# zillion-whales-smart-contracts

TODO: provide contracts addresses
- Saigon [tx: 0x37e23bddf7b12fd8dd736bd1782aee16f3a47d3708a96e2355dc5df9c0b0fff5, deployed at 0xB7918c6715FAc25F0863447cff3DdEB1e879C338](https://saigon-app.roninchain.com/address/ronin:B7918c6715FAc25F0863447cff3DdEB1e879C338?t=contract)
- Ronin [ronin:aaaaaa](https://app.roninchain.com/address/ronin:aaaaaa?t=contract)

## Install


```sh
npm i
```

## Api keys (Not Required for Ronin network)

You will need some api keys in your env to be able to deploy/verify the contract on different chain

- [Alchemy](https://dashboard.alchemy.com/)
- [Etherscan](https://etherscan.io/)
- [Polygonscan](https://polygonscan.com/)
- [ETH](https://vanity-eth.tk/)
- [Ronin/SKY_MAVIS](https://developers.skymavis.com/console/applications/)

## Faucets (testnets)

You will need have a wallet with some balance to be able to deploy to different networks

- [Goerli](https://goerlifaucet.com/)
- [Mumbai](https://mumbaifaucet.com/)
- [Saigon](https://faucet.roninchain.com/)


## Usage

TODO: provide example url
> Example of an minted NFT on Saigon: https://

TODO: provide example url
To interract with the contract in javascript you will need the [`ABI` file](https://) (scroll to the bottom, and copy the ABI).

## Deploy

Deploy the contract on the desired chain

```sh
npm run deploy # deploying on localhost (hardhat VM)

npm run hardhat -- --network mumbai deploy
npm run hardhat -- --network <network> deploy # deploying to one of the configured network
```

### Networks configuration

In the `hardhat.config.js`

```json
{
  networks: {
    goerli: {
      url: "<rpc url>",
      accounts: [privateKey]
    }
  }
}
```

## Compile Manually

You can compile the contract by running

```sh
npm run compile
```

## Test & Coverage

Test are provided by `chai` whith matchers included in Hardhat, the coverage is also included.

```sh
npm test
```

You can also run the test with a summary of Gas used

```sh
npm run gasreport
```

## Prettier & Lint

```sh
npm run Format # format the code
npm run lint # check with solhint
```

## Verification

Verify the contract on etherscan

```sh
npm run hardhat -- verify --network mumbai <DEPLOYED_CONTRACT_ADDRESS>
```

Verify the contract on Saigon network

```sh
npm run hardhat --network saigon sourcify --endpoint https://sourcify.roninchain.com/server
```


