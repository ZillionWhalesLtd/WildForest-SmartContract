// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "./sky-mavis-nft/ERC721Common.sol";

contract WildForestNft is ERC721Common {
  constructor(string memory name, string memory symbol, string memory baseTokenURI, address ownerAddress)
    ERC721Common(name, symbol, baseTokenURI, ownerAddress)
  {}

  function bulkApprove(address to, uint256[] calldata tokenIds) public virtual {
    require(tokenIds.length > 0, "WildForestNft: invalid array lengths");

    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      address owner = ERC721.ownerOf(tokenIds[_i]);
      require(to != owner, "ERC721: approval to current owner");

      require(
          _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
          "ERC721: approve caller is not token owner or approved for all"
      );
    }

    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      _approve(to, tokenIds[_i]);
    }
  }

  function bulkBurn(uint256[] calldata tokenIds) public virtual {
    //solhint-disable-next-line max-line-length
    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      require(_isApprovedOrOwner(_msgSender(), tokenIds[_i]), "ERC721: caller is not token owner or approved");
      _burn(tokenIds[_i]);
    }

  }
}
