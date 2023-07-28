# zillion-whales-smart-contracts

## NFTs:

- Saigon [tx: 0x29e2da042932e66ef013be301fcfa440a48ff449235aa028911a67c83a860af8, deployed at 0xD6F58E2b7DdE1E8591FeAB66ECEe681A2361912B](https://saigon-app.roninchain.com/address/0xd6f58e2b7dde1e8591feab66ecee681a2361912b?t=contract&st=write-contract)
- Ronin [ronin:aaaaaa](https://app.roninchain.com/address/ronin:aaaaaa?t=contract)

## Tokens (ERC20):
- Saigon [tx: 0x28dcec48ca375805fd2ca4aef09e9caa44d35086f8301081249e7cd6a2418e14, deployed at 0x529B9982a746aA80941B0F2B22A60B2a47CC381b](https://saigon-app.roninchain.com/address/0x529B9982a746aA80941B0F2B22A60B2a47CC381b?t=contract&st=read-contract)
- Ronin [ronin:aaaaaa](https://app.roninchain.com/address/ronin:aaaaaa?t=contract)

## Sales Factory:
- Saigon [tx: 0x746b4f7aa05b2d3ad5db78340130dd3b6a2c013f44945785e3e7f1841261200c, deployed at 0xfdAf8650076C4DfDc2e9E8D971e76C325f63Dd54](https://saigon-app.roninchain.com/address/0xfdaf8650076c4dfdc2e9e8d971e76c325f63dd54)
- Ronin [ronin:aaaaaa](https://app.roninchain.com/address/ronin:aaaaaa?t=contract)

## EXAMPLE OF SALE:
- Saigon [tx: 0xce9eb55d9a7b17d5d9ac567f44bd43a7ad218dff6e1529dc373a96f84e475220, deployed at 0x04E2e4508d5A05EFe8A87e7f2510886b8Da5F268](https://saigon-app.roninchain.com/address/0x04E2e4508d5A05EFe8A87e7f2510886b8Da5F268)
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


