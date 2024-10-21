// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "./sky-mavis-nft/ERC721Common.sol";

contract WildForestNft is ERC721Common {
  error MaximumTokenIdsExceeded();

  event IndividualBurn(address indexed walletAddress, uint256 tokenId, string metadata);
  event BulkBurn(address indexed walletAddress, uint256[] tokenIds, string metadata);

  event TokenLocked(uint256 indexed tokenId, address indexed approvedContract);
  event TokenUnlocked(uint256 indexed tokenId, address indexed approvedContract);

  mapping(uint256 => uint256) public _locks;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string calldata name, string calldata symbol, string calldata baseTokenURI, address ownerAddress) public initializer {
    __ERC721Common_init(name, symbol, baseTokenURI, ownerAddress);
  }

  function isUnlocked(uint256 _id) public view returns (bool) {
    return _locks[_id] == 0;
  }

  function lockIds(uint256[] calldata tokenIds) external onlyRole(MINTER_ROLE) {
    _validateTokenIdsNumber(tokenIds);

    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      _lockId(tokenIds[_i]);
    }
  }

  function unlockIds(uint256[] calldata tokenIds) external onlyRole(MINTER_ROLE) {
    _validateTokenIdsNumber(tokenIds);

    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      _unlockId(tokenIds[_i]);
    }
  }

  function _lockId(uint256 _id) internal {
    require(_exists(_id), "ERC721: token does not exists");
    require(isUnlocked(_id), "Token is already locked");

    _locks[_id] = 1;
    emit TokenLocked(_id, msg.sender);
  }

  function _unlockId(uint256 _id) internal {
    require(_exists(_id), "ERC721: token does not exists");
    require(!isUnlocked(_id), "Token is not locked");

    _locks[_id] = 0;
    emit TokenUnlocked(_id, msg.sender);
  }

  function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize)
    internal
    virtual
    override(ERC721PresetMinterPauserAutoIdCustomized)
  {
    // if (from != address(0)) {
    if (to != address(0)) {
      require(isUnlocked(firstTokenId), "Token is locked");
    }

    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
  }

  function _validateTokenIdsNumber(uint256[] calldata tokenIds) internal {
    // require(tokenIds.length > 0, "WildForestNft: invalid array lengths");
    if (tokenIds.length > 50) revert MaximumTokenIdsExceeded();
  }

  function bulkApprove(address to, uint256[] calldata tokenIds) public virtual {
    _validateTokenIdsNumber(tokenIds);

    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      //solhint-disable-next-line max-line-length
      require(_isApprovedOrOwner(_msgSender(), tokenIds[_i]), "ERC721: approve caller is not token owner or approved for all");
      _approve(to, tokenIds[_i]);
    }
  }

  function _burnWithCheck(uint256 tokenId) internal {
    //solhint-disable-next-line max-line-length
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
    _burn(tokenId);
  }

  function burn(uint256 tokenId) override public virtual {
    burnWithInfo(tokenId, "N/A");
  }

  function bulkBurn(uint256[] calldata tokenIds) public virtual {
    bulkBurnWithInfo(tokenIds, "N/A");
  }

  function burnWithInfo(uint256 tokenId, string memory metadata) public virtual {
    _burnWithCheck(tokenId);
    emit IndividualBurn(_msgSender(), tokenId, metadata);
  }

  function bulkBurnWithInfo(uint256[] calldata tokenIds, string memory metadata) public virtual {
    _validateTokenIdsNumber(tokenIds);

    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      _burnWithCheck(tokenIds[_i]);
    }

    emit BulkBurn(_msgSender(), tokenIds, metadata);
  }

}
