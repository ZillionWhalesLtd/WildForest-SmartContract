// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./WildForestSale.sol";

contract WildForestSalesFactory {
  WildForestSale[] public WildForestSaleArray;
  address private _owner;

  constructor() {
    _owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == _owner, "AccessControl: account is missing admin role");
    _;
  }

  function CreateNewWildForestSale(string memory name, string memory symbol, string memory baseTokenURI, uint256 initialPrice, uint256 initialSupply)
    public
    onlyOwner
  {
    WildForestSale sale = new WildForestSale(name, symbol, baseTokenURI, msg.sender, initialPrice, initialSupply);
    WildForestSaleArray.push(sale);
  }

  function salePause(uint256 _saleIndex) public onlyOwner {
    return WildForestSale(address(WildForestSaleArray[_saleIndex])).pause();
  }

  function saleUnpause(uint256 _saleIndex) public onlyOwner {
    WildForestSale(address(WildForestSaleArray[_saleIndex])).unpause();
  }

  function saleSetMintPrice(uint256 _saleIndex, uint256 actualPrice) public onlyOwner {
    WildForestSale(address(WildForestSaleArray[_saleIndex])).setMintPrice(actualPrice);
  }
}
