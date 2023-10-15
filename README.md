# zillion-whales-smart-contracts

## NFTs:
- Saigon [tx: 0x289de444ee28c9171013eaad49e2923f7f07053cb86c717c6534d030f2c69f06, deployed at 0x5448955aF1FC5C6c5e19b0Ab177E5D3a28268Fee](https://saigon-app.roninchain.com/address/0x5448955af1fc5c6c5e19b0ab177e5d3a28268fee?t=contract&st=write-contract)
- Ronin [ronin:aaaaaa](https://app.roninchain.com/address/ronin:aaaaaa?t=contract)

## NFT With defined tokenURI:
- Saigon [tx: 0x2828d463088941e15c2500e15524861f14510b1efa69f21467df5ec2deb7201d, deployed at 0xb39BFea8894aB4AcDE03f8ECEb47a6962a1e98ce](https://saigon-app.roninchain.com/address/0xb39BFea8894aB4AcDE03f8ECEb47a6962a1e98ce)
- Ronin [ronin:aaaaaa](https://app.roninchain.com/address/ronin:aaaaaa?t=contract)

## NFT With Time lock:
- Saigon [tx: 0x8b3a89cf4c13706429e1a6fe3df0305379b023ff648bd6e8259a2d4257ec2e00, deployed at 0x14E5Bd1FdE726e94471C898ba2f8aEAB31310dD7](https://saigon-app.roninchain.com/address/0x14E5Bd1FdE726e94471C898ba2f8aEAB31310dD7)
- Ronin [ronin:aaaaaa](https://app.roninchain.com/address/ronin:aaaaaa?t=contract)

## Tokens (ERC20):
- Saigon [tx: 0x2360f7488ece512b2d3f13a50d29321a60e0c20c2245586bbdc014bb96c8906c, deployed at 0x738B1B1A3d120e88fF535815789F965E23D07932](https://saigon-app.roninchain.com/address/0x738B1B1A3d120e88fF535815789F965E23D07932?t=contract&st=read-contract)
- Ronin [ronin:aaaaaa](https://app.roninchain.com/address/ronin:aaaaaa?t=contract)

## Sales Factory:
- Saigon [tx: 0xa7c132cabba3b9c5fb5f744d9d26a4c4e206ae3eb80a9819bc10e88b96679db0, deployed at 0x0894da68349daDB094D537A94715Bc60cCbfC346](https://saigon-app.roninchain.com/address/0x0894da68349daDB094D537A94715Bc60cCbfC346)
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


