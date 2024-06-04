// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import {EIP712Upgradeable as EIP712} from "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {ITokenBase} from "./interfaces/ITokenBase.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract WildForestClaimTokenTransfer is AccessControlEnumerableUpgradeable, EIP712 {
  using ECDSA for bytes32;

  /// @notice thrown when a signature is expired
  error Expired();

  /// @notice thrown when the loan offer has already been submitted or canceled
  error NonceAlreadyUsed(string identificator);

  /// @notice thrown when an invalid contract name parameter was provided
  error InvalidContractName();

  /// @notice thrown when an invalid signature was provided
  error InvalidSignature();

  event UserTransfer(address indexed walletAddress, address indexed senderAddress, uint256 amount, string identificator, string playerId);

  event SignerAddressChanged(address indexed signerAddress);
  event TokenContractChanged(address indexed tokenContractAddress);

  struct TransferData {
    address walletAddress;
    string playerId;
    address senderAddress;
    uint256 amount;
    string identificator;
    uint256 deadline;
  }

  bytes32 private constant TRANSFER_DATA_TYPE_HASH =
    keccak256(
      "TransferData(address walletAddress,string playerId,address senderAddress,uint256 amount,string identificator,uint256 deadline)"
    );

  address private _userTransferSigner;
  address private _tokenContractAddress;

  mapping(address => mapping(string => bool)) public _transferNonces;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string calldata name, address ownerAddress, address signerAddress, address tokenContractAddress) public initializer {
    _validateSignerAddress(signerAddress);
    _validateTokenContractAddress(tokenContractAddress);

    _grantRole(DEFAULT_ADMIN_ROLE, ownerAddress);
    _userTransferSigner = signerAddress;
    _tokenContractAddress = tokenContractAddress;

    __EIP712_init(name, "1");
  }

  function _validateSignerAddress(address signerAddress) internal {
    require(signerAddress != address(0), "ClaimTokenTransfer: signerAddress is the zero address");
  }

  function _validateTokenContractAddress(address tokenContractAddress) internal {
    require(tokenContractAddress != address(0), "ClaimTokenTransfer: tokenContractAddress is the zero address");
  }

  function _invalidateNonce(address walletAddress, string memory identificator) internal {
    _transferNonces[walletAddress][identificator] = true;
  }

  function _validateTransferData(TransferData calldata data, bytes calldata signature) internal {
    require(data.walletAddress == msg.sender, "Caller address is not TransferData.walletAddress");
    if (data.deadline < block.timestamp) revert Expired();

    if (_transferNonces[data.walletAddress][data.identificator]) revert NonceAlreadyUsed(data.identificator);
    _invalidateNonce(data.walletAddress, data.identificator);

    bytes32 message = _hashTypedDataV4(
      keccak256(
        abi.encode(
          TRANSFER_DATA_TYPE_HASH,
          data.walletAddress,
          keccak256(bytes(data.playerId)),
          data.senderAddress,
          data.amount,
          keccak256(bytes(data.identificator)),
          data.deadline
        )
      )
    );
    address signer = message.recover(signature);
    if (signer != _userTransferSigner) revert InvalidSignature();
  }

  function userTransfer(TransferData calldata transferData, bytes calldata signature) public virtual {
    _validateTransferData(transferData, signature);

    ITokenBase tokenContract = ITokenBase(_tokenContractAddress);
    SafeERC20.safeTransferFrom(tokenContract, transferData.senderAddress, msg.sender, transferData.amount);
    emit UserTransfer(transferData.walletAddress, transferData.senderAddress, transferData.amount, transferData.identificator, transferData.playerId);
  }

  function setUserTransferSigner(address signerAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _validateSignerAddress(signerAddress);
    _userTransferSigner = signerAddress;
    emit SignerAddressChanged(signerAddress);
  }

  function setTokenContractAddress(address tokenContractAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _validateTokenContractAddress(tokenContractAddress);
    _tokenContractAddress = tokenContractAddress;
    emit TokenContractChanged(tokenContractAddress);
  }
}
