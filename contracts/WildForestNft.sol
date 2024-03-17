// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "./sky-mavis-nft/ERC721Common.sol";
import {EIP712Upgradeable as EIP712} from "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract WildForestNft is ERC721Common, EIP712 {
  using ECDSA for bytes32;
  // constructor(string memory name, string memory symbol, string memory baseTokenURI, address ownerAddress)
  //   ERC721Common(name, symbol, baseTokenURI, ownerAddress)
  // {}

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

  mapping(address => mapping(string => bool)) public _mintNonces;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string memory name, string memory symbol, string memory baseTokenURI, address ownerAddress) public initializer {
    __ERC721Common_init(name, symbol, baseTokenURI, ownerAddress);
    __EIP712_init(name, "1");
  }

  function initialize712(string memory name, string memory version) public onlyRole(DEFAULT_ADMIN_ROLE) reinitializer(2) {
    __EIP712_init(name, version);
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

  function _invalidateNonce(address walletAddress, string memory identificator) internal {
    _mintNonces[walletAddress][identificator] = true;
  }

  function _validateMintData(MintData calldata data, bytes calldata signature) internal {
    require(data.walletAddress == _msgSender(), "Caller address is not MintData.walletAddress");
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

    _tokenId = _mintFor(_msgSender());
    emit UserMint(mintData.walletAddress, _tokenId, mintData.identificator);
  }

  function setUserMintSigner(address signerAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _userMintSigner = signerAddress;
  }

  function bulkBurn(uint256[] calldata tokenIds) public virtual {
    //solhint-disable-next-line max-line-length
    for (uint256 _i = 0; _i < tokenIds.length; _i++) {
      require(_isApprovedOrOwner(_msgSender(), tokenIds[_i]), "ERC721: caller is not token owner or approved");
      _burn(tokenIds[_i]);
    }

  }
}
