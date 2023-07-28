// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./ZillionWhalesSale.sol";

contract ZillionWhalesSalesFactory {
  ZillionWhalesSale[] public ZillionWhalesSaleArray;
  address private _owner;

  modifier onlyOwner {
    require(msg.sender == _owner, "AccessControl: account is missing admin role");
    _;
  }

  constructor() {
    _owner = msg.sender;
  }

  function CreateNewZillionWhalesSale(string memory name, string memory symbol, string memory baseTokenURI, uint256 initialPrice, uint256 initialSupply)
    public
    onlyOwner
  {
    ZillionWhalesSale sale = new ZillionWhalesSale(name, symbol, baseTokenURI, msg.sender, initialPrice, initialSupply);
    ZillionWhalesSaleArray.push(sale);
  }

  // TODO: add map for paused indicator and update it
  function salePause(uint256 _saleIndex) public onlyOwner {
    return ZillionWhalesSale(address(ZillionWhalesSaleArray[_saleIndex])).pause();
  }

  // TODO: add map for paused indicator and update it
  function saleUnpause(uint256 _saleIndex) public onlyOwner {
    ZillionWhalesSale(address(ZillionWhalesSaleArray[_saleIndex])).unpause();
  }

  function saleSetMintPrice(uint256 _saleIndex, uint256 actualPrice) public onlyOwner {
    ZillionWhalesSale(address(ZillionWhalesSaleArray[_saleIndex])).setMintPrice(actualPrice);
  }

}
