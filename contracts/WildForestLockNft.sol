// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
// import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {INFTBase} from "./interfaces/INFTBase.sol";

contract WildForestLockNft is AccessControlEnumerableUpgradeable {
  // using ECDSA for bytes32;

  error NoLockedTokenForAddress();
  error LockActive(uint256 lockExpiration);

  event DepositLock(address indexed account, uint256[] tokenIds, uint256 lockPeriod);
  event WithdrawLock(address indexed account, uint256[] tokenIds);

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
    _setupRole(DEFAULT_ADMIN_ROLE, ownerAddress);
    _nftContractAddress = nftContractAddress;
    _lockPeriod = lockPeriod;
    _name = name;
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

  function _validateOwnerAndLock(address account, uint256 tokenId) internal {
    uint256 lockExpiration = _lockedTokens[tokenId][account];

    if (lockExpiration == 0) revert NoLockedTokenForAddress();

    if (lockExpiration > block.timestamp) revert LockActive(lockExpiration);
  }

  function deposit(uint256[] memory tokenIds) public virtual returns (bool) {
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

    emit DepositLock(msg.sender, tokenIds, _lockPeriod);
    return true;
  }

  function withdraw(uint256[] memory tokenIds) public virtual returns (bool) {
    INFTBase nftContract = INFTBase(_nftContractAddress);

    uint256 length = tokenIds.length;
    for (uint256 i = 0; i < length; ++i) {
      uint256 tokenId = tokenIds[i];
      _validateOwnerAndLock(msg.sender, tokenId);
      _unlock(msg.sender, tokenId);
      // Checks were already performed at this point, and there's no way to retake ownership or approval from
      // the wrapped tokenId after this point, so it's safe to remove the reentrancy check for the next line.
      // slither-disable-next-line reentrancy-no-eth
      nftContract.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    emit WithdrawLock(msg.sender, tokenIds);
    return true;
  }

  function setNftContractAddress(address nftContractAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _nftContractAddress = nftContractAddress;
    emit NftContractChanged(nftContractAddress);
  }

  function setNftLockPeriod(uint256 lockPeriod) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _lockPeriod = lockPeriod;
    emit LockPeriodChanged(lockPeriod);
  }

  // /**
  //  * @dev Overrides {IERC721Receiver-onERC721Received} to allow minting on direct ERC721 transfers to
  //  * this contract.
  //  *
  //  * In case there's data attached, it validates that the operator is this contract, so only trusted data
  //  * is accepted from {depositFor}.
  //  *
  //  * WARNING: Doesn't work with unsafe transfers (eg. {IERC721-transferFrom}). Use {ERC721Wrapper-_recover}
  //  * for recovering in that scenario.
  //  */
  // function onERC721Received(
  //   address,
  //   address from,
  //   uint256 tokenId,
  //   bytes memory
  // ) public virtual returns (bytes4) {
  //   // require(address(underlying()) == _msgSender(), "ERC721Wrapper: caller is not underlying");
  //   // _safeMint(from, tokenId);
  //   return IERC721ReceiverUpgradeable.onERC721Received.selector;
  // }

  // /**
  //  * @dev Mint a wrapped token to cover any underlyingToken that would have been transferred by mistake. Internal
  //  * function that can be exposed with access control if desired.
  //  */
  // function _recover(address account, uint256 tokenId) internal virtual returns (uint256) {
  //   require(underlying().ownerOf(tokenId) == address(this), "ERC721Wrapper: wrapper is not token owner");
  //   _safeMint(account, tokenId);
  //   return tokenId;
  // }
}
