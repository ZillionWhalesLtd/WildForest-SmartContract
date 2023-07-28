// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./ZillionWhalesSale.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ZillionWhalesSalesFactory is AccessControl {
  ZillionWhalesSale[] public ZillionWhalesSaleArray;
  bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

  constructor() {
    _setupRole(ADMIN_ROLE, _msgSender());
  }

  function CreateNewZillionWhalesSale(string memory name, string memory symbol, string memory baseTokenURI, uint256 initialPrice, uint256 initialSupply)
    public
    onlyRole(ADMIN_ROLE)
  {
    ZillionWhalesSale sale = new ZillionWhalesSale(name, symbol, baseTokenURI, initialPrice, initialSupply);
    ZillionWhalesSaleArray.push(sale);
  }

  // TODO: add map for paused indicator and update it
  function salePause(uint256 _saleIndex) public onlyRole(ADMIN_ROLE) {
    return ZillionWhalesSale(address(ZillionWhalesSaleArray[_saleIndex])).pause();
  }

  // TODO: add map for paused indicator and update it
  function saleUnpause(uint256 _saleIndex) public onlyRole(ADMIN_ROLE) {
    ZillionWhalesSale(address(ZillionWhalesSaleArray[_saleIndex])).unpause();
  }

  function saleSetMintPrice(uint256 _saleIndex, uint256 actualPrice) public onlyRole(ADMIN_ROLE) {
    ZillionWhalesSale(address(ZillionWhalesSaleArray[_saleIndex])).setMintPrice(actualPrice);
  }

}
