// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WildForestMedal is ERC1155 {
  mapping (uint256 => uint256) public tokenSupply;

  address private _governance;
  string private _uri;

  uint256 public seasonsCount;
  string public name;
  string public symbol;

  modifier onlyGovernance() {
    require(msg.sender == _governance, "only governance can call this");

    _;
  }

  constructor(string memory _name, string memory _symbol, string memory uri_) public ERC1155(uri_) {
    name = _name;
    symbol = _symbol;
    _governance = msg.sender;
    seasonsCount = 0;
    _uri = uri_;
  }

  function _exists(
    uint256 _seasonNumber
  ) internal view returns (bool) {
    return _seasonNumber <= seasonsCount;
  }

  function setURI(string memory uri_) public onlyGovernance {
    _uri = uri_;
  }

  // function updateGovernance(address _newGovernance) public onlyGovernance {
  //   _governance = _newGovernance;
  // }

  function totalSupply(
    uint256 _id
  ) public view returns (uint256) {
    return tokenSupply[_id];
  }

  function uri(uint256 _seasonId) override public view returns (string memory) {
    require(_exists(_seasonId), "season does not exists");
    return string(
      abi.encodePacked(
        _uri,
        Strings.toString(_seasonId),".json"
      )
    );
  }

  function addNewSeason(uint256 initialSupply) external onlyGovernance returns (uint256) {
    seasonsCount++;
    uint256 seasonNumber = seasonsCount;

    _mint(msg.sender, seasonNumber, initialSupply, "");
    tokenSupply[seasonNumber] = initialSupply;
    return seasonNumber;
  }

  function mint(
    address _to,
    uint256 _seasonId,
    uint256 _amount
  ) public onlyGovernance {
    require(_exists(_seasonId), "season does not exists");
    _mint(_to, _seasonId, _amount, "");
    tokenSupply[_seasonId] = tokenSupply[_seasonId] + _amount;
  }

  function mintBatch(
    address _to,
    uint256[] memory _seasonIds,
    uint256[] memory _amounts
  ) public onlyGovernance {
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
  ) public onlyGovernance {
    require(_exists(_seasonId), "season does not exists");
    _burn(_from, _seasonId, _amount);
    tokenSupply[_seasonId] = tokenSupply[_seasonId] - _amount;
  }

  function burnBatch(
    address _from,
    uint256[] memory _seasonIds,
    uint256[] memory _amounts
  ) public onlyGovernance {
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