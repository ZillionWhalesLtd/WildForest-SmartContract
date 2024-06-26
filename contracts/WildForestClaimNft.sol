// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import {EIP712Upgradeable as EIP712} from "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {INFTBase} from "./interfaces/INFTBase.sol";

contract WildForestClaimNft is AccessControlEnumerableUpgradeable, EIP712 {
  using ECDSA for bytes32;

  /// @notice thrown when a signature is expired
  error Expired();
  /// @notice thrown when a number of identificators exceed maximum (50)
  error MaximumIdentificatorsExceeded();

  /// @notice thrown when the loan offer has already been submitted or canceled
  error NonceAlreadyUsed(string identificator);

  /// @notice thrown when an invalid contract name parameter was provided
  error InvalidContractName();

  /// @notice thrown when an invalid signature was provided
  error InvalidSignature();
  event UserMint(address indexed walletAddress, uint256[] tokenIds, string[] identificators, string playerId);

  event SignerAddressChanged(address indexed signerAddress);
  event NftContractChanged(address indexed nftContractAddress);

  /// @param walletAddress for whoom issued permission to execute mint
  /// @param identificators a identificator for the nft promise (array)
  /// @param deadline the deadline after which the signature is invalid
  struct MintData {
    address walletAddress;
    string playerId;
    string[] identificators;
    uint256 deadline;
  }

  bytes32 private constant MINT_DATA_TYPE_HASH =
    keccak256(
      "MintData(address walletAddress,string playerId,string[] identificators,uint256 deadline)"
    );

  address private _userMintSigner;
  address private _nftContractAddress;

  mapping(address => mapping(string => bool)) public _mintNonces;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string calldata name, address ownerAddress, address signerAddress, address nftContractAddress) public initializer {
    _validateSignerAddress(signerAddress);
    _validateNftContractAddress(nftContractAddress);

    _grantRole(DEFAULT_ADMIN_ROLE, ownerAddress);
    _userMintSigner = signerAddress;
    _nftContractAddress = nftContractAddress;

    __EIP712_init(name, "1");
  }

  function _validateSignerAddress(address signerAddress) internal {
    require(signerAddress != address(0), "ClaimNFT: signerAddress is the zero address");
  }

  function _validateNftContractAddress(address nftContractAddress) internal {
    require(nftContractAddress != address(0), "ClaimNFT: nftContractAddress is the zero address");
  }

  function _invalidateNonce(address walletAddress, string memory identificator) internal {
    _mintNonces[walletAddress][identificator] = true;
  }

  function _validateMintData(MintData calldata data, bytes calldata signature) internal {
    require(data.walletAddress == msg.sender, "Caller address is not MintData.walletAddress");
    if (data.deadline < block.timestamp) revert Expired();

    if (data.identificators.length > 40) revert MaximumIdentificatorsExceeded();

    for (uint256 _i = 0; _i < data.identificators.length; _i++) {
      if (_mintNonces[data.walletAddress][data.identificators[_i]]) revert NonceAlreadyUsed(data.identificators[_i]);
      _invalidateNonce(data.walletAddress, data.identificators[_i]);
    }

    bytes32[] memory encoded = new bytes32[](
      data.identificators.length
    );

    for (uint256 i = 0; i < data.identificators.length; i++) {
      encoded[i] = keccak256(bytes(data.identificators[i]));
    }

    bytes32 message = _hashTypedDataV4(
      keccak256(
        abi.encode(
          MINT_DATA_TYPE_HASH,
          data.walletAddress,
          keccak256(bytes(data.playerId)),
          keccak256(abi.encodePacked(encoded)),
          data.deadline
        )
      )
    );
    address signer = message.recover(signature);
    if (signer != _userMintSigner) revert InvalidSignature();
  }

  function userMint(MintData calldata mintData, bytes calldata signature) public virtual returns (uint256[] memory _tokenIds) {
    _validateMintData(mintData, signature);

    INFTBase nftContract = INFTBase(_nftContractAddress);
    address[] memory _recipients = new address[](mintData.identificators.length);
    for (uint256 _i = 0; _i < mintData.identificators.length; _i++) {
      _recipients[_i] = msg.sender;
    }

    _tokenIds = nftContract.bulkMint(_recipients);
    emit UserMint(mintData.walletAddress, _tokenIds, mintData.identificators, mintData.playerId);
  }

  function setUserMintSigner(address signerAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _validateSignerAddress(signerAddress);
    _userMintSigner = signerAddress;
    emit SignerAddressChanged(signerAddress);
  }

  function setNftContractAddress(address nftContractAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _validateNftContractAddress(nftContractAddress);
    _nftContractAddress = nftContractAddress;
    emit NftContractChanged(nftContractAddress);
  }
}
