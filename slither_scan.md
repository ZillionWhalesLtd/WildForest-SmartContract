# SCAN RESULTS:

Summary
 - [arbitrary-send-erc20](#arbitrary-send-erc20) (1 results) (High)
 - [encode-packed-collision](#encode-packed-collision) (1 results) (High)
 - [incorrect-exp](#incorrect-exp) (2 results) (High)
 - [unchecked-transfer](#unchecked-transfer) (1 results) (High)
 - [uninitialized-state](#uninitialized-state) (1 results) (High)
 - [divide-before-multiply](#divide-before-multiply) (16 results) (Medium)
 - [unused-return](#unused-return) (2 results) (Medium)
 - [shadowing-local](#shadowing-local) (12 results) (Low)
 - [missing-zero-check](#missing-zero-check) (9 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (2 results) (Low)
 - [reentrancy-events](#reentrancy-events) (2 results) (Low)
 - [timestamp](#timestamp) (2 results) (Low)
 - [assembly](#assembly) (15 results) (Informational)
 - [pragma](#pragma) (1 results) (Informational)
 - [costly-loop](#costly-loop) (2 results) (Informational)
 - [dead-code](#dead-code) (1 results) (Informational)
 - [solc-version](#solc-version) (52 results) (Informational)
 - [low-level-calls](#low-level-calls) (4 results) (Informational)
 - [naming-convention](#naming-convention) (67 results) (Informational)
## arbitrary-send-erc20
Impact: High
Confidence: High
 - [ ] ID-0
[WildForestClaimTokenTransfer.userTransfer(WildForestClaimTokenTransfer.TransferData,bytes)](contracts/WildForestClaimTokenTransfer.sol#L86-L92) uses arbitrary from in transferFrom: [tokenContract.transferFrom(transferData.senderAddress,msg.sender,transferData.amount)](contracts/WildForestClaimTokenTransfer.sol#L90)

contracts/WildForestClaimTokenTransfer.sol#L86-L92


## encode-packed-collision
Impact: High
Confidence: High
 - [ ] ID-1
[WildForestClaimNft._validateMintData(WildForestClaimNft.MintData,bytes)](contracts/WildForestClaimNft.sol#L62-L90) calls abi.encodePacked() with multiple dynamic arguments:
  - [encoded = abi.encodePacked(encoded,data.identificators[i])](contracts/WildForestClaimNft.sol#L74)

contracts/WildForestClaimNft.sol#L62-L90


## incorrect-exp
Impact: High
Confidence: Medium
 - [ ] ID-2
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) has bitwise-xor operator ^ instead of the exponentiation operator **:
   - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L116)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-3
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) has bitwise-xor operator ^ instead of the exponentiation operator **:
   - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L116)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


## unchecked-transfer
Impact: High
Confidence: Medium
 - [ ] ID-4
[WildForestClaimTokenTransfer.userTransfer(WildForestClaimTokenTransfer.TransferData,bytes)](contracts/WildForestClaimTokenTransfer.sol#L86-L92) ignores return value by [tokenContract.transferFrom(transferData.senderAddress,msg.sender,transferData.amount)](contracts/WildForestClaimTokenTransfer.sol#L90)

contracts/WildForestClaimTokenTransfer.sol#L86-L92


## uninitialized-state
Impact: High
Confidence: High
 - [ ] ID-5
[ERC721Nonce.nonces](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L16) is never initialized. It is used in:
  - [ERC721Common.stateOf(uint256)](contracts/sky-mavis-nft/ERC721Common.sol#L24-L27)
  - [ERC721Nonce._beforeTokenTransfer(address,address,uint256,uint256)](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L27-L36)

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L16


## divide-before-multiply
Impact: Medium
Confidence: Medium
 - [ ] ID-6
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L121)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-7
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L120)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-8
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L124)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-9
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [prod0 = prod0 / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L104)
  - [result = prod0 * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L131)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-10
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L122)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-11
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L120)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-12
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L125)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-13
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L125)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-14
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L124)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-15
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L123)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-16
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L121)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-17
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L116)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-18
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L122)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-19
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L116)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-20
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [prod0 = prod0 / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L104)
  - [result = prod0 * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L131)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-21
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L123)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


## unused-return
Impact: Medium
Confidence: Medium
 - [ ] ID-22
[AccessControlEnumerableUpgradeable._revokeRole(bytes32,address)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L66-L69) ignores return value by [_roleMembers[role].remove(account)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L68)

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L66-L69


 - [ ] ID-23
[AccessControlEnumerableUpgradeable._grantRole(bytes32,address)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L58-L61) ignores return value by [_roleMembers[role].add(account)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L60)

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L58-L61


## shadowing-local
Impact: Low
Confidence: High
 - [ ] ID-24
[ERC721Common.__ERC721Common_init(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721Common.sol#L13) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L13


 - [ ] ID-25
[ERC721Common.__ERC721Common_init_unchained(string,string,string,address).name](contracts/sky-mavis-nft/ERC721Common.sol#L17) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L17


 - [ ] ID-26
[WildForestToken.constructor(uint256,string,string,address).name](contracts/WildForestToken.sol#L7) shadows:
  - [ERC20.name()](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L62-L64) (function)
  - [IERC20Metadata.name()](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L17) (function)

contracts/WildForestToken.sol#L7


 - [ ] ID-27
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init_unchained(string,string,string,address).name](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64


 - [ ] ID-28
[WildForestNft.initialize(string,string,string,address).symbol](contracts/WildForestNft.sol#L16) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/WildForestNft.sol#L16


 - [ ] ID-29
[ERC721Common.__ERC721Common_init_unchained(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721Common.sol#L17) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L17


 - [ ] ID-30
[ERC721Common.__ERC721Common_init(string,string,string,address).name](contracts/sky-mavis-nft/ERC721Common.sol#L13) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L13


 - [ ] ID-31
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60


 - [ ] ID-32
[WildForestToken.constructor(uint256,string,string,address).symbol](contracts/WildForestToken.sol#L7) shadows:
  - [ERC20.symbol()](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L70-L72) (function)
  - [IERC20Metadata.symbol()](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L22) (function)

contracts/WildForestToken.sol#L7


 - [ ] ID-33
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init(string,string,string,address).name](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60


 - [ ] ID-34
[WildForestNft.initialize(string,string,string,address).name](contracts/WildForestNft.sol#L16) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/WildForestNft.sol#L16


 - [ ] ID-35
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init_unchained(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64


## missing-zero-check
Impact: Low
Confidence: Medium
 - [ ] ID-36
[WildForestClaimNft.initialize(string,address,address,address).signerAddress](contracts/WildForestClaimNft.sol#L50) lacks a zero-check on :
    - [_userMintSigner = signerAddress](contracts/WildForestClaimNft.sol#L52)

contracts/WildForestClaimNft.sol#L50


 - [ ] ID-37
[WildForestClaimTokenTransfer.initialize(string,address,address,address).tokenContractAddress](contracts/WildForestClaimTokenTransfer.sol#L50) lacks a zero-check on :
    - [_tokenContractAddress = tokenContractAddress](contracts/WildForestClaimTokenTransfer.sol#L53)

contracts/WildForestClaimTokenTransfer.sol#L50


 - [ ] ID-38
[WildForestClaimTokenTransfer.setTokenContractAddress(address).tokenContractAddress](contracts/WildForestClaimTokenTransfer.sol#L98) lacks a zero-check on :
    - [_tokenContractAddress = tokenContractAddress](contracts/WildForestClaimTokenTransfer.sol#L99)

contracts/WildForestClaimTokenTransfer.sol#L98


 - [ ] ID-39
[WildForestClaimNft.initialize(string,address,address,address).nftContractAddress](contracts/WildForestClaimNft.sol#L50) lacks a zero-check on :
    - [_nftContractAddress = nftContractAddress](contracts/WildForestClaimNft.sol#L53)

contracts/WildForestClaimNft.sol#L50


 - [ ] ID-40
[WildForestClaimTokenTransfer.initialize(string,address,address,address).signerAddress](contracts/WildForestClaimTokenTransfer.sol#L50) lacks a zero-check on :
    - [_userTransferSigner = signerAddress](contracts/WildForestClaimTokenTransfer.sol#L52)

contracts/WildForestClaimTokenTransfer.sol#L50


 - [ ] ID-41
[WildForestClaimNft.setNftContractAddress(address).nftContractAddress](contracts/WildForestClaimNft.sol#L109) lacks a zero-check on :
    - [_nftContractAddress = nftContractAddress](contracts/WildForestClaimNft.sol#L110)

contracts/WildForestClaimNft.sol#L109


 - [ ] ID-42
[WildForestMedal.initialize(string,string,string,address)._ownerAddress](contracts/WildForestTokenMedal.sol#L31) lacks a zero-check on :
    - [_governance = _ownerAddress](contracts/WildForestTokenMedal.sol#L35)

contracts/WildForestTokenMedal.sol#L31


 - [ ] ID-43
[WildForestClaimNft.setUserMintSigner(address).signerAddress](contracts/WildForestClaimNft.sol#L105) lacks a zero-check on :
    - [_userMintSigner = signerAddress](contracts/WildForestClaimNft.sol#L106)

contracts/WildForestClaimNft.sol#L105


 - [ ] ID-44
[WildForestClaimTokenTransfer.setUserTransferSigner(address).signerAddress](contracts/WildForestClaimTokenTransfer.sol#L94) lacks a zero-check on :
    - [_userTransferSigner = signerAddress](contracts/WildForestClaimTokenTransfer.sol#L95)

contracts/WildForestClaimTokenTransfer.sol#L94


## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-45
Reentrancy in [WildForestMedal.mint(address,uint256,uint256)](contracts/WildForestTokenMedal.sol#L93-L101):
  External calls:
  - [_mint(_to,_seasonId,_amount,)](contracts/WildForestTokenMedal.sol#L99)
    - [response = IERC1155ReceiverUpgradeable(to).onERC1155Received(operator,from,id,amount,data)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L461-L469)
  State variables written after the call(s):
  - [tokenSupply[_seasonId] = tokenSupply[_seasonId] + _amount](contracts/WildForestTokenMedal.sol#L100)

contracts/WildForestTokenMedal.sol#L93-L101


 - [ ] ID-46
Reentrancy in [WildForestMedal.addNewSeason(uint256)](contracts/WildForestTokenMedal.sol#L84-L91):
  External calls:
  - [_mint(msg.sender,seasonNumber,initialSupply,)](contracts/WildForestTokenMedal.sol#L88)
    - [response = IERC1155ReceiverUpgradeable(to).onERC1155Received(operator,from,id,amount,data)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L461-L469)
  State variables written after the call(s):
  - [tokenSupply[seasonNumber] = initialSupply](contracts/WildForestTokenMedal.sol#L89)

contracts/WildForestTokenMedal.sol#L84-L91


## reentrancy-events
Impact: Low
Confidence: Medium
 - [ ] ID-47
Reentrancy in [WildForestClaimNft.userMint(WildForestClaimNft.MintData,bytes)](contracts/WildForestClaimNft.sol#L92-L103):
  External calls:
  - [_tokenIds = nftContract.bulkMint(_recipients)](contracts/WildForestClaimNft.sol#L101)
  Event emitted after the call(s):
  - [UserMint(mintData.walletAddress,_tokenIds,mintData.identificators,mintData.playerId)](contracts/WildForestClaimNft.sol#L102)

contracts/WildForestClaimNft.sol#L92-L103


 - [ ] ID-48
Reentrancy in [WildForestClaimTokenTransfer.userTransfer(WildForestClaimTokenTransfer.TransferData,bytes)](contracts/WildForestClaimTokenTransfer.sol#L86-L92):
  External calls:
  - [tokenContract.transferFrom(transferData.senderAddress,msg.sender,transferData.amount)](contracts/WildForestClaimTokenTransfer.sol#L90)
  Event emitted after the call(s):
  - [UserTransfer(transferData.walletAddress,transferData.senderAddress,transferData.amount,transferData.identificator,transferData.playerId)](contracts/WildForestClaimTokenTransfer.sol#L91)

contracts/WildForestClaimTokenTransfer.sol#L86-L92


## timestamp
Impact: Low
Confidence: Medium
 - [ ] ID-49
[WildForestClaimTokenTransfer._validateTransferData(WildForestClaimTokenTransfer.TransferData,bytes)](contracts/WildForestClaimTokenTransfer.sol#L62-L84) uses timestamp for comparisons
  Dangerous comparisons:
  - [data.deadline < block.timestamp](contracts/WildForestClaimTokenTransfer.sol#L64)

contracts/WildForestClaimTokenTransfer.sol#L62-L84


 - [ ] ID-50
[WildForestClaimNft._validateMintData(WildForestClaimNft.MintData,bytes)](contracts/WildForestClaimNft.sol#L62-L90) uses timestamp for comparisons
  Dangerous comparisons:
  - [data.deadline < block.timestamp](contracts/WildForestClaimNft.sol#L64)

contracts/WildForestClaimNft.sol#L62-L90


## assembly
Impact: Informational
Confidence: High
 - [ ] ID-51
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L62-L66)
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L85-L92)
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L99-L108)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-52
[ECDSAUpgradeable.tryRecover(bytes32,bytes)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L55-L72) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L63-L67)

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L55-L72


 - [ ] ID-53
[ERC721Upgradeable._checkOnERC721Received(address,address,uint256,bytes)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L404-L426) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L418-L420)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L404-L426


 - [ ] ID-54
[ECDSA.tryRecover(bytes32,bytes)](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L55-L72) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L63-L67)

node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L55-L72


 - [ ] ID-55
[AddressUpgradeable._revert(bytes,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L231-L243) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L236-L239)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L231-L243


 - [ ] ID-56
[EnumerableSetUpgradeable.values(EnumerableSetUpgradeable.Bytes32Set)](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L219-L229) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L224-L226)

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L219-L229


 - [ ] ID-57
[ECDSA.toEthSignedMessageHash(bytes32)](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L165-L174) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L169-L173)

node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L165-L174


 - [ ] ID-58
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L62-L66)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L85-L92)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L99-L108)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-59
[EnumerableSetUpgradeable.values(EnumerableSetUpgradeable.AddressSet)](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L293-L303) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L298-L300)

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L293-L303


 - [ ] ID-60
[ECDSAUpgradeable.toEthSignedMessageHash(bytes32)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L165-L174) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L169-L173)

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L165-L174


 - [ ] ID-61
[EnumerableSetUpgradeable.values(EnumerableSetUpgradeable.UintSet)](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L367-L377) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L372-L374)

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L367-L377


 - [ ] ID-62
[Strings.toString(uint256)](node_modules/@openzeppelin/contracts/utils/Strings.sol#L19-L39) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Strings.sol#L25-L27)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Strings.sol#L31-L33)

node_modules/@openzeppelin/contracts/utils/Strings.sol#L19-L39


 - [ ] ID-63
[StringsUpgradeable.toString(uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L19-L39) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L25-L27)
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L31-L33)

node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L19-L39


 - [ ] ID-64
[ECDSAUpgradeable.toTypedDataHash(bytes32,bytes32)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L197-L206) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L199-L205)

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L197-L206


 - [ ] ID-65
[ECDSA.toTypedDataHash(bytes32,bytes32)](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L197-L206) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L199-L205)

node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L197-L206


## pragma
Impact: Informational
Confidence: High
 - [ ] ID-66
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
  - [^0.8.16](contracts/WildForestClaimNft.sol#L2)
  - [^0.8.16](contracts/WildForestClaimTokenTransfer.sol#L2)
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
 - [ ] ID-67
[ERC721Upgradeable._burn(uint256)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325) has costly operations inside a loop:
  - [delete _owners[tokenId]](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L320)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325


 - [ ] ID-68
[ERC721Upgradeable._burn(uint256)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325) has costly operations inside a loop:
  - [delete _tokenApprovals[tokenId]](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L313)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325


## dead-code
Impact: Informational
Confidence: Medium
 - [ ] ID-69
[ERC721Nonce._beforeTokenTransfer(address,address,uint256,uint256)](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L27-L36) is never used and should be removed

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L27-L36


## solc-version
Impact: Informational
Confidence: High
 - [ ] ID-70
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L4


 - [ ] ID-71
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#L4


 - [ ] ID-72
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L4


 - [ ] ID-73
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4


 - [ ] ID-74
solc-0.8.16 is not recommended for deployment

 - [ ] ID-75
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4


 - [ ] ID-76
Pragma version[^0.8.16](contracts/interfaces/ITokenBase.sol#L2) allows old versions

contracts/interfaces/ITokenBase.sol#L2


 - [ ] ID-77
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Context.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Context.sol#L4


 - [ ] ID-78
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol#L4


 - [ ] ID-79
Pragma version[^0.8.16](contracts/WildForestTokenMedal.sol#L2) allows old versions

contracts/WildForestTokenMedal.sol#L2


 - [ ] ID-80
Pragma version[^0.8.16](contracts/WildForestNft.sol#L2) allows old versions

contracts/WildForestNft.sol#L2


 - [ ] ID-81
Pragma version[^0.8.0](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2) allows old versions

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2


 - [ ] ID-82
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Strings.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Strings.sol#L4


 - [ ] ID-83
Pragma version[^0.8.0](contracts/sky-mavis-nft/refs/IERC721State.sol#L2) allows old versions

contracts/sky-mavis-nft/refs/IERC721State.sol#L2


 - [ ] ID-84
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol#L4


 - [ ] ID-85
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L4


 - [ ] ID-86
Pragma version[^0.8.8](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L4) is known to contain severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L4


 - [ ] ID-87
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol#L4


 - [ ] ID-88
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol#L4


 - [ ] ID-89
Pragma version[^0.8.16](contracts/WildForestClaimTokenTransfer.sol#L2) allows old versions

contracts/WildForestClaimTokenTransfer.sol#L2


 - [ ] ID-90
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L4


 - [ ] ID-91
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L4


 - [ ] ID-92
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L4


 - [ ] ID-93
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Counters.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Counters.sol#L4


 - [ ] ID-94
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L4


 - [ ] ID-95
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4


 - [ ] ID-96
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L5) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L5


 - [ ] ID-97
Pragma version[^0.8.16](contracts/interfaces/INFTBase.sol#L2) allows old versions

contracts/interfaces/INFTBase.sol#L2


 - [ ] ID-98
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol#L4


 - [ ] ID-99
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol#L4


 - [ ] ID-100
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4


 - [ ] ID-101
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol#L4


 - [ ] ID-102
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4


 - [ ] ID-103
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L4


 - [ ] ID-104
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC5267Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC5267Upgradeable.sol#L4


 - [ ] ID-105
Pragma version[^0.8.16](contracts/WildForestClaimNft.sol#L2) allows old versions

contracts/WildForestClaimNft.sol#L2


 - [ ] ID-106
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4


 - [ ] ID-107
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol#L4


 - [ ] ID-108
Pragma version[^0.8.16](contracts/WildForestToken.sol#L2) allows old versions

contracts/WildForestToken.sol#L2


 - [ ] ID-109
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol#L4


 - [ ] ID-110
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4


 - [ ] ID-111
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol#L4


 - [ ] ID-112
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L4


 - [ ] ID-113
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L4


 - [ ] ID-114
Pragma version[^0.8.2](node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol#L4


 - [ ] ID-115
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol#L4


 - [ ] ID-116
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4


 - [ ] ID-117
Pragma version[^0.8.0](contracts/sky-mavis-nft/ERC721Common.sol#L2) allows old versions

contracts/sky-mavis-nft/ERC721Common.sol#L2


 - [ ] ID-118
Pragma version[^0.8.1](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L4


 - [ ] ID-119
Pragma version[^0.8.0](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2) allows old versions

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2


 - [ ] ID-120
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L4


 - [ ] ID-121
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L4


## low-level-calls
Impact: Informational
Confidence: High
 - [ ] ID-122
Low level call in [AddressUpgradeable.functionDelegateCall(address,bytes,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L180-L187):
  - [(success,returndata) = target.delegatecall(data)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L185)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L180-L187


 - [ ] ID-123
Low level call in [AddressUpgradeable.functionCallWithValue(address,bytes,uint256,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L128-L137):
  - [(success,returndata) = target.call{value: value}(data)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L135)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L128-L137


 - [ ] ID-124
Low level call in [AddressUpgradeable.functionStaticCall(address,bytes,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L155-L162):
  - [(success,returndata) = target.staticcall(data)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L160)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L155-L162


 - [ ] ID-125
Low level call in [AddressUpgradeable.sendValue(address,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L64-L69):
  - [(success) = recipient.call{value: amount}()](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L67)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L64-L69


## naming-convention
Impact: Informational
Confidence: High
 - [ ] ID-126
Function [ERC1155Upgradeable.__ERC1155_init_unchained(string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L40-L42) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L40-L42


 - [ ] ID-127
Parameter [WildForestMedal.totalSupply(uint256)._id](contracts/WildForestTokenMedal.sol#L74) is not in mixedCase

contracts/WildForestTokenMedal.sol#L74


 - [ ] ID-128
Variable [WildForestClaimNft._mintNonces](contracts/WildForestClaimNft.sol#L43) is not in mixedCase

contracts/WildForestClaimNft.sol#L43


 - [ ] ID-129
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._seasonIds](contracts/WildForestTokenMedal.sol#L135) is not in mixedCase

contracts/WildForestTokenMedal.sol#L135


 - [ ] ID-130
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._from](contracts/WildForestTokenMedal.sol#L134) is not in mixedCase

contracts/WildForestTokenMedal.sol#L134


 - [ ] ID-131
Parameter [WildForestMedal.upgradeSetInitRoles(address)._ownerAddress](contracts/WildForestTokenMedal.sol#L43) is not in mixedCase

contracts/WildForestTokenMedal.sol#L43


 - [ ] ID-132
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._amounts](contracts/WildForestTokenMedal.sol#L136) is not in mixedCase

contracts/WildForestTokenMedal.sol#L136


 - [ ] ID-133
Variable [EIP712Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L204) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L204


 - [ ] ID-134
Function [AccessControlUpgradeable.__AccessControl_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L79-L80) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L79-L80


 - [ ] ID-135
Parameter [WildForestMedal.mint(address,uint256,uint256)._to](contracts/WildForestTokenMedal.sol#L94) is not in mixedCase

contracts/WildForestTokenMedal.sol#L94


 - [ ] ID-136
Function [EIP712Upgradeable.__EIP712_init(string,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L59-L61) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L59-L61


 - [ ] ID-137
Variable [ContextUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L40) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L40


 - [ ] ID-138
Variable [AccessControlUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L260) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L260


 - [ ] ID-139
Variable [ERC721Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L477) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L477


 - [ ] ID-140
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._seasonIds](contracts/WildForestTokenMedal.sol#L105) is not in mixedCase

contracts/WildForestTokenMedal.sol#L105


 - [ ] ID-141
Function [ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init_unchained(string,string,string,address)](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64-L74) is not in mixedCase

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64-L74


 - [ ] ID-142
Function [ERC721BurnableUpgradeable.__ERC721Burnable_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L15-L16) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L15-L16


 - [ ] ID-143
Variable [WildForestClaimTokenTransfer._transferNonces](contracts/WildForestClaimTokenTransfer.sol#L43) is not in mixedCase

contracts/WildForestClaimTokenTransfer.sol#L43


 - [ ] ID-144
Function [ERC721Common.__ERC721Common_init(string,string,string,address)](contracts/sky-mavis-nft/ERC721Common.sol#L13-L15) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L13-L15


 - [ ] ID-145
Parameter [WildForestMedal.uri(uint256)._seasonId](contracts/WildForestTokenMedal.sol#L79) is not in mixedCase

contracts/WildForestTokenMedal.sol#L79


 - [ ] ID-146
Function [ERC721BurnableUpgradeable.__ERC721Burnable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L18-L19) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L18-L19


 - [ ] ID-147
Variable [ERC721BurnableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L38) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L38


 - [ ] ID-148
Function [ERC721Upgradeable.__ERC721_init_unchained(string,string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L49-L52) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L49-L52


 - [ ] ID-149
Parameter [WildForestMedal.burn(address,uint256,uint256)._seasonId](contracts/WildForestTokenMedal.sol#L121) is not in mixedCase

contracts/WildForestTokenMedal.sol#L121


 - [ ] ID-150
Variable [ERC721Nonce.______gap](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L22) is not in mixedCase

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L22


 - [ ] ID-151
Variable [PausableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L116) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L116


 - [ ] ID-152
Parameter [ERC721Common.bulkMint(address[])._recipients](contracts/sky-mavis-nft/ERC721Common.sol#L77) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L77


 - [ ] ID-153
Function [ERC721PausableUpgradeable.__ERC721Pausable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L28-L29) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L28-L29


 - [ ] ID-154
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._to](contracts/WildForestTokenMedal.sol#L104) is not in mixedCase

contracts/WildForestTokenMedal.sol#L104


 - [ ] ID-155
Function [ERC721PausableUpgradeable.__ERC721Pausable_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L24-L26) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L24-L26


 - [ ] ID-156
Function [ERC165Upgradeable.__ERC165_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L27-L28) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L27-L28


 - [ ] ID-157
Function [ContextUpgradeable.__Context_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L21-L22) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L21-L22


 - [ ] ID-158
Function [EIP712Upgradeable._EIP712VersionHash()](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L183-L197) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L183-L197


 - [ ] ID-159
Parameter [WildForestMedal.mint(address,uint256,uint256)._seasonId](contracts/WildForestTokenMedal.sol#L95) is not in mixedCase

contracts/WildForestTokenMedal.sol#L95


 - [ ] ID-160
Parameter [WildForestMedal.initialize(string,string,string,address)._ownerAddress](contracts/WildForestTokenMedal.sol#L31) is not in mixedCase

contracts/WildForestTokenMedal.sol#L31


 - [ ] ID-161
Variable [ERC1155Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L508) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L508


 - [ ] ID-162
Function [AccessControlUpgradeable.__AccessControl_init()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L76-L77) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L76-L77


 - [ ] ID-163
Function [EIP712Upgradeable._EIP712NameHash()](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L162-L176) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L162-L176


 - [ ] ID-164
Function [EIP712Upgradeable._EIP712Version()](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L153-L155) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L153-L155


 - [ ] ID-165
Function [ERC1155Upgradeable.__ERC1155_init(string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L36-L38) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L36-L38


 - [ ] ID-166
Parameter [WildForestMedal.initialize(string,string,string,address)._name](contracts/WildForestTokenMedal.sol#L31) is not in mixedCase

contracts/WildForestTokenMedal.sol#L31


 - [ ] ID-167
Variable [AccessControlEnumerableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L76) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L76


 - [ ] ID-168
Parameter [WildForestMedal.initialize(string,string,string,address)._symbol](contracts/WildForestTokenMedal.sol#L31) is not in mixedCase

contracts/WildForestTokenMedal.sol#L31


 - [ ] ID-169
Variable [ERC165Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L41) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L41


 - [ ] ID-170
Variable [ERC721EnumerableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L171) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L171


 - [ ] ID-171
Function [AccessControlEnumerableUpgradeable.__AccessControlEnumerable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L22-L23) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L22-L23


 - [ ] ID-172
Variable [ERC721PausableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L53) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L53


 - [ ] ID-173
Function [EIP712Upgradeable._EIP712Name()](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L143-L145) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L143-L145


 - [ ] ID-174
Variable [WildForestMedalStorage._governance](contracts/WildForestTokenMedal.sol#L11) is not in mixedCase

contracts/WildForestTokenMedal.sol#L11


 - [ ] ID-175
Function [ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init(string,string,string,address)](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60-L62) is not in mixedCase

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60-L62


 - [ ] ID-176
Function [ERC721Common.__ERC721Common_init_unchained(string,string,string,address)](contracts/sky-mavis-nft/ERC721Common.sol#L17-L19) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L17-L19


 - [ ] ID-177
Parameter [ERC721Common.stateOf(uint256)._tokenId](contracts/sky-mavis-nft/ERC721Common.sol#L24) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L24


 - [ ] ID-178
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._amounts](contracts/WildForestTokenMedal.sol#L106) is not in mixedCase

contracts/WildForestTokenMedal.sol#L106


 - [ ] ID-179
Parameter [WildForestMedal.burn(address,uint256,uint256)._amount](contracts/WildForestTokenMedal.sol#L122) is not in mixedCase

contracts/WildForestTokenMedal.sol#L122


 - [ ] ID-180
Function [ERC721EnumerableUpgradeable.__ERC721Enumerable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L31-L32) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L31-L32


 - [ ] ID-181
Function [PausableUpgradeable.__Pausable_init()](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L34-L36) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L34-L36


 - [ ] ID-182
Function [ContextUpgradeable.__Context_init()](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L18-L19) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L18-L19


 - [ ] ID-183
Variable [WildForestMedalStorage._upgradeV2](contracts/WildForestTokenMedal.sol#L20) is not in mixedCase

contracts/WildForestTokenMedal.sol#L20


 - [ ] ID-184
Function [AccessControlEnumerableUpgradeable.__AccessControlEnumerable_init()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L19-L20) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L19-L20


 - [ ] ID-185
Function [ERC165Upgradeable.__ERC165_init()](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L24-L25) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L24-L25


 - [ ] ID-186
Function [ERC721Upgradeable.__unsafe_increaseBalance(address,uint256)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L468-L470) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L468-L470


 - [ ] ID-187
Parameter [WildForestMedal.burn(address,uint256,uint256)._from](contracts/WildForestTokenMedal.sol#L120) is not in mixedCase

contracts/WildForestTokenMedal.sol#L120


 - [ ] ID-188
Function [EIP712Upgradeable.__EIP712_init_unchained(string,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L63-L70) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol#L63-L70


 - [ ] ID-189
Parameter [WildForestMedal.mint(address,uint256,uint256)._amount](contracts/WildForestTokenMedal.sol#L96) is not in mixedCase

contracts/WildForestTokenMedal.sol#L96


 - [ ] ID-190
Function [PausableUpgradeable.__Pausable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L38-L40) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L38-L40


 - [ ] ID-191
Function [ERC721Upgradeable.__ERC721_init(string,string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L45-L47) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L45-L47


 - [ ] ID-192
Function [ERC721EnumerableUpgradeable.__ERC721Enumerable_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L28-L29) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L28-L29


INFO:Slither:. analyzed (52 contracts with 93 detectors), 193 result(s) found