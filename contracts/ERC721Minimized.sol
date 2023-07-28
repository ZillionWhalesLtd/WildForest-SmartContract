// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721Minimized is
  Context,
  AccessControl,
  ERC721Enumerable,
  ERC721Burnable,
  ERC721Pausable
{
  using Counters for Counters.Counter;
  Counters.Counter internal _tokenIdTracker;

  string internal _baseTokenURI;

  constructor(string memory name, string memory symbol, string memory baseTokenURI) ERC721(name, symbol) {
    _baseTokenURI = baseTokenURI;

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

    _tokenIdTracker.increment();
  }

  function setBaseURI(string memory baseTokenURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _baseTokenURI = baseTokenURI;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function pause() public virtual {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to pause");
    _pause();
  }

  function unpause() public virtual {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to unpause");
    _unpause();
  }

  function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize)
    internal
    virtual
    override(ERC721, ERC721Enumerable, ERC721Pausable)
  {
    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControl, ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _mintFor(address to) internal virtual returns (uint256 _tokenId) {
    _tokenId = _tokenIdTracker.current();
    _mint(to, _tokenId);
    _tokenIdTracker.increment();
  }
}
