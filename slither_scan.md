# SCAN RESULTS:

Summary
 - [arbitrary-send-erc20](#arbitrary-send-erc20) (1 results) (High)
 - [incorrect-exp](#incorrect-exp) (2 results) (High)
 - [uninitialized-state](#uninitialized-state) (1 results) (High)
 - [divide-before-multiply](#divide-before-multiply) (16 results) (Medium)
 - [unused-return](#unused-return) (2 results) (Medium)
 - [shadowing-local](#shadowing-local) (12 results) (Low)
 - [missing-zero-check](#missing-zero-check) (10 results) (Low)
 - [calls-loop](#calls-loop) (3 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (1 results) (Low)
 - [reentrancy-events](#reentrancy-events) (4 results) (Low)
 - [timestamp](#timestamp) (3 results) (Low)
 - [assembly](#assembly) (16 results) (Informational)
 - [pragma](#pragma) (1 results) (Informational)
 - [costly-loop](#costly-loop) (2 results) (Informational)
 - [dead-code](#dead-code) (1 results) (Informational)
 - [solc-version](#solc-version) (56 results) (Informational)
 - [low-level-calls](#low-level-calls) (9 results) (Informational)
 - [naming-convention](#naming-convention) (72 results) (Informational)
## arbitrary-send-erc20
Impact: High
Confidence: High
 - [ ] ID-0
[WildForestClaimTokenTransfer.userTransfer(WildForestClaimTokenTransfer.TransferData,bytes)](contracts/WildForestClaimTokenTransfer.sol#L101-L107) uses arbitrary from in transferFrom: [SafeERC20.safeTransferFrom(tokenContract,transferData.senderAddress,msg.sender,transferData.amount)](contracts/WildForestClaimTokenTransfer.sol#L105)

contracts/WildForestClaimTokenTransfer.sol#L101-L107


## incorrect-exp
Impact: High
Confidence: Medium
 - [ ] ID-1
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) has bitwise-xor operator ^ instead of the exponentiation operator **:
   - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L116)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-2
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) has bitwise-xor operator ^ instead of the exponentiation operator **:
   - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L116)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


## uninitialized-state
Impact: High
Confidence: High
 - [ ] ID-3
[ERC721Nonce.nonces](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L16) is never initialized. It is used in:
  - [ERC721Common.stateOf(uint256)](contracts/sky-mavis-nft/ERC721Common.sol#L21-L24)
  - [ERC721Nonce._beforeTokenTransfer(address,address,uint256,uint256)](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L27-L36)

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L16


## divide-before-multiply
Impact: Medium
Confidence: Medium
 - [ ] ID-4
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L121)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-5
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L120)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-6
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L124)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-7
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [prod0 = prod0 / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L104)
  - [result = prod0 * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L131)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-8
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L122)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-9
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L120)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-10
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L125)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-11
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L125)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-12
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L124)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-13
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L123)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-14
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L121)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-15
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L116)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-16
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L122)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-17
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L116)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-18
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [prod0 = prod0 / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L104)
  - [result = prod0 * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L131)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-19
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L123)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


## unused-return
Impact: Medium
Confidence: Medium
 - [ ] ID-20
[AccessControlEnumerableUpgradeable._revokeRole(bytes32,address)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L66-L69) ignores return value by [_roleMembers[role].remove(account)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L68)

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L66-L69


 - [ ] ID-21
[AccessControlEnumerableUpgradeable._grantRole(bytes32,address)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L58-L61) ignores return value by [_roleMembers[role].add(account)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L60)

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L58-L61


## shadowing-local
Impact: Low
Confidence: High
 - [ ] ID-22
[ERC721Common.__ERC721Common_init(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721Common.sol#L10) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L10


 - [ ] ID-23
[ERC721Common.__ERC721Common_init_unchained(string,string,string,address).name](contracts/sky-mavis-nft/ERC721Common.sol#L14) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L14


 - [ ] ID-24
[WildForestToken.constructor(uint256,string,string,address).name](contracts/WildForestToken.sol#L7) shadows:
  - [ERC20.name()](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L62-L64) (function)
  - [IERC20Metadata.name()](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L17) (function)

contracts/WildForestToken.sol#L7


 - [ ] ID-25
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init_unchained(string,string,string,address).name](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L48) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L48


 - [ ] ID-26
[WildForestNft.initialize(string,string,string,address).symbol](contracts/WildForestNft.sol#L17) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/WildForestNft.sol#L17


 - [ ] ID-27
[ERC721Common.__ERC721Common_init_unchained(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721Common.sol#L14) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L14


 - [ ] ID-28
[ERC721Common.__ERC721Common_init(string,string,string,address).name](contracts/sky-mavis-nft/ERC721Common.sol#L10) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L10


 - [ ] ID-29
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L44) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L44


 - [ ] ID-30
[WildForestToken.constructor(uint256,string,string,address).symbol](contracts/WildForestToken.sol#L7) shadows:
  - [ERC20.symbol()](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L70-L72) (function)
  - [IERC20Metadata.symbol()](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L22) (function)

contracts/WildForestToken.sol#L7


 - [ ] ID-31
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init(string,string,string,address).name](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L44) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L44


 - [ ] ID-32
[WildForestNft.initialize(string,string,string,address).name](contracts/WildForestNft.sol#L17) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/WildForestNft.sol#L17


 - [ ] ID-33
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init_unchained(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L48) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L48


## missing-zero-check
Impact: Low
Confidence: Medium
 - [ ] ID-34
[WildForestClaimNft.initialize(string,address,address,address).signerAddress](contracts/WildForestClaimNft.sol#L55) lacks a zero-check on :
    - [_userMintSigner = signerAddress](contracts/WildForestClaimNft.sol#L60)

contracts/WildForestClaimNft.sol#L55


 - [ ] ID-35
[WildForestClaimTokenTransfer.setTokenContractAddress(address).tokenContractAddress](contracts/WildForestClaimTokenTransfer.sol#L115) lacks a zero-check on :
    - [_tokenContractAddress = tokenContractAddress](contracts/WildForestClaimTokenTransfer.sol#L117)

contracts/WildForestClaimTokenTransfer.sol#L115


 - [ ] ID-36
[WildForestClaimNft.setNftContractAddress(address).nftContractAddress](contracts/WildForestClaimNft.sol#L131) lacks a zero-check on :
    - [_nftContractAddress = nftContractAddress](contracts/WildForestClaimNft.sol#L133)

contracts/WildForestClaimNft.sol#L131


 - [ ] ID-37
[WildForestClaimTokenTransfer.setUserTransferSigner(address).signerAddress](contracts/WildForestClaimTokenTransfer.sol#L109) lacks a zero-check on :
    - [_userTransferSigner = signerAddress](contracts/WildForestClaimTokenTransfer.sol#L111)

contracts/WildForestClaimTokenTransfer.sol#L109


 - [ ] ID-38
[WildForestLockNft.initialize(string,address,address,uint256).nftContractAddress](contracts/WildForestLockNft.sol#L32) lacks a zero-check on :
    - [_nftContractAddress = nftContractAddress](contracts/WildForestLockNft.sol#L36)

contracts/WildForestLockNft.sol#L32


 - [ ] ID-39
[WildForestClaimTokenTransfer.initialize(string,address,address,address).tokenContractAddress](contracts/WildForestClaimTokenTransfer.sol#L54) lacks a zero-check on :
    - [_tokenContractAddress = tokenContractAddress](contracts/WildForestClaimTokenTransfer.sol#L60)

contracts/WildForestClaimTokenTransfer.sol#L54


 - [ ] ID-40
[WildForestClaimNft.setUserMintSigner(address).signerAddress](contracts/WildForestClaimNft.sol#L125) lacks a zero-check on :
    - [_userMintSigner = signerAddress](contracts/WildForestClaimNft.sol#L127)

contracts/WildForestClaimNft.sol#L125


 - [ ] ID-41
[WildForestClaimTokenTransfer.initialize(string,address,address,address).signerAddress](contracts/WildForestClaimTokenTransfer.sol#L54) lacks a zero-check on :
    - [_userTransferSigner = signerAddress](contracts/WildForestClaimTokenTransfer.sol#L59)

contracts/WildForestClaimTokenTransfer.sol#L54


 - [ ] ID-42
[WildForestClaimNft.initialize(string,address,address,address).nftContractAddress](contracts/WildForestClaimNft.sol#L55) lacks a zero-check on :
    - [_nftContractAddress = nftContractAddress](contracts/WildForestClaimNft.sol#L61)

contracts/WildForestClaimNft.sol#L55


 - [ ] ID-43
[WildForestLockNft.setNftContractAddress(address).nftContractAddress](contracts/WildForestLockNft.sol#L101) lacks a zero-check on :
    - [_nftContractAddress = nftContractAddress](contracts/WildForestLockNft.sol#L104)

contracts/WildForestLockNft.sol#L101


## calls-loop
Impact: Low
Confidence: Medium
 - [ ] ID-44
[WildForestLockNft.stake(uint256[])](contracts/WildForestLockNft.sol#L65-L81) has external calls inside a loop: [nftContract.transferFrom(msg.sender,address(this),tokenId)](contracts/WildForestLockNft.sol#L75)

contracts/WildForestLockNft.sol#L65-L81


 - [ ] ID-45
[WildForestLockNft.unstake(uint256[])](contracts/WildForestLockNft.sol#L83-L99) has external calls inside a loop: [nftContract.transferFrom(address(this),msg.sender,tokenId)](contracts/WildForestLockNft.sol#L94)

contracts/WildForestLockNft.sol#L83-L99


 - [ ] ID-46
[ERC721Upgradeable._checkOnERC721Received(address,address,uint256,bytes)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L404-L426) has external calls inside a loop: [retval = IERC721ReceiverUpgradeable(to).onERC721Received(_msgSender(),from,tokenId,data)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L411-L422)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L404-L426


## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-47
Reentrancy in [WildForestLockNft.stake(uint256[])](contracts/WildForestLockNft.sol#L65-L81):
  External calls:
  - [nftContract.transferFrom(msg.sender,address(this),tokenId)](contracts/WildForestLockNft.sol#L75)
  State variables written after the call(s):
  - [_lock(msg.sender,tokenId)](contracts/WildForestLockNft.sol#L76)
    - [_lockedTokens[tokenId][account] = unlockTimestamp](contracts/WildForestLockNft.sol#L48)

contracts/WildForestLockNft.sol#L65-L81


## reentrancy-events
Impact: Low
Confidence: Medium
 - [ ] ID-48
Reentrancy in [WildForestClaimNft.userMint(WildForestClaimNft.MintData,bytes)](contracts/WildForestClaimNft.sol#L112-L123):
  External calls:
  - [_tokenIds = nftContract.bulkMint(_recipients)](contracts/WildForestClaimNft.sol#L121)
  Event emitted after the call(s):
  - [UserMint(mintData.walletAddress,_tokenIds,mintData.identificators,mintData.playerId)](contracts/WildForestClaimNft.sol#L122)

contracts/WildForestClaimNft.sol#L112-L123


 - [ ] ID-49
Reentrancy in [WildForestLockNft.unstake(uint256[])](contracts/WildForestLockNft.sol#L83-L99):
  External calls:
  - [nftContract.transferFrom(address(this),msg.sender,tokenId)](contracts/WildForestLockNft.sol#L94)
  Event emitted after the call(s):
  - [UnstakeLock(msg.sender,tokenIds)](contracts/WildForestLockNft.sol#L97)

contracts/WildForestLockNft.sol#L83-L99


 - [ ] ID-50
Reentrancy in [WildForestClaimTokenTransfer.userTransfer(WildForestClaimTokenTransfer.TransferData,bytes)](contracts/WildForestClaimTokenTransfer.sol#L101-L107):
  External calls:
  - [SafeERC20.safeTransferFrom(tokenContract,transferData.senderAddress,msg.sender,transferData.amount)](contracts/WildForestClaimTokenTransfer.sol#L105)
  Event emitted after the call(s):
  - [UserTransfer(transferData.walletAddress,transferData.senderAddress,transferData.amount,transferData.identificator,transferData.playerId)](contracts/WildForestClaimTokenTransfer.sol#L106)

contracts/WildForestClaimTokenTransfer.sol#L101-L107


 - [ ] ID-51
Reentrancy in [WildForestLockNft.stake(uint256[])](contracts/WildForestLockNft.sol#L65-L81):
  External calls:
  - [nftContract.transferFrom(msg.sender,address(this),tokenId)](contracts/WildForestLockNft.sol#L75)
  Event emitted after the call(s):
  - [StakeLock(msg.sender,tokenIds,_lockPeriod)](contracts/WildForestLockNft.sol#L79)

contracts/WildForestLockNft.sol#L65-L81


## timestamp
Impact: Low
Confidence: Medium
 - [ ] ID-52
[WildForestClaimTokenTransfer._validateTransferData(WildForestClaimTokenTransfer.TransferData,bytes)](contracts/WildForestClaimTokenTransfer.sol#L77-L99) uses timestamp for comparisons
  Dangerous comparisons:
  - [data.deadline < block.timestamp](contracts/WildForestClaimTokenTransfer.sol#L79)

contracts/WildForestClaimTokenTransfer.sol#L77-L99


 - [ ] ID-53
[WildForestClaimNft._validateMintData(WildForestClaimNft.MintData,bytes)](contracts/WildForestClaimNft.sol#L78-L110) uses timestamp for comparisons
  Dangerous comparisons:
  - [data.deadline < block.timestamp](contracts/WildForestClaimNft.sol#L80)

contracts/WildForestClaimNft.sol#L78-L110


 - [ ] ID-54
[WildForestLockNft._validateOwnerAndLock(address,uint256)](contracts/WildForestLockNft.sol#L57-L63) uses timestamp for comparisons
  Dangerous comparisons:
  - [lockExpiration > block.timestamp](contracts/WildForestLockNft.sol#L62)

contracts/WildForestLockNft.sol#L57-L63


## assembly
Impact: Informational
Confidence: High
 - [ ] ID-55
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L62-L66)
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L85-L92)
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L99-L108)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-56
[ECDSAUpgradeable.tryRecover(bytes32,bytes)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L55-L72) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L63-L67)

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L55-L72


 - [ ] ID-57
[ERC721Upgradeable._checkOnERC721Received(address,address,uint256,bytes)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L404-L426) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L418-L420)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L404-L426


 - [ ] ID-58
[ECDSA.tryRecover(bytes32,bytes)](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L55-L72) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L63-L67)

node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L55-L72


 - [ ] ID-59
[AddressUpgradeable._revert(bytes,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L231-L243) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L236-L239)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L231-L243


 - [ ] ID-60
[EnumerableSetUpgradeable.values(EnumerableSetUpgradeable.Bytes32Set)](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L219-L229) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L224-L226)

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L219-L229


 - [ ] ID-61
[ECDSA.toEthSignedMessageHash(bytes32)](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L165-L174) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L169-L173)

node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L165-L174


 - [ ] ID-62
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L62-L66)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L85-L92)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L99-L108)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-63
[EnumerableSetUpgradeable.values(EnumerableSetUpgradeable.AddressSet)](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L293-L303) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L298-L300)

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L293-L303


 - [ ] ID-64
[ECDSAUpgradeable.toEthSignedMessageHash(bytes32)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L165-L174) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L169-L173)

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L165-L174


 - [ ] ID-65
[EnumerableSetUpgradeable.values(EnumerableSetUpgradeable.UintSet)](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L367-L377) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L372-L374)

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L367-L377


 - [ ] ID-66
[Strings.toString(uint256)](node_modules/@openzeppelin/contracts/utils/Strings.sol#L19-L39) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Strings.sol#L25-L27)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Strings.sol#L31-L33)

node_modules/@openzeppelin/contracts/utils/Strings.sol#L19-L39


 - [ ] ID-67
[StringsUpgradeable.toString(uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L19-L39) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L25-L27)
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L31-L33)

node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L19-L39


 - [ ] ID-68
[Address._revert(bytes,string)](node_modules/@openzeppelin/contracts/utils/Address.sol#L231-L243) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Address.sol#L236-L239)

node_modules/@openzeppelin/contracts/utils/Address.sol#L231-L243


 - [ ] ID-69
[ECDSAUpgradeable.toTypedDataHash(bytes32,bytes32)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L197-L206) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L199-L205)

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L197-L206


 - [ ] ID-70
[ECDSA.toTypedDataHash(bytes32,bytes32)](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L197-L206) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L199-L205)

node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L197-L206


## pragma
Impact: Informational
Confidence: High
 - [ ] ID-71
Different versions of Solidity are used:
  - Version used: ['^0.8.0', '^0.8.1', '^0.8.16', '^0.8.2', '^0.8.8']
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC5267Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L5)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/Context.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/Counters.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/Strings.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4)
  - [^0.8.0](contracts/sky-mavis-nft/ERC721Common.sol#L2)
  - [^0.8.0](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2)
  - [^0.8.0](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2)
  - [^0.8.0](contracts/sky-mavis-nft/refs/IERC721State.sol#L2)
  - [^0.8.1](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L4)
  - [^0.8.1](node_modules/@openzeppelin/contracts/utils/Address.sol#L4)
  - [^0.8.16](contracts/WildForestClaimNft.sol#L2)
  - [^0.8.16](contracts/WildForestClaimTokenTransfer.sol#L2)
  - [^0.8.16](contracts/WildForestLockNft.sol#L2)
  - [^0.8.16](contracts/WildForestNft.sol#L2)
  - [^0.8.16](contracts/WildForestToken.sol#L2)
  - [^0.8.16](contracts/WildForestTokenMedal.sol#L2)
  - [^0.8.16](contracts/interfaces/INFTBase.sol#L2)
  - [^0.8.16](contracts/interfaces/ITokenBase.sol#L2)
  - [^0.8.2](node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol#L4)
  - [^0.8.8](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L4)

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4


## costly-loop
Impact: Informational
Confidence: Medium
 - [ ] ID-72
[ERC721Upgradeable._burn(uint256)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325) has costly operations inside a loop:
  - [delete _owners[tokenId]](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L320)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325


 - [ ] ID-73
[ERC721Upgradeable._burn(uint256)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325) has costly operations inside a loop:
  - [delete _tokenApprovals[tokenId]](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L313)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325


## dead-code
Impact: Informational
Confidence: Medium
 - [ ] ID-74
[ERC721Nonce._beforeTokenTransfer(address,address,uint256,uint256)](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L27-L36) is never used and should be removed

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L27-L36


## solc-version
Impact: Informational
Confidence: High
 - [ ] ID-75
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L4


 - [ ] ID-76
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L4


 - [ ] ID-77
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L4


 - [ ] ID-78
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4


 - [ ] ID-79
solc-0.8.16 is not recommended for deployment

 - [ ] ID-80
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4


 - [ ] ID-81
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol#L4


 - [ ] ID-82
Pragma version[^0.8.16](contracts/interfaces/ITokenBase.sol#L2) allows old versions

contracts/interfaces/ITokenBase.sol#L2


 - [ ] ID-83
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Context.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Context.sol#L4


 - [ ] ID-84
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol#L4


 - [ ] ID-85
Pragma version[^0.8.16](contracts/WildForestTokenMedal.sol#L2) allows old versions

contracts/WildForestTokenMedal.sol#L2


 - [ ] ID-86
Pragma version[^0.8.16](contracts/WildForestNft.sol#L2) allows old versions

contracts/WildForestNft.sol#L2


 - [ ] ID-87
Pragma version[^0.8.0](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2) allows old versions

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2


 - [ ] ID-88
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Strings.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Strings.sol#L4


 - [ ] ID-89
Pragma version[^0.8.0](contracts/sky-mavis-nft/refs/IERC721State.sol#L2) allows old versions

contracts/sky-mavis-nft/refs/IERC721State.sol#L2


 - [ ] ID-90
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol#L4


 - [ ] ID-91
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L4


 - [ ] ID-92
Pragma version[^0.8.8](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L4) is known to contain severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L4


 - [ ] ID-93
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol#L4


 - [ ] ID-94
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol#L4


 - [ ] ID-95
Pragma version[^0.8.1](node_modules/@openzeppelin/contracts/utils/Address.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Address.sol#L4


 - [ ] ID-96
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol#L4


 - [ ] ID-97
Pragma version[^0.8.16](contracts/WildForestClaimTokenTransfer.sol#L2) allows old versions

contracts/WildForestClaimTokenTransfer.sol#L2


 - [ ] ID-98
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L4


 - [ ] ID-99
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L4


 - [ ] ID-100
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L4


 - [ ] ID-101
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Counters.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Counters.sol#L4


 - [ ] ID-102
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L4


 - [ ] ID-103
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4


 - [ ] ID-104
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L5) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L5


 - [ ] ID-105
Pragma version[^0.8.16](contracts/interfaces/INFTBase.sol#L2) allows old versions

contracts/interfaces/INFTBase.sol#L2


 - [ ] ID-106
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol#L4


 - [ ] ID-107
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol#L4


 - [ ] ID-108
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4


 - [ ] ID-109
Pragma version[^0.8.16](contracts/WildForestLockNft.sol#L2) allows old versions

contracts/WildForestLockNft.sol#L2


 - [ ] ID-110
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol#L4


 - [ ] ID-111
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4


 - [ ] ID-112
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L4


 - [ ] ID-113
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC5267Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC5267Upgradeable.sol#L4


 - [ ] ID-114
Pragma version[^0.8.16](contracts/WildForestClaimNft.sol#L2) allows old versions

contracts/WildForestClaimNft.sol#L2


 - [ ] ID-115
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4


 - [ ] ID-116
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol#L4


 - [ ] ID-117
Pragma version[^0.8.16](contracts/WildForestToken.sol#L2) allows old versions

contracts/WildForestToken.sol#L2


 - [ ] ID-118
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol#L4


 - [ ] ID-119
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4


 - [ ] ID-120
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol#L4


 - [ ] ID-121
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L4


 - [ ] ID-122
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L4


 - [ ] ID-123
Pragma version[^0.8.2](node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol#L4


 - [ ] ID-124
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L4


 - [ ] ID-125
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4


 - [ ] ID-126
Pragma version[^0.8.0](contracts/sky-mavis-nft/ERC721Common.sol#L2) allows old versions

contracts/sky-mavis-nft/ERC721Common.sol#L2


 - [ ] ID-127
Pragma version[^0.8.1](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L4


 - [ ] ID-128
Pragma version[^0.8.0](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2) allows old versions

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2


 - [ ] ID-129
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L4


 - [ ] ID-130
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L4


## low-level-calls
Impact: Informational
Confidence: High
 - [ ] ID-131
Low level call in [Address.functionCallWithValue(address,bytes,uint256,string)](node_modules/@openzeppelin/contracts/utils/Address.sol#L128-L137):
  - [(success,returndata) = target.call{value: value}(data)](node_modules/@openzeppelin/contracts/utils/Address.sol#L135)

node_modules/@openzeppelin/contracts/utils/Address.sol#L128-L137


 - [ ] ID-132
Low level call in [SafeERC20._callOptionalReturnBool(IERC20,bytes)](node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol#L134-L142):
  - [(success,returndata) = address(token).call(data)](node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol#L139)

node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol#L134-L142


 - [ ] ID-133
Low level call in [AddressUpgradeable.functionDelegateCall(address,bytes,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L180-L187):
  - [(success,returndata) = target.delegatecall(data)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L185)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L180-L187


 - [ ] ID-134
Low level call in [Address.sendValue(address,uint256)](node_modules/@openzeppelin/contracts/utils/Address.sol#L64-L69):
  - [(success) = recipient.call{value: amount}()](node_modules/@openzeppelin/contracts/utils/Address.sol#L67)

node_modules/@openzeppelin/contracts/utils/Address.sol#L64-L69


 - [ ] ID-135
Low level call in [AddressUpgradeable.functionCallWithValue(address,bytes,uint256,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L128-L137):
  - [(success,returndata) = target.call{value: value}(data)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L135)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L128-L137


 - [ ] ID-136
Low level call in [AddressUpgradeable.functionStaticCall(address,bytes,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L155-L162):
  - [(success,returndata) = target.staticcall(data)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L160)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L155-L162


 - [ ] ID-137
Low level call in [Address.functionStaticCall(address,bytes,string)](node_modules/@openzeppelin/contracts/utils/Address.sol#L155-L162):
  - [(success,returndata) = target.staticcall(data)](node_modules/@openzeppelin/contracts/utils/Address.sol#L160)

node_modules/@openzeppelin/contracts/utils/Address.sol#L155-L162


 - [ ] ID-138
Low level call in [Address.functionDelegateCall(address,bytes,string)](node_modules/@openzeppelin/contracts/utils/Address.sol#L180-L187):
  - [(success,returndata) = target.delegatecall(data)](node_modules/@openzeppelin/contracts/utils/Address.sol#L185)

node_modules/@openzeppelin/contracts/utils/Address.sol#L180-L187


 - [ ] ID-139
Low level call in [AddressUpgradeable.sendValue(address,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L64-L69):
  - [(success) = recipient.call{value: amount}()](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L67)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L64-L69


## naming-convention
Impact: Informational
Confidence: High
 - [ ] ID-140
Function [ERC1155Upgradeable.__ERC1155_init_unchained(string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L40-L42) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L40-L42


 - [ ] ID-141
Parameter [WildForestMedal.totalSupply(uint256)._id](contracts/WildForestTokenMedal.sol#L85) is not in mixedCase

contracts/WildForestTokenMedal.sol#L85


 - [ ] ID-142
Variable [WildForestClaimNft._mintNonces](contracts/WildForestClaimNft.sol#L48) is not in mixedCase

contracts/WildForestClaimNft.sol#L48


 - [ ] ID-143
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._seasonIds](contracts/WildForestTokenMedal.sol#L146) is not in mixedCase

contracts/WildForestTokenMedal.sol#L146


 - [ ] ID-144
Variable [WildForestLockNft._name](contracts/WildForestLockNft.sol#L23) is not in mixedCase

contracts/WildForestLockNft.sol#L23


 - [ ] ID-145
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._from](contracts/WildForestTokenMedal.sol#L145) is not in mixedCase

contracts/WildForestTokenMedal.sol#L145


 - [ ] ID-146
Parameter [WildForestMedal.upgradeSetInitRoles(address)._ownerAddress](contracts/WildForestTokenMedal.sol#L49) is not in mixedCase

contracts/WildForestTokenMedal.sol#L49


 - [ ] ID-147
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._amounts](contracts/WildForestTokenMedal.sol#L147) is not in mixedCase

contracts/WildForestTokenMedal.sol#L147


 - [ ] ID-148
Variable [EIP712Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L204) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L204


 - [ ] ID-149
Function [AccessControlUpgradeable.__AccessControl_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L79-L80) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L79-L80


 - [ ] ID-150
Parameter [WildForestMedal.mint(address,uint256,uint256)._to](contracts/WildForestTokenMedal.sol#L105) is not in mixedCase

contracts/WildForestTokenMedal.sol#L105


 - [ ] ID-151
Variable [WildForestLockNft._lockPeriod](contracts/WildForestLockNft.sol#L22) is not in mixedCase

contracts/WildForestLockNft.sol#L22


 - [ ] ID-152
Function [EIP712Upgradeable.__EIP712_init(string,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L59-L61) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L59-L61


 - [ ] ID-153
Variable [ContextUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L40) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L40


 - [ ] ID-154
Variable [AccessControlUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L260) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L260


 - [ ] ID-155
Variable [ERC721Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L477) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L477


 - [ ] ID-156
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._seasonIds](contracts/WildForestTokenMedal.sol#L116) is not in mixedCase

contracts/WildForestTokenMedal.sol#L116


 - [ ] ID-157
Function [ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init_unchained(string,string,string,address)](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L48-L58) is not in mixedCase

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L48-L58


 - [ ] ID-158
Function [ERC721BurnableUpgradeable.__ERC721Burnable_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L15-L16) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L15-L16


 - [ ] ID-159
Variable [WildForestClaimTokenTransfer._transferNonces](contracts/WildForestClaimTokenTransfer.sol#L47) is not in mixedCase

contracts/WildForestClaimTokenTransfer.sol#L47


 - [ ] ID-160
Function [ERC721Common.__ERC721Common_init(string,string,string,address)](contracts/sky-mavis-nft/ERC721Common.sol#L10-L12) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L10-L12


 - [ ] ID-161
Parameter [WildForestMedal.uri(uint256)._seasonId](contracts/WildForestTokenMedal.sol#L90) is not in mixedCase

contracts/WildForestTokenMedal.sol#L90


 - [ ] ID-162
Function [ERC721BurnableUpgradeable.__ERC721Burnable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L18-L19) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L18-L19


 - [ ] ID-163
Variable [ERC721BurnableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L38) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L38


 - [ ] ID-164
Function [ERC721Upgradeable.__ERC721_init_unchained(string,string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L49-L52) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L49-L52


 - [ ] ID-165
Parameter [WildForestMedal.burn(address,uint256,uint256)._seasonId](contracts/WildForestTokenMedal.sol#L132) is not in mixedCase

contracts/WildForestTokenMedal.sol#L132


 - [ ] ID-166
Variable [ERC721Nonce.______gap](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L22) is not in mixedCase

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L22


 - [ ] ID-167
Variable [PausableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L116) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L116


 - [ ] ID-168
Parameter [ERC721Common.bulkMint(address[])._recipients](contracts/sky-mavis-nft/ERC721Common.sol#L74) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L74


 - [ ] ID-169
Function [ERC721PausableUpgradeable.__ERC721Pausable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L28-L29) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L28-L29


 - [ ] ID-170
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._to](contracts/WildForestTokenMedal.sol#L115) is not in mixedCase

contracts/WildForestTokenMedal.sol#L115


 - [ ] ID-171
Function [ERC721PausableUpgradeable.__ERC721Pausable_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L24-L26) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L24-L26


 - [ ] ID-172
Function [ERC165Upgradeable.__ERC165_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L27-L28) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L27-L28


 - [ ] ID-173
Function [ContextUpgradeable.__Context_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L21-L22) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L21-L22


 - [ ] ID-174
Function [EIP712Upgradeable._EIP712VersionHash()](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L183-L197) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L183-L197


 - [ ] ID-175
Parameter [WildForestMedal.mint(address,uint256,uint256)._seasonId](contracts/WildForestTokenMedal.sol#L106) is not in mixedCase

contracts/WildForestTokenMedal.sol#L106


 - [ ] ID-176
Parameter [WildForestMedal.initialize(string,string,string,address)._ownerAddress](contracts/WildForestTokenMedal.sol#L35) is not in mixedCase

contracts/WildForestTokenMedal.sol#L35


 - [ ] ID-177
Variable [ERC1155Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L508) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L508


 - [ ] ID-178
Variable [WildForestLockNft._lockedTokens](contracts/WildForestLockNft.sol#L25) is not in mixedCase

contracts/WildForestLockNft.sol#L25


 - [ ] ID-179
Function [IERC20Permit.DOMAIN_SEPARATOR()](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol#L89) is not in mixedCase

node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol#L89


 - [ ] ID-180
Function [AccessControlUpgradeable.__AccessControl_init()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L76-L77) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L76-L77


 - [ ] ID-181
Function [EIP712Upgradeable._EIP712NameHash()](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L162-L176) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L162-L176


 - [ ] ID-182
Function [EIP712Upgradeable._EIP712Version()](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L153-L155) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L153-L155


 - [ ] ID-183
Function [ERC1155Upgradeable.__ERC1155_init(string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L36-L38) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L36-L38


 - [ ] ID-184
Parameter [WildForestMedal.initialize(string,string,string,address)._name](contracts/WildForestTokenMedal.sol#L35) is not in mixedCase

contracts/WildForestTokenMedal.sol#L35


 - [ ] ID-185
Variable [AccessControlEnumerableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L76) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L76


 - [ ] ID-186
Parameter [WildForestMedal.initialize(string,string,string,address)._symbol](contracts/WildForestTokenMedal.sol#L35) is not in mixedCase

contracts/WildForestTokenMedal.sol#L35


 - [ ] ID-187
Variable [ERC165Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L41) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L41


 - [ ] ID-188
Variable [WildForestLockNft._nftContractAddress](contracts/WildForestLockNft.sol#L21) is not in mixedCase

contracts/WildForestLockNft.sol#L21


 - [ ] ID-189
Variable [ERC721EnumerableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L171) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L171


 - [ ] ID-190
Function [AccessControlEnumerableUpgradeable.__AccessControlEnumerable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L22-L23) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L22-L23


 - [ ] ID-191
Variable [ERC721PausableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L53) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L53


 - [ ] ID-192
Function [EIP712Upgradeable._EIP712Name()](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L143-L145) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L143-L145


 - [ ] ID-193
Variable [WildForestMedalStorage._governance](contracts/WildForestTokenMedal.sol#L15) is not in mixedCase

contracts/WildForestTokenMedal.sol#L15


 - [ ] ID-194
Function [ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init(string,string,string,address)](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L44-L46) is not in mixedCase

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L44-L46


 - [ ] ID-195
Function [ERC721Common.__ERC721Common_init_unchained(string,string,string,address)](contracts/sky-mavis-nft/ERC721Common.sol#L14-L16) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L14-L16


 - [ ] ID-196
Parameter [ERC721Common.stateOf(uint256)._tokenId](contracts/sky-mavis-nft/ERC721Common.sol#L21) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L21


 - [ ] ID-197
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._amounts](contracts/WildForestTokenMedal.sol#L117) is not in mixedCase

contracts/WildForestTokenMedal.sol#L117


 - [ ] ID-198
Parameter [WildForestMedal.burn(address,uint256,uint256)._amount](contracts/WildForestTokenMedal.sol#L133) is not in mixedCase

contracts/WildForestTokenMedal.sol#L133


 - [ ] ID-199
Function [ERC721EnumerableUpgradeable.__ERC721Enumerable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L31-L32) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L31-L32


 - [ ] ID-200
Function [PausableUpgradeable.__Pausable_init()](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L34-L36) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L34-L36


 - [ ] ID-201
Function [ContextUpgradeable.__Context_init()](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L18-L19) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L18-L19


 - [ ] ID-202
Variable [WildForestMedalStorage._upgradeV2](contracts/WildForestTokenMedal.sol#L24) is not in mixedCase

contracts/WildForestTokenMedal.sol#L24


 - [ ] ID-203
Function [AccessControlEnumerableUpgradeable.__AccessControlEnumerable_init()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L19-L20) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L19-L20


 - [ ] ID-204
Function [ERC165Upgradeable.__ERC165_init()](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L24-L25) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L24-L25


 - [ ] ID-205
Function [ERC721Upgradeable.__unsafe_increaseBalance(address,uint256)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L468-L470) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L468-L470


 - [ ] ID-206
Parameter [WildForestMedal.burn(address,uint256,uint256)._from](contracts/WildForestTokenMedal.sol#L131) is not in mixedCase

contracts/WildForestTokenMedal.sol#L131


 - [ ] ID-207
Function [EIP712Upgradeable.__EIP712_init_unchained(string,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L63-L70) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L63-L70


 - [ ] ID-208
Parameter [WildForestMedal.mint(address,uint256,uint256)._amount](contracts/WildForestTokenMedal.sol#L107) is not in mixedCase

contracts/WildForestTokenMedal.sol#L107


 - [ ] ID-209
Function [PausableUpgradeable.__Pausable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L38-L40) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L38-L40


 - [ ] ID-210
Function [ERC721Upgradeable.__ERC721_init(string,string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L45-L47) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L45-L47


 - [ ] ID-211
Function [ERC721EnumerableUpgradeable.__ERC721Enumerable_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L28-L29) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L28-L29


INFO:Slither:. analyzed (56 contracts with 94 detectors), 212 result(s) found