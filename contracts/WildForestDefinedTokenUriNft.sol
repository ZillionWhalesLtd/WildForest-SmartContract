// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WildForestDefinedTokenUriNft is
  Context,
  AccessControlEnumerable,
  ERC721URIStorage,
  ERC721Enumerable,
  ERC721Burnable,
  ERC721Pausable
{
  using Counters for Counters.Counter;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

  Counters.Counter internal _tokenIdTracker;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(MINTER_ROLE, _msgSender());
    _setupRole(PAUSER_ROLE, _msgSender());

    // Token id should start from 1.
    _tokenIdTracker.increment();
  }

  function mint(address to, string memory _tokenUri) public virtual returns (uint256 _tokenId) {
    require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
    return _mintFor(to, _tokenUri);
  }

  function _baseURI() internal pure override returns (string memory) {
    return '';
  }

  function pause() public virtual {
    require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to pause");
    _pause();
  }

  function unpause() public virtual {
    require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to unpause");
    _unpause();
  }

  function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize)
    internal
    virtual
    override(ERC721, ERC721Enumerable, ERC721Pausable)
  {
    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
  }

  function tokenURI(uint256 tokenId)
      public
      view
      override(ERC721, ERC721URIStorage)
      returns (string memory)
  {
      return super.tokenURI(tokenId);
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControlEnumerable, ERC721, ERC721Enumerable, ERC721URIStorage)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _burn(uint256 tokenId)
    internal
    override(ERC721, ERC721URIStorage)
  {
    super._burn(tokenId);
  }

  function _mintFor(address to, string memory _tokenURI) internal virtual returns (uint256 _tokenId) {
    // We cannot just use balanceOf to create the new tokenId because tokens
    // can be burned (destroyed), so we need a separate counter.
    _tokenId = _tokenIdTracker.current();
    _safeMint(to, _tokenId);
    // _mint(to, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
    _tokenIdTracker.increment();
  }
}
