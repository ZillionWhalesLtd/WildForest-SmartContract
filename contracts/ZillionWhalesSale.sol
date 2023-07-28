// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./sky-mavis-nft/ERC721Common.sol";

contract ZillionWhalesSale is ERC721Common {
  address payable private _beneficiar;
  uint256 public mintPrice;

  constructor(string memory name, string memory symbol, string memory baseTokenURI, uint256 initialPrice)
    ERC721Common(name, symbol, baseTokenURI)
  {
    mintPrice = initialPrice;
    _beneficiar = payable(_msgSender());
  }

  function setMintPrice(uint256 actualPrice) external onlyRole(DEFAULT_ADMIN_ROLE) {
    mintPrice = actualPrice;
  }

  // function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
  //   uint _balance = address(this).balance;
  //   (bool success,) = _beneficiar.call{value: _balance}("");
  //   require(success, "Withdraw transaction failed");
  // }

  function publicMint() public payable {
    require(msg.value >= mintPrice, "Provide more Ronin");
    // (bool sent, bytes memory data) = address(this).call{value: msg.value}("");
    (bool sent, bytes memory data) = _beneficiar.call{value: msg.value}("");
    require(sent, "Failed to send Ronin");

    _mintFor(_msgSender());
  }
}

