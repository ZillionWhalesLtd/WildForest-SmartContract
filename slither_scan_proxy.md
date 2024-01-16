Scan was done against contracts which using at the SYSTEM only:

 - `WildForestDefinedTokenUriNft`
 - `WildForestNft`
 - `WildForestToken`
 - `WildForestMedal`
   
Comments:
 - ID-0, ID-1 (incorrect-exp) `Math.sol from openzeppelin` using without modification and over all not using directly at custom logic
 - ID-2 (uninitialized-state) applied for `nonces` mapping and seems its should not, link to the related issue/topic: https://github.com/crytic/slither/issues/456

# SCAN RESULTS:

Summary
 - [incorrect-exp](#incorrect-exp) (2 results) (High)
 - [uninitialized-state](#uninitialized-state) (1 results) (High)
 - [divide-before-multiply](#divide-before-multiply) (16 results) (Medium)
 - [unused-return](#unused-return) (2 results) (Medium)
 - [shadowing-local](#shadowing-local) (14 results) (Low)
 - [missing-zero-check](#missing-zero-check) (1 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (3 results) (Low)
 - [reentrancy-events](#reentrancy-events) (1 results) (Low)
 - [assembly](#assembly) (9 results) (Informational)
 - [pragma](#pragma) (1 results) (Informational)
 - [costly-loop](#costly-loop) (2 results) (Informational)
 - [dead-code](#dead-code) (1 results) (Informational)
 - [solc-version](#solc-version) (47 results) (Informational)
 - [low-level-calls](#low-level-calls) (4 results) (Informational)
 - [naming-convention](#naming-convention) (59 results) (Informational)
## incorrect-exp
Impact: High
Confidence: Medium
 - [ ] ID-0
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) has bitwise-xor operator ^ instead of the exponentiation operator **:
   - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L116)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-1
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) has bitwise-xor operator ^ instead of the exponentiation operator **:
   - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L116)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


## uninitialized-state
Impact: High
Confidence: High
 - [ ] ID-2
[ERC721Nonce.nonces](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L16) is never initialized. It is used in:
  - [ERC721Common.stateOf(uint256)](contracts/sky-mavis-nft/ERC721Common.sol#L24-L27)
  - [ERC721Nonce._beforeTokenTransfer(address,address,uint256,uint256)](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L27-L36)

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L16


## divide-before-multiply
Impact: Medium
Confidence: Medium
 - [ ] ID-3
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L121)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-4
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L120)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-5
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L124)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-6
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [prod0 = prod0 / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L104)
  - [result = prod0 * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L131)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-7
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L122)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-8
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L120)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-9
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L125)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-10
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L125)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-11
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L124)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-12
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L123)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-13
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L121)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-14
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L116)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-15
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L122)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-16
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L116)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-17
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [prod0 = prod0 / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L104)
  - [result = prod0 * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L131)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-18
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L123)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


## unused-return
Impact: Medium
Confidence: Medium
 - [ ] ID-19
[AccessControlEnumerableUpgradeable._revokeRole(bytes32,address)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L66-L69) ignores return value by [_roleMembers[role].remove(account)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L68)

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L66-L69


 - [ ] ID-20
[AccessControlEnumerableUpgradeable._grantRole(bytes32,address)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L58-L61) ignores return value by [_roleMembers[role].add(account)](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L60)

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L58-L61


## shadowing-local
Impact: Low
Confidence: High
 - [ ] ID-21
[ERC721Common.__ERC721Common_init(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721Common.sol#L13) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L13


 - [ ] ID-22
[ERC721Common.__ERC721Common_init_unchained(string,string,string,address).name](contracts/sky-mavis-nft/ERC721Common.sol#L17) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L17


 - [ ] ID-23
[WildForestToken.constructor(uint256,string,string,address).name](contracts/WildForestToken.sol#L7) shadows:
  - [ERC20.name()](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L62-L64) (function)
  - [IERC20Metadata.name()](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L17) (function)

contracts/WildForestToken.sol#L7


 - [ ] ID-24
[WildForestDefinedTokenUriNft.initialize(string,string,address).symbol](contracts/WildForestDefinedTokenUriNft.sol#L33) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/WildForestDefinedTokenUriNft.sol#L33


 - [ ] ID-25
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init_unchained(string,string,string,address).name](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64


 - [ ] ID-26
[WildForestNft.initialize(string,string,string,address).symbol](contracts/WildForestNft.sol#L16) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/WildForestNft.sol#L16


 - [ ] ID-27
[ERC721Common.__ERC721Common_init_unchained(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721Common.sol#L17) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L17


 - [ ] ID-28
[WildForestDefinedTokenUriNft.initialize(string,string,address).name](contracts/WildForestDefinedTokenUriNft.sol#L33) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/WildForestDefinedTokenUriNft.sol#L33


 - [ ] ID-29
[ERC721Common.__ERC721Common_init(string,string,string,address).name](contracts/sky-mavis-nft/ERC721Common.sol#L13) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L13


 - [ ] ID-30
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60


 - [ ] ID-31
[WildForestToken.constructor(uint256,string,string,address).symbol](contracts/WildForestToken.sol#L7) shadows:
  - [ERC20.symbol()](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L70-L72) (function)
  - [IERC20Metadata.symbol()](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L22) (function)

contracts/WildForestToken.sol#L7


 - [ ] ID-32
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init(string,string,string,address).name](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60


 - [ ] ID-33
[WildForestNft.initialize(string,string,string,address).name](contracts/WildForestNft.sol#L16) shadows:
  - [ERC721Upgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L84-L86) (function)
  - [IERC721MetadataUpgradeable.name()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L16) (function)

contracts/WildForestNft.sol#L16


 - [ ] ID-34
[ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init_unchained(string,string,string,address).symbol](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64) shadows:
  - [ERC721Upgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L91-L93) (function)
  - [IERC721MetadataUpgradeable.symbol()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L21) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64


## missing-zero-check
Impact: Low
Confidence: Medium
 - [ ] ID-35
[WildForestMedal.initialize(string,string,string,address)._ownerAddress](contracts/WildForestTokenMedal.sol#L27) lacks a zero-check on :
    - [_governance = _ownerAddress](contracts/WildForestTokenMedal.sol#L31)

contracts/WildForestTokenMedal.sol#L27


## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-36
Reentrancy in [WildForestMedal.mint(address,uint256,uint256)](contracts/WildForestTokenMedal.sol#L69-L77):
  External calls:
  - [_mint(_to,_seasonId,_amount,)](contracts/WildForestTokenMedal.sol#L75)
    - [response = IERC1155ReceiverUpgradeable(to).onERC1155Received(operator,from,id,amount,data)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L461-L469)
  State variables written after the call(s):
  - [tokenSupply[_seasonId] = tokenSupply[_seasonId] + _amount](contracts/WildForestTokenMedal.sol#L76)

contracts/WildForestTokenMedal.sol#L69-L77


 - [ ] ID-37
Reentrancy in [WildForestDefinedTokenUriNft._mintFor(address,string)](contracts/WildForestDefinedTokenUriNft.sol#L100-L108):
  External calls:
  - [_safeMint(to,_tokenId)](contracts/WildForestDefinedTokenUriNft.sol#L104)
    - [retval = IERC721ReceiverUpgradeable(to).onERC721Received(_msgSender(),from,tokenId,data)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L411-L422)
  State variables written after the call(s):
  - [_setTokenURI(_tokenId,_tokenURI)](contracts/WildForestDefinedTokenUriNft.sol#L106)
    - [_tokenURIs[tokenId] = _tokenURI](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L63)

contracts/WildForestDefinedTokenUriNft.sol#L100-L108


 - [ ] ID-38
Reentrancy in [WildForestMedal.addNewSeason(uint256)](contracts/WildForestTokenMedal.sol#L60-L67):
  External calls:
  - [_mint(msg.sender,seasonNumber,initialSupply,)](contracts/WildForestTokenMedal.sol#L64)
    - [response = IERC1155ReceiverUpgradeable(to).onERC1155Received(operator,from,id,amount,data)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L461-L469)
  State variables written after the call(s):
  - [tokenSupply[seasonNumber] = initialSupply](contracts/WildForestTokenMedal.sol#L65)

contracts/WildForestTokenMedal.sol#L60-L67


## reentrancy-events
Impact: Low
Confidence: Medium
 - [ ] ID-39
Reentrancy in [WildForestDefinedTokenUriNft._mintFor(address,string)](contracts/WildForestDefinedTokenUriNft.sol#L100-L108):
  External calls:
  - [_safeMint(to,_tokenId)](contracts/WildForestDefinedTokenUriNft.sol#L104)
    - [retval = IERC721ReceiverUpgradeable(to).onERC721Received(_msgSender(),from,tokenId,data)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L411-L422)
  Event emitted after the call(s):
  - [MetadataUpdate(tokenId)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L65)
    - [_setTokenURI(_tokenId,_tokenURI)](contracts/WildForestDefinedTokenUriNft.sol#L106)

contracts/WildForestDefinedTokenUriNft.sol#L100-L108


## assembly
Impact: Informational
Confidence: High
 - [ ] ID-40
[MathUpgradeable.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L62-L66)
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L85-L92)
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L99-L108)

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L55-L134


 - [ ] ID-41
[ERC721Upgradeable._checkOnERC721Received(address,address,uint256,bytes)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L404-L426) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L418-L420)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L404-L426


 - [ ] ID-42
[AddressUpgradeable._revert(bytes,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L231-L243) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L236-L239)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L231-L243


 - [ ] ID-43
[EnumerableSetUpgradeable.values(EnumerableSetUpgradeable.Bytes32Set)](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L219-L229) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L224-L226)

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L219-L229


 - [ ] ID-44
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L62-L66)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L85-L92)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L99-L108)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-45
[EnumerableSetUpgradeable.values(EnumerableSetUpgradeable.AddressSet)](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L293-L303) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L298-L300)

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L293-L303


 - [ ] ID-46
[EnumerableSetUpgradeable.values(EnumerableSetUpgradeable.UintSet)](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L367-L377) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L372-L374)

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L367-L377


 - [ ] ID-47
[Strings.toString(uint256)](node_modules/@openzeppelin/contracts/utils/Strings.sol#L19-L39) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Strings.sol#L25-L27)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Strings.sol#L31-L33)

node_modules/@openzeppelin/contracts/utils/Strings.sol#L19-L39


 - [ ] ID-48
[StringsUpgradeable.toString(uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L19-L39) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L25-L27)
  - [INLINE ASM](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L31-L33)

node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L19-L39


## pragma
Impact: Informational
Confidence: High
 - [ ] ID-49
Different versions of Solidity are used:
  - Version used: ['^0.8.0', '^0.8.1', '^0.8.16', '^0.8.2']
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC165Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC4906Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721Upgradeable.sol#L4)
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
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L5)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/Context.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/Counters.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/Strings.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4)
  - [^0.8.0](contracts/sky-mavis-nft/ERC721Common.sol#L2)
  - [^0.8.0](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2)
  - [^0.8.0](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2)
  - [^0.8.0](contracts/sky-mavis-nft/refs/IERC721State.sol#L2)
  - [^0.8.1](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L4)
  - [^0.8.16](contracts/WildForestDefinedTokenUriNft.sol#L2)
  - [^0.8.16](contracts/WildForestNft.sol#L2)
  - [^0.8.16](contracts/WildForestToken.sol#L2)
  - [^0.8.16](contracts/WildForestTokenMedal.sol#L2)
  - [^0.8.2](node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol#L4)

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4


## costly-loop
Impact: Informational
Confidence: Medium
 - [ ] ID-50
[ERC721Upgradeable._burn(uint256)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325) has costly operations inside a loop:
  - [delete _owners[tokenId]](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L320)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325


 - [ ] ID-51
[ERC721Upgradeable._burn(uint256)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325) has costly operations inside a loop:
  - [delete _tokenApprovals[tokenId]](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L313)

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L304-L325


## dead-code
Impact: Informational
Confidence: Medium
 - [ ] ID-52
[ERC721Nonce._beforeTokenTransfer(address,address,uint256,uint256)](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L27-L36) is never used and should be removed

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L27-L36


## solc-version
Impact: Informational
Confidence: High
 - [ ] ID-53
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L4


 - [ ] ID-54
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L4


 - [ ] ID-55
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4


 - [ ] ID-56
solc-0.8.16 is not recommended for deployment

 - [ ] ID-57
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4


 - [ ] ID-58
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Context.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Context.sol#L4


 - [ ] ID-59
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol#L4


 - [ ] ID-60
Pragma version[^0.8.16](contracts/WildForestTokenMedal.sol#L2) allows old versions

contracts/WildForestTokenMedal.sol#L2


 - [ ] ID-61
Pragma version[^0.8.16](contracts/WildForestNft.sol#L2) allows old versions

contracts/WildForestNft.sol#L2


 - [ ] ID-62
Pragma version[^0.8.0](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2) allows old versions

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2


 - [ ] ID-63
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Strings.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Strings.sol#L4


 - [ ] ID-64
Pragma version[^0.8.0](contracts/sky-mavis-nft/refs/IERC721State.sol#L2) allows old versions

contracts/sky-mavis-nft/refs/IERC721State.sol#L2


 - [ ] ID-65
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC165Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC165Upgradeable.sol#L4


 - [ ] ID-66
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol#L4


 - [ ] ID-67
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L4


 - [ ] ID-68
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC4906Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC4906Upgradeable.sol#L4


 - [ ] ID-69
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol#L4


 - [ ] ID-70
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol#L4


 - [ ] ID-71
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L4


 - [ ] ID-72
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol#L4


 - [ ] ID-73
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol#L4


 - [ ] ID-74
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Counters.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Counters.sol#L4


 - [ ] ID-75
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721Upgradeable.sol#L4


 - [ ] ID-76
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L4


 - [ ] ID-77
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4


 - [ ] ID-78
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L5) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol#L5


 - [ ] ID-79
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol#L4


 - [ ] ID-80
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol#L4


 - [ ] ID-81
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4


 - [ ] ID-82
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol#L4


 - [ ] ID-83
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4


 - [ ] ID-84
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L4


 - [ ] ID-85
Pragma version[^0.8.16](contracts/WildForestDefinedTokenUriNft.sol#L2) allows old versions

contracts/WildForestDefinedTokenUriNft.sol#L2


 - [ ] ID-86
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol#L4


 - [ ] ID-87
Pragma version[^0.8.16](contracts/WildForestToken.sol#L2) allows old versions

contracts/WildForestToken.sol#L2


 - [ ] ID-88
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L4


 - [ ] ID-89
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol#L4


 - [ ] ID-90
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L4


 - [ ] ID-91
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol#L4


 - [ ] ID-92
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L4


 - [ ] ID-93
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L4


 - [ ] ID-94
Pragma version[^0.8.2](node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol#L4


 - [ ] ID-95
Pragma version[^0.8.0](contracts/sky-mavis-nft/ERC721Common.sol#L2) allows old versions

contracts/sky-mavis-nft/ERC721Common.sol#L2


 - [ ] ID-96
Pragma version[^0.8.1](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L4


 - [ ] ID-97
Pragma version[^0.8.0](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2) allows old versions

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2


 - [ ] ID-98
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L4


 - [ ] ID-99
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol#L4


## low-level-calls
Impact: Informational
Confidence: High
 - [ ] ID-100
Low level call in [AddressUpgradeable.functionDelegateCall(address,bytes,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L180-L187):
  - [(success,returndata) = target.delegatecall(data)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L185)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L180-L187


 - [ ] ID-101
Low level call in [AddressUpgradeable.functionCallWithValue(address,bytes,uint256,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L128-L137):
  - [(success,returndata) = target.call{value: value}(data)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L135)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L128-L137


 - [ ] ID-102
Low level call in [AddressUpgradeable.functionStaticCall(address,bytes,string)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L155-L162):
  - [(success,returndata) = target.staticcall(data)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L160)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L155-L162


 - [ ] ID-103
Low level call in [AddressUpgradeable.sendValue(address,uint256)](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L64-L69):
  - [(success) = recipient.call{value: amount}()](node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L67)

node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol#L64-L69


## naming-convention
Impact: Informational
Confidence: High
 - [ ] ID-104
Variable [ERC721URIStorageUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L86) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L86


 - [ ] ID-105
Function [ERC1155Upgradeable.__ERC1155_init_unchained(string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L40-L42) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L40-L42


 - [ ] ID-106
Parameter [WildForestMedal.totalSupply(uint256)._id](contracts/WildForestTokenMedal.sol#L50) is not in mixedCase

contracts/WildForestTokenMedal.sol#L50


 - [ ] ID-107
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._seasonIds](contracts/WildForestTokenMedal.sol#L111) is not in mixedCase

contracts/WildForestTokenMedal.sol#L111


 - [ ] ID-108
Function [ERC721URIStorageUpgradeable.__ERC721URIStorage_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L22-L23) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L22-L23


 - [ ] ID-109
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._from](contracts/WildForestTokenMedal.sol#L110) is not in mixedCase

contracts/WildForestTokenMedal.sol#L110


 - [ ] ID-110
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._amounts](contracts/WildForestTokenMedal.sol#L112) is not in mixedCase

contracts/WildForestTokenMedal.sol#L112


 - [ ] ID-111
Function [AccessControlUpgradeable.__AccessControl_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L79-L80) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L79-L80


 - [ ] ID-112
Parameter [WildForestMedal.mint(address,uint256,uint256)._to](contracts/WildForestTokenMedal.sol#L70) is not in mixedCase

contracts/WildForestTokenMedal.sol#L70


 - [ ] ID-113
Variable [ContextUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L40) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L40


 - [ ] ID-114
Variable [AccessControlUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L260) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L260


 - [ ] ID-115
Variable [ERC721Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L477) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L477


 - [ ] ID-116
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._seasonIds](contracts/WildForestTokenMedal.sol#L81) is not in mixedCase

contracts/WildForestTokenMedal.sol#L81


 - [ ] ID-117
Function [ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init_unchained(string,string,string,address)](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64-L74) is not in mixedCase

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L64-L74


 - [ ] ID-118
Function [ERC721BurnableUpgradeable.__ERC721Burnable_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L15-L16) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L15-L16


 - [ ] ID-119
Function [ERC721Common.__ERC721Common_init(string,string,string,address)](contracts/sky-mavis-nft/ERC721Common.sol#L13-L15) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L13-L15


 - [ ] ID-120
Parameter [WildForestMedal.uri(uint256)._seasonId](contracts/WildForestTokenMedal.sol#L55) is not in mixedCase

contracts/WildForestTokenMedal.sol#L55


 - [ ] ID-121
Function [ERC721BurnableUpgradeable.__ERC721Burnable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L18-L19) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L18-L19


 - [ ] ID-122
Variable [ERC721BurnableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L38) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol#L38


 - [ ] ID-123
Function [ERC721Upgradeable.__ERC721_init_unchained(string,string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L49-L52) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L49-L52


 - [ ] ID-124
Parameter [WildForestMedal.burn(address,uint256,uint256)._seasonId](contracts/WildForestTokenMedal.sol#L97) is not in mixedCase

contracts/WildForestTokenMedal.sol#L97


 - [ ] ID-125
Variable [ERC721Nonce.______gap](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L22) is not in mixedCase

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L22


 - [ ] ID-126
Variable [PausableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L116) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L116


 - [ ] ID-127
Parameter [ERC721Common.bulkMint(address[])._recipients](contracts/sky-mavis-nft/ERC721Common.sol#L77) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L77


 - [ ] ID-128
Function [ERC721PausableUpgradeable.__ERC721Pausable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L28-L29) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L28-L29


 - [ ] ID-129
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._to](contracts/WildForestTokenMedal.sol#L80) is not in mixedCase

contracts/WildForestTokenMedal.sol#L80


 - [ ] ID-130
Function [ERC721PausableUpgradeable.__ERC721Pausable_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L24-L26) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L24-L26


 - [ ] ID-131
Function [ERC165Upgradeable.__ERC165_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L27-L28) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L27-L28


 - [ ] ID-132
Function [ContextUpgradeable.__Context_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L21-L22) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L21-L22


 - [ ] ID-133
Parameter [WildForestDefinedTokenUriNft.mint(address,string)._tokenUri](contracts/WildForestDefinedTokenUriNft.sol#L44) is not in mixedCase

contracts/WildForestDefinedTokenUriNft.sol#L44


 - [ ] ID-134
Parameter [WildForestMedal.mint(address,uint256,uint256)._seasonId](contracts/WildForestTokenMedal.sol#L71) is not in mixedCase

contracts/WildForestTokenMedal.sol#L71


 - [ ] ID-135
Parameter [WildForestMedal.initialize(string,string,string,address)._ownerAddress](contracts/WildForestTokenMedal.sol#L27) is not in mixedCase

contracts/WildForestTokenMedal.sol#L27


 - [ ] ID-136
Variable [ERC1155Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L508) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L508


 - [ ] ID-137
Function [AccessControlUpgradeable.__AccessControl_init()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L76-L77) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol#L76-L77


 - [ ] ID-138
Function [ERC721URIStorageUpgradeable.__ERC721URIStorage_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L19-L20) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol#L19-L20


 - [ ] ID-139
Function [ERC1155Upgradeable.__ERC1155_init(string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L36-L38) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol#L36-L38


 - [ ] ID-140
Parameter [WildForestMedal.initialize(string,string,string,address)._name](contracts/WildForestTokenMedal.sol#L27) is not in mixedCase

contracts/WildForestTokenMedal.sol#L27


 - [ ] ID-141
Variable [AccessControlEnumerableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L76) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L76


 - [ ] ID-142
Parameter [WildForestMedal.initialize(string,string,string,address)._symbol](contracts/WildForestTokenMedal.sol#L27) is not in mixedCase

contracts/WildForestTokenMedal.sol#L27


 - [ ] ID-143
Variable [ERC165Upgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L41) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L41


 - [ ] ID-144
Variable [ERC721EnumerableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L171) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L171


 - [ ] ID-145
Function [AccessControlEnumerableUpgradeable.__AccessControlEnumerable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L22-L23) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L22-L23


 - [ ] ID-146
Variable [ERC721PausableUpgradeable.__gap](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L53) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol#L53


 - [ ] ID-147
Function [ERC721PresetMinterPauserAutoIdCustomized.__ERC721PresetMinterPauserAutoIdCustomized_init(string,string,string,address)](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60-L62) is not in mixedCase

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L60-L62


 - [ ] ID-148
Function [ERC721Common.__ERC721Common_init_unchained(string,string,string,address)](contracts/sky-mavis-nft/ERC721Common.sol#L17-L19) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L17-L19


 - [ ] ID-149
Parameter [ERC721Common.stateOf(uint256)._tokenId](contracts/sky-mavis-nft/ERC721Common.sol#L24) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L24


 - [ ] ID-150
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._amounts](contracts/WildForestTokenMedal.sol#L82) is not in mixedCase

contracts/WildForestTokenMedal.sol#L82


 - [ ] ID-151
Parameter [WildForestMedal.burn(address,uint256,uint256)._amount](contracts/WildForestTokenMedal.sol#L98) is not in mixedCase

contracts/WildForestTokenMedal.sol#L98


 - [ ] ID-152
Function [ERC721EnumerableUpgradeable.__ERC721Enumerable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L31-L32) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L31-L32


 - [ ] ID-153
Function [PausableUpgradeable.__Pausable_init()](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L34-L36) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L34-L36


 - [ ] ID-154
Function [ContextUpgradeable.__Context_init()](node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L18-L19) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol#L18-L19


 - [ ] ID-155
Function [AccessControlEnumerableUpgradeable.__AccessControlEnumerable_init()](node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L19-L20) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol#L19-L20


 - [ ] ID-156
Function [ERC165Upgradeable.__ERC165_init()](node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L24-L25) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol#L24-L25


 - [ ] ID-157
Function [ERC721Upgradeable.__unsafe_increaseBalance(address,uint256)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L468-L470) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L468-L470


 - [ ] ID-158
Parameter [WildForestMedal.burn(address,uint256,uint256)._from](contracts/WildForestTokenMedal.sol#L96) is not in mixedCase

contracts/WildForestTokenMedal.sol#L96


 - [ ] ID-159
Parameter [WildForestMedal.mint(address,uint256,uint256)._amount](contracts/WildForestTokenMedal.sol#L72) is not in mixedCase

contracts/WildForestTokenMedal.sol#L72


 - [ ] ID-160
Function [PausableUpgradeable.__Pausable_init_unchained()](node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L38-L40) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol#L38-L40


 - [ ] ID-161
Function [ERC721Upgradeable.__ERC721_init(string,string)](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L45-L47) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol#L45-L47


 - [ ] ID-162
Function [ERC721EnumerableUpgradeable.__ERC721Enumerable_init()](node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L28-L29) is not in mixedCase

node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol#L28-L29
