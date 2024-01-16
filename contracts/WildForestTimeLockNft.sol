// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "./sky-mavis-nft/ERC721Common.sol";

contract WildForestTimeLockNft is ERC721Common {
  using Counters for Counters.Counter;

  // Mapping from token ID to lockTimestamp
  mapping(uint256 => uint256) private _timeLocks;

  // constructor(string memory name, string memory symbol, string memory baseTokenURI, address ownerAddress)
  //   ERC721Common(name, symbol, baseTokenURI, ownerAddress)
  // {}

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string memory name, string memory symbol, string memory baseTokenURI, address ownerAddress) public initializer {
    __ERC721Common_init(name, symbol, baseTokenURI, ownerAddress);
  }

  function mint(address to) public virtual override returns (uint256 _tokenId) {
    require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
    require(false, "Please use mint with lockTimestamp");
  }

  function bulkMint(address[] calldata _recipients)
    external
    virtual
    override(ERC721Common)
    onlyRole(MINTER_ROLE)
    returns (uint256[] memory _tokenIds)
  {
    require(false, "Please use bulkMint with lockTimestamps");
  }

  function mint(address to, uint256 lockTimestamp) public virtual returns (uint256 _tokenId) {
    require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
    return _mintFor(to, lockTimestamp);
  }

  function bulkMint(address[] calldata _recipients, uint256[] calldata _lockTimestamps)
    external
    virtual
    onlyRole(MINTER_ROLE)
    returns (uint256[] memory _tokenIds)
  {
    require(_recipients.length > 0, "ERC721Common: invalid array lengths");
    _tokenIds = new uint256[](_recipients.length);

    for (uint256 _i = 0; _i < _recipients.length; _i++) {
      _tokenIds[_i] = _mintFor(_recipients[_i], _lockTimestamps[_i]);
    }
  }

  function _mintFor(address to, uint256 lockTimestamp) internal virtual returns (uint256 _tokenId) {
    _tokenId = _tokenIdTracker.current();
    _timeLocks[_tokenId] = lockTimestamp;
    _mint(to, _tokenId);
    _tokenIdTracker.increment();
  }

  function _isTimeLockPassed(uint256 tokenId) internal view virtual returns (bool) {
    uint256 lockTimestamp = _timeLocks[tokenId];
    return (lockTimestamp / 1000 < block.timestamp);
  }

  function transferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721Upgradeable, IERC721Upgradeable) {
    require(_isTimeLockPassed(tokenId), "TimeLock: token is time locked for trasnfer");
    super.transferFrom(from, to, tokenId);
  }

  // function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {
  //   safeTransferFrom(from, to, tokenId, "");
  // }

  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual override(ERC721Upgradeable, IERC721Upgradeable) {
    require(_isTimeLockPassed(tokenId), "TimeLock: token is time locked for trasnfer");
     super.safeTransferFrom(from, to, tokenId, data);
  }
}
