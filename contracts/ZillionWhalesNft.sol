// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "./sky-mavis-nft/ERC721Common.sol";

contract ZillionWhalesNft is ERC721Common {
  constructor(string memory name, string memory symbol, string memory baseTokenURI)
    ERC721Common(name, symbol, baseTokenURI)
  {}

  function bulkPersonalMint(address _recipient, uint256 _numberOfTokens)
    external
    virtual
    onlyRole(MINTER_ROLE)
    returns (uint256[] memory _tokenIds)
  {
    require(_numberOfTokens > 0, "ZillionWhalesNft: invalid tokens amount");
    _tokenIds = new uint256[](_numberOfTokens);

    for (uint256 _i = 0; _i < _numberOfTokens; _i++) {
      _tokenIds[_i] = _mintFor(_recipient);
    }
  }

  function bulkApprove(address to, uint256[] calldata tokenIds) public virtual {
    require(tokenIds.length > 0, "ZillionWhalesNft: invalid array lengths");

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
}
