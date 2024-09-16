// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {INFTBase} from "./interfaces/INFTBase.sol";

contract WildForestLockNft is AccessControlEnumerableUpgradeable {

  error NoLockedTokenForAddress();
  // error LockActive(uint256 lockExpiration);

  event StakeLock(address indexed account, uint256[] tokenIds);
  event UnstakeLock(address indexed account, uint256[] tokenIds);
  event UpgradeStakeV2(address indexed account, uint256[] tokenIds);

  event NftContractChanged(address indexed nftContractAddress);
  // event LockPeriodChanged(uint256 indexed lockPeriod);

  address public _nftContractAddress;
  uint256 public _lockPeriod;
  string public _name;

  mapping(uint256 => mapping(address => uint256)) public _lockedTokens;
  mapping(uint256 => uint256) public _tokensLockedTime;
  mapping(uint256 => address) public _tokensLocker;

  // Mapping owner address to token count
  mapping(address => uint256) private _balances;
  // Mapping from owner to list of owned token IDs
  mapping(address => mapping(uint256 => uint256)) private _ownedTokens;
  // Mapping from token ID to index of the owner tokens list
  mapping(uint256 => uint256) private _ownedTokensIndex;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string memory name, address ownerAddress, address nftContractAddress, uint256 lockPeriod) public initializer {
    _validateNftContractAddress(nftContractAddress);

    _grantRole(DEFAULT_ADMIN_ROLE, ownerAddress);
    _nftContractAddress = nftContractAddress;
    _lockPeriod = lockPeriod;
    _name = name;
  }

  function _validateNftContractAddress(address nftContractAddress) internal {
    require(nftContractAddress != address(0), "LockNFT: nftContractAddress is the zero address");
  }

  function _lock(address account, uint256 tokenId) internal virtual returns (bool) {
    _lockedTokens[tokenId][account] = 1;
    _tokensLockedTime[tokenId] = block.timestamp;
    _tokensLocker[tokenId] = account;

    _addTokenToOwnerEnumeration(account, tokenId);
    return true;
  }

  function _unlock(address account, uint256 tokenId) internal virtual returns (bool) {
    _lockedTokens[tokenId][account] = 0;
    _tokensLockedTime[tokenId] = 0;
    _tokensLocker[tokenId] = address(0);

    _removeTokenFromOwnerEnumeration(account, tokenId);
    return true;
  }

  function _validateOwnerAndLock(address account, uint256 tokenId) internal view {
    uint256 isLocked = _lockedTokens[tokenId][account];

    if (isLocked == 0) revert NoLockedTokenForAddress();
  }

  // function obsoleteStake(uint256[] memory tokenIds) public virtual returns (bool) {
  //   INFTBase nftContract = INFTBase(_nftContractAddress);

  //   uint256 length = tokenIds.length;
  //   for (uint256 i = 0; i < length; ++i) {
  //     uint256 tokenId = tokenIds[i];

  //     nftContract.transferFrom(msg.sender, address(this), tokenId);
  //     uint256 unlockTimestamp = block.timestamp + _lockPeriod;

  //     _lockedTokens[tokenId][msg.sender] = unlockTimestamp;
  //   }

  //   emit StakeLock(msg.sender, tokenIds);
  //   return true;
  // }

  function stake(uint256[] memory tokenIds) public virtual returns (bool) {
    INFTBase nftContract = INFTBase(_nftContractAddress);

    uint256 length = tokenIds.length;
    for (uint256 i = 0; i < length; ++i) {
      uint256 tokenId = tokenIds[i];

      // This is an "unsafe" transfer that doesn't call any hook on the receiver. With underlying() being trusted
      // (by design of this contract) and no other contracts expected to be called from there, we are safe.
      // slither-disable-next-line reentrancy-no-eth
      nftContract.transferFrom(msg.sender, address(this), tokenId);
      _lock(msg.sender, tokenId);
    }

    emit StakeLock(msg.sender, tokenIds);
    return true;
  }

  function unstake(uint256[] memory tokenIds) public virtual returns (bool) {
    INFTBase nftContract = INFTBase(_nftContractAddress);

    uint256 length = tokenIds.length;
    for (uint256 i = 0; i < length; ++i) {
      uint256 tokenId = tokenIds[i];
      _validateOwnerAndLock(msg.sender, tokenId);
      _unlock(msg.sender, tokenId);
      // Checks were already performed at this point, and there's no way to retake ownership or approval from
      // the wrapped tokenId after this point, so it's safe to remove the reentrancy check for the next line.
      // slither-disable-next-line reentrancy-no-eth
      nftContract.transferFrom(address(this), msg.sender, tokenId);
    }

    emit UnstakeLock(msg.sender, tokenIds);
    return true;
  }

  function upgradeV2Stake(uint256[] memory tokenIds) public virtual returns (bool) {
    INFTBase nftContract = INFTBase(_nftContractAddress);

    uint256 length = tokenIds.length;
    for (uint256 i = 0; i < length; ++i) {
      uint256 tokenId = tokenIds[i];

      uint256 lockExpiration = _lockedTokens[tokenId][msg.sender];

      if (lockExpiration < 2) revert NoLockedTokenForAddress();

      _lockedTokens[tokenId][msg.sender] = 1;
      _tokensLockedTime[tokenId] = lockExpiration - _lockPeriod;
      _tokensLocker[tokenId] = msg.sender;

      _addTokenToOwnerEnumeration(msg.sender, tokenId);
    }

    emit UpgradeStakeV2(msg.sender, tokenIds);
    return true;
  }

  function setNftContractAddress(address nftContractAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _validateNftContractAddress(nftContractAddress);

    _nftContractAddress = nftContractAddress;
    emit NftContractChanged(nftContractAddress);
  }

  function lockTime(uint256 tokenId) public view returns (uint256) {
    uint256 now = block.timestamp;

    uint256 lockedTime = _tokensLockedTime[tokenId];

    return now - lockedTime;
  }

  /**
   * @dev See {IERC721-balanceOf}.
   */
  function balanceOf(address owner) public view virtual returns (uint256) {
    require(owner != address(0), "ERC721: address zero is not a valid owner");
    return _balances[owner];
  }

  function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
    uint256 length = balanceOf(to);
    _ownedTokens[to][length] = tokenId;
    _ownedTokensIndex[tokenId] = length;

    _balances[to] += 1;
  }

  function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
    // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
    // then delete the last slot (swap and pop).

    uint256 lastTokenIndex = balanceOf(from) - 1;
    uint256 tokenIndex = _ownedTokensIndex[tokenId];

    // When the token to delete is the last token, the swap operation is unnecessary
    if (tokenIndex != lastTokenIndex) {
        uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

        _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
    }

    // This also deletes the contents at the last position of the array
    delete _ownedTokensIndex[tokenId];
    delete _ownedTokens[from][lastTokenIndex];

    _balances[from] -= 1;
  }

  /**
   * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
   */
  function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual returns (uint256) {
    require(index < balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
    return _ownedTokens[owner][index];
  }
}
