// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {INFTBase} from "./interfaces/INFTBase.sol";

contract WildForestLockNft is AccessControlEnumerableUpgradeable {

  error NoLockedTokenForAddress();
  error LockActive(uint256 lockExpiration);

  event StakeLock(address indexed account, uint256[] tokenIds, uint256 lockPeriod);
  event UnstakeLock(address indexed account, uint256[] tokenIds);

  event NftContractChanged(address indexed nftContractAddress);
  event LockPeriodChanged(uint256 indexed lockPeriod);

  address public _nftContractAddress;
  uint256 public _lockPeriod;
  string public _name;

  mapping(uint256 => mapping(address => uint256)) public _lockedTokens;

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

  function _lock(address account, uint256 tokenId) internal virtual returns (uint256) {
    uint256 unlockTimestamp = block.timestamp + _lockPeriod;

    _lockedTokens[tokenId][account] = unlockTimestamp;
    return unlockTimestamp;
  }

  function _unlock(address account, uint256 tokenId) internal virtual returns (bool) {
    _lockedTokens[tokenId][account] = 0;
    return true;
  }

  function _validateOwnerAndLock(address account, uint256 tokenId) internal view {
    uint256 lockExpiration = _lockedTokens[tokenId][account];

    if (lockExpiration == 0) revert NoLockedTokenForAddress();

    if (lockExpiration > block.timestamp) revert LockActive(lockExpiration);
  }

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

    emit StakeLock(msg.sender, tokenIds, _lockPeriod);
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

  function setNftContractAddress(address nftContractAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _validateNftContractAddress(nftContractAddress);

    _nftContractAddress = nftContractAddress;
    emit NftContractChanged(nftContractAddress);
  }

  function setNftLockPeriod(uint256 lockPeriod) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _lockPeriod = lockPeriod;
    emit LockPeriodChanged(lockPeriod);
  }
}
