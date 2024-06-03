// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "./sky-mavis-nft/ERC721Common.sol";

contract WildForestNft is ERC721Common {

  event IndividualBurn(address indexed walletAddress, uint256 tokenId);
  event BulkBurn(address indexed walletAddress, uint256[] tokenIds);

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string memory name, string memory symbol, string memory baseTokenURI, address ownerAddress) public initializer {
    __ERC721Common_init(name, symbol, baseTokenURI, ownerAddress);
  }

  function bulkApprove(address to, uint256[] calldata tokenIds) public virtual {
    require(tokenIds.length > 0, "WildForestNft: invalid array lengths");

    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      address owner = ERC721Upgradeable.ownerOf(tokenIds[_i]);
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

  function burn(uint256 tokenId) override public virtual {
    //solhint-disable-next-line max-line-length
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
    _burn(tokenId);

    emit IndividualBurn(_msgSender(), tokenId);
  }

  function bulkBurn(uint256[] calldata tokenIds) public virtual {
    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      //solhint-disable-next-line max-line-length
      require(_isApprovedOrOwner(_msgSender(), tokenIds[_i]), "ERC721: caller is not token owner or approved");
      _burn(tokenIds[_i]);
    }

    emit BulkBurn(_msgSender(), tokenIds);
  }
}
