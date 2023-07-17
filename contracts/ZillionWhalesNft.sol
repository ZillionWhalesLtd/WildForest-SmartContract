// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./sky-mavis-nft/ERC721Common.sol";

contract ZillionWhalesNft is ERC721Common {
  constructor(string memory name, string memory symbol, string memory baseTokenURI)
    ERC721Common(name, symbol, baseTokenURI)
  {}
}
