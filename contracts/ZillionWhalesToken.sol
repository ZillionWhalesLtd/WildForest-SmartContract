// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZillionWhalesToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("ZillionWhales", "ZWT") {
    _mint(msg.sender, initialSupply);
  }
}
