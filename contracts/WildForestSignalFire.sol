// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";

contract WildForestSignalFire is AccessControlEnumerableUpgradeable {
  error CooldownActive(uint256 cooldownExpiration);

  event Fire(address indexed account, uint256 fireCounter, uint256 accountCounter, uint256 cooldownPeriod);

  event CooldownPeriodChanged(uint256 indexed cooldownPeriod);

  uint256 public cooldownPeriod;
  string public name;
  uint256 public fireCounter;

  mapping(address => uint256) public accountFireCounter;
  mapping(address => uint256) public accountCooldown;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string memory _name, address ownerAddress, uint256 _cooldownPeriod) public initializer {
    _grantRole(DEFAULT_ADMIN_ROLE, ownerAddress);
    cooldownPeriod = _cooldownPeriod;
    name = _name;
    fireCounter = 0;
  }

  function _validateCooldown(address account) internal view {
    uint256 cooldownExpiration = accountCooldown[account];

    if (cooldownExpiration > block.timestamp) revert CooldownActive(cooldownExpiration);
  }

  function fire() public virtual returns (uint256) {
    address sender = msg.sender;
    _validateCooldown(sender);

    fireCounter += 1;
    accountFireCounter[sender] += 1;
    accountCooldown[sender] = block.timestamp + cooldownPeriod;

    emit Fire(sender, fireCounter, accountFireCounter[sender], cooldownPeriod);
    return fireCounter;
  }

  function setCooldownPeriod(uint256 _cooldownPeriod) external onlyRole(DEFAULT_ADMIN_ROLE) {
    cooldownPeriod = _cooldownPeriod;
    emit CooldownPeriodChanged(_cooldownPeriod);
  }
}
