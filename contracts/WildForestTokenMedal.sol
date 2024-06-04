// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WildForestMedalStorage {
  error MaximumSeasonIdsExceeded();

  event BaseUriChanged(string uri);

  mapping (uint256 => uint256) public tokenSupply;

  address public _governance;

  uint256 public seasonsCount;
  string public name;
  string public symbol;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant TYPE_CREATOR_ROLE = keccak256("TYPE_CREATOR_ROLE");

  bool public _upgradeV2;

  // uint256[49] private __gap;
}

contract WildForestMedal is ERC1155Upgradeable, WildForestMedalStorage, AccessControlEnumerableUpgradeable {
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string calldata _name, string calldata _symbol, string calldata uri_, address _ownerAddress) public initializer {
    require(_ownerAddress != address(0), "TokenMedal: _ownerAddress is the zero address");

    __ERC1155_init(uri_);
    name = _name;
    symbol = _symbol;
    _governance = _ownerAddress;
    _grantRole(DEFAULT_ADMIN_ROLE, _ownerAddress);
    _grantRole(MINTER_ROLE, _ownerAddress);
    _grantRole(TYPE_CREATOR_ROLE, _ownerAddress);
    seasonsCount = 0;
    _upgradeV2 = false;
  }

  function upgradeSetInitRoles(address _ownerAddress) public {
    require (!_upgradeV2, "Contract already upgraded to V2");
    require(msg.sender == _governance, "only governance can call this");
    _upgradeV2 = true;

    _grantRole(DEFAULT_ADMIN_ROLE, _ownerAddress);
    _grantRole(MINTER_ROLE, _ownerAddress);
    _grantRole(TYPE_CREATOR_ROLE, _ownerAddress);
  }

  function _validateSeasonIdsNumber(uint256[] calldata _seasonIds) internal {
    if (_seasonIds.length > 10) revert MaximumSeasonIdsExceeded();
  }

  function _exists(
    uint256 _seasonNumber
  ) internal view returns (bool) {
    return _seasonNumber <= seasonsCount;
  }

  function setURI(string memory uri_) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _setURI(uri_);
    emit BaseUriChanged(uri_);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC1155Upgradeable, AccessControlEnumerableUpgradeable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function totalSupply(
    uint256 _id
  ) public view returns (uint256) {
    return tokenSupply[_id];
  }

  function uri(uint256 _seasonId) override public view returns (string memory) {
    require(_exists(_seasonId), "season does not exists");
    return string.concat(super.uri(_seasonId), Strings.toString(_seasonId));
  }

  function addNewSeason(uint256 initialSupply) external onlyRole(TYPE_CREATOR_ROLE) returns (uint256) {
    seasonsCount++;
    uint256 seasonNumber = seasonsCount;

    tokenSupply[seasonNumber] = initialSupply;
    _mint(msg.sender, seasonNumber, initialSupply, "");
    return seasonNumber;
  }

  function mint(
    address _to,
    uint256 _seasonId,
    uint256 _amount
  ) public onlyRole(MINTER_ROLE) {
    require(_exists(_seasonId), "season does not exists");
    tokenSupply[_seasonId] = tokenSupply[_seasonId] + _amount;
    _mint(_to, _seasonId, _amount, "");
  }

  function mintBatch(
    address _to,
    uint256[] calldata _seasonIds,
    uint256[] calldata _amounts
  ) public onlyRole(MINTER_ROLE) {
    for (uint256 i = 0; i < _seasonIds.length; i++) {
      require(_exists(_seasonIds[i]), "season does not exists");
    }
    for (uint256 i = 0; i < _seasonIds.length; i++) {
      uint256 _id = _seasonIds[i];
      uint256 _amount = _amounts[i];
      tokenSupply[_id] = tokenSupply[_id] + _amount;
    }
    _mintBatch(_to, _seasonIds, _amounts, "");
  }

  function burn(
    address _from,
    uint256 _seasonId,
    uint256 _amount
  ) public {
    require(
      _from == _msgSender() || isApprovedForAll(_from, _msgSender()),
      "ERC1155: caller is not token owner or approved"
    );
    require(_exists(_seasonId), "season does not exists");
    _burn(_from, _seasonId, _amount);
    tokenSupply[_seasonId] = tokenSupply[_seasonId] - _amount;
  }

  function burnBatch(
    address _from,
    uint256[] calldata _seasonIds,
    uint256[] calldata _amounts
  ) public {
    require(
      _from == _msgSender() || isApprovedForAll(_from, _msgSender()),
      "ERC1155: caller is not token owner or approved"
    );
    _validateSeasonIdsNumber(_seasonIds);

    for (uint256 i = 0; i < _seasonIds.length; i++) {
      require(_exists(_seasonIds[i]), "season does not exists");
    }
    for (uint256 i = 0; i < _seasonIds.length; i++) {
      uint256 _id = _seasonIds[i];
      uint256 _amount = _amounts[i];
      tokenSupply[_id] = tokenSupply[_id] - _amount;
    }
    _burnBatch(_from, _seasonIds, _amounts);
  }
}
