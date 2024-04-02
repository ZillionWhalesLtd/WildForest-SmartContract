// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface INFTBase is IERC721 {
  function mint(address to) external virtual returns (uint256 _tokenId);
  function bulkMint(address[] calldata _recipients) external virtual returns (uint256[] memory _tokenIds);
}
