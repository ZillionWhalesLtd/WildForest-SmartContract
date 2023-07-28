// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol";

contract ZillionWhalesSale is ERC721PresetMinterPauserAutoIdCustomized {
  using Counters for Counters.Counter;

  address payable private _beneficiar;
  uint256 public mintPrice;
  uint256 public totalSaleSupply;

  constructor(string memory name, string memory symbol, string memory baseTokenURI, address _beneficiarAddr, uint256 initialPrice, uint256 initialSupply)
    ERC721PresetMinterPauserAutoIdCustomized(name, symbol, baseTokenURI)
  {
    mintPrice = initialPrice;
    totalSaleSupply = initialSupply;
    _beneficiar = payable(_beneficiarAddr);
  }

  function setMintPrice(uint256 actualPrice) external onlyRole(DEFAULT_ADMIN_ROLE) {
    mintPrice = actualPrice;
  }

  function publicMint() public payable {
    require(_tokenIdTracker.current() < totalSaleSupply, 'Out of tokens');

    require(msg.value >= mintPrice, "Provide more Ronin");
    (bool sent,) = _beneficiar.call{value: msg.value}("");
    require(sent, "Failed to send Ronin");

    _mintFor(_msgSender());
  }
}
