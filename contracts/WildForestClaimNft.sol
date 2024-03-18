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

  /// @notice thrown when the loan offer has already been submitted or canceled
  error NonceAlreadyUsed(string identificator);

  /// @notice thrown when an invalid contract name parameter was provided
  error InvalidContractName();

  /// @notice thrown when an invalid signature was provided
  error InvalidSignature();

  event UserMint(address indexed walletAddress, uint256 tokenId, string identificator);

  /// @param walletAddress for whoom issued permission to execute mint
  /// @param identificator a identificator for the nft promise
  /// @param deadline the deadline after which the signature is invalid
  struct MintData {
    address walletAddress;
    string identificator;
    uint256 deadline;
  }

  bytes32 private constant MINT_DATA_TYPE_HASH =
    keccak256(
      "MintData(address walletAddress,string identificator,uint256 deadline)"
    );

  address private _userMintSigner;
  address private _nftContractAddress;

  mapping(address => mapping(string => bool)) public _mintNonces;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string memory name, address ownerAddress, address signerAddress, address nftContractAddress) public initializer {
    _setupRole(DEFAULT_ADMIN_ROLE, ownerAddress);
    _userMintSigner = signerAddress;
    _nftContractAddress = nftContractAddress;

    __EIP712_init(name, "1");
  }

  function _invalidateNonce(address walletAddress, string memory identificator) internal {
    _mintNonces[walletAddress][identificator] = true;
  }

  function _validateMintData(MintData calldata data, bytes calldata signature) internal {
    require(data.walletAddress == msg.sender, "Caller address is not MintData.walletAddress");
    if (data.deadline < block.timestamp) revert Expired();

    if (_mintNonces[data.walletAddress][data.identificator]) revert NonceAlreadyUsed(data.identificator);
    _invalidateNonce(data.walletAddress, data.identificator);

    bytes32 message = _hashTypedDataV4(
      keccak256(
        abi.encode(
          MINT_DATA_TYPE_HASH,
          data.walletAddress,
          keccak256(bytes(data.identificator)),
          data.deadline
        )
      )
    );
    address signer = message.recover(signature);
    if (signer != _userMintSigner) revert InvalidSignature();
  }

  function userMint(MintData calldata mintData, bytes calldata signature) public virtual returns (uint256 _tokenId) {
    _validateMintData(mintData, signature);

    INFTBase nftContract = INFTBase(_nftContractAddress);
    _tokenId = nftContract.mint(msg.sender);
    emit UserMint(mintData.walletAddress, _tokenId, mintData.identificator);
  }

  function setUserMintSigner(address signerAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _userMintSigner = signerAddress;
  }

  function setNftContractAddress(address nftContractAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _nftContractAddress = nftContractAddress;
  }
}
