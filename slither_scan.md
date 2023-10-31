Scan was done against contracts which using at the SYSTEM only:

 - `WildForestDefinedTokenUriNft`
 - `WildForestNft`
 - `WildForestToken`
 - `WildForestMedal`
   
Comments:
 - ID-0 (incorrect-exp) `Math.sol from openzeppelin` using without modification and over all not using directly at custom logic
 - ID-1 (uninitialized-state) applied for `nonces` mapping and seems its should not, link to the related issue/topic: https://github.com/crytic/slither/issues/456

# SCAN RESULTS:

Summary
 - [incorrect-exp](#incorrect-exp) (1 results) (High)
 - [uninitialized-state](#uninitialized-state) (1 results) (High)
 - [divide-before-multiply](#divide-before-multiply) (8 results) (Medium)
 - [unused-return](#unused-return) (2 results) (Medium)
 - [shadowing-local](#shadowing-local) (10 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (3 results) (Low)
 - [reentrancy-events](#reentrancy-events) (1 results) (Low)
 - [assembly](#assembly) (7 results) (Informational)
 - [pragma](#pragma) (1 results) (Informational)
 - [costly-loop](#costly-loop) (2 results) (Informational)
 - [dead-code](#dead-code) (1 results) (Informational)
 - [solc-version](#solc-version) (42 results) (Informational)
 - [low-level-calls](#low-level-calls) (4 results) (Informational)
 - [naming-convention](#naming-convention) (19 results) (Informational)
 - [immutable-states](#immutable-states) (1 results) (Optimization)
## incorrect-exp
Impact: High
Confidence: Medium
 - [ ] ID-0
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) has bitwise-xor operator ^ instead of the exponentiation operator **:
   - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L116)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


## uninitialized-state
Impact: High
Confidence: High
 - [ ] ID-1
[ERC721Nonce.nonces](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L15) is never initialized. It is used in:
  - [ERC721Common.stateOf(uint256)](contracts/sky-mavis-nft/ERC721Common.sol#L16-L19)
  - [ERC721Nonce._beforeTokenTransfer(address,address,uint256,uint256)](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L26-L35)

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L15


## divide-before-multiply
Impact: Medium
Confidence: Medium
 - [ ] ID-2
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L120)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-3
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [prod0 = prod0 / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L104)
  - [result = prod0 * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L131)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-4
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L122)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-5
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L125)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-6
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L124)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-7
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L123)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-8
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse *= 2 - denominator * inverse](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L121)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-9
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) performs a multiplication on the result of a division:
  - [denominator = denominator / twos](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L101)
  - [inverse = (3 * denominator) ^ 2](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L116)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


## unused-return
Impact: Medium
Confidence: Medium
 - [ ] ID-10
[AccessControlEnumerable._grantRole(bytes32,address)](node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol#L52-L55) ignores return value by [_roleMembers[role].add(account)](node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol#L54)

node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol#L52-L55


 - [ ] ID-11
[AccessControlEnumerable._revokeRole(bytes32,address)](node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol#L60-L63) ignores return value by [_roleMembers[role].remove(account)](node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol#L62)

node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol#L60-L63


## shadowing-local
Impact: Low
Confidence: High
 - [ ] ID-12
[WildForestToken.constructor(uint256,string,string).symbol](contracts/WildForestToken.sol#L7) shadows:
  - [ERC20.symbol()](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L70-L72) (function)
  - [IERC20Metadata.symbol()](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L22) (function)

contracts/WildForestToken.sol#L7


 - [ ] ID-13
[WildForestNft.constructor(string,string,string).name](contracts/WildForestNft.sol#L7) shadows:
  - [ERC721.name()](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L79-L81) (function)
  - [IERC721Metadata.name()](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L16) (function)

contracts/WildForestNft.sol#L7


 - [ ] ID-14
[WildForestToken.constructor(uint256,string,string).name](contracts/WildForestToken.sol#L7) shadows:
  - [ERC20.name()](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L62-L64) (function)
  - [IERC20Metadata.name()](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L17) (function)

contracts/WildForestToken.sol#L7


 - [ ] ID-15
[ERC721Common.constructor(string,string,string).name](contracts/sky-mavis-nft/ERC721Common.sol#L9) shadows:
  - [ERC721.name()](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L79-L81) (function)
  - [IERC721Metadata.name()](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L16) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L9


 - [ ] ID-16
[WildForestDefinedTokenUriNft.constructor(string,string).name](contracts/WildForestDefinedTokenUriNft.sol#L28) shadows:
  - [ERC721.name()](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L79-L81) (function)
  - [IERC721Metadata.name()](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L16) (function)

contracts/WildForestDefinedTokenUriNft.sol#L28


 - [ ] ID-17
[ERC721Common.constructor(string,string,string).symbol](contracts/sky-mavis-nft/ERC721Common.sol#L9) shadows:
  - [ERC721.symbol()](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L86-L88) (function)
  - [IERC721Metadata.symbol()](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L21) (function)

contracts/sky-mavis-nft/ERC721Common.sol#L9


 - [ ] ID-18
[WildForestNft.constructor(string,string,string).symbol](contracts/WildForestNft.sol#L7) shadows:
  - [ERC721.symbol()](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L86-L88) (function)
  - [IERC721Metadata.symbol()](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L21) (function)

contracts/WildForestNft.sol#L7


 - [ ] ID-19
[WildForestDefinedTokenUriNft.constructor(string,string).symbol](contracts/WildForestDefinedTokenUriNft.sol#L28) shadows:
  - [ERC721.symbol()](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L86-L88) (function)
  - [IERC721Metadata.symbol()](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L21) (function)

contracts/WildForestDefinedTokenUriNft.sol#L28


 - [ ] ID-20
[ERC721PresetMinterPauserAutoIdCustomized.constructor(string,string,string).name](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L40) shadows:
  - [ERC721.name()](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L79-L81) (function)
  - [IERC721Metadata.name()](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L16) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L40


 - [ ] ID-21
[ERC721PresetMinterPauserAutoIdCustomized.constructor(string,string,string).symbol](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L40) shadows:
  - [ERC721.symbol()](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L86-L88) (function)
  - [IERC721Metadata.symbol()](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L21) (function)

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L40


## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-22
Reentrancy in [WildForestDefinedTokenUriNft._mintFor(address,string)](contracts/WildForestDefinedTokenUriNft.sol#L93-L101):
  External calls:
  - [_safeMint(to,_tokenId)](contracts/WildForestDefinedTokenUriNft.sol#L97)
    - [retval = IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data)](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L406-L417)
  State variables written after the call(s):
  - [_setTokenURI(_tokenId,_tokenURI)](contracts/WildForestDefinedTokenUriNft.sol#L99)
    - [_tokenURIs[tokenId] = _tokenURI](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#L57)

contracts/WildForestDefinedTokenUriNft.sol#L93-L101


 - [ ] ID-23
Reentrancy in [WildForestMedal.addNewSeason(uint256)](contracts/WildForestTokenMedal.sol#L54-L61):
  External calls:
  - [_mint(msg.sender,seasonNumber,initialSupply,)](contracts/WildForestTokenMedal.sol#L58)
    - [response = IERC1155Receiver(to).onERC1155Received(operator,from,id,amount,data)](node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#L456-L464)
  State variables written after the call(s):
  - [tokenSupply[seasonNumber] = initialSupply](contracts/WildForestTokenMedal.sol#L59)

contracts/WildForestTokenMedal.sol#L54-L61


 - [ ] ID-24
Reentrancy in [WildForestMedal.mint(address,uint256,uint256)](contracts/WildForestTokenMedal.sol#L63-L71):
  External calls:
  - [_mint(_to,_seasonId,_amount,)](contracts/WildForestTokenMedal.sol#L69)
    - [response = IERC1155Receiver(to).onERC1155Received(operator,from,id,amount,data)](node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#L456-L464)
  State variables written after the call(s):
  - [tokenSupply[_seasonId] = tokenSupply[_seasonId] + _amount](contracts/WildForestTokenMedal.sol#L70)

contracts/WildForestTokenMedal.sol#L63-L71


## reentrancy-events
Impact: Low
Confidence: Medium
 - [ ] ID-25
Reentrancy in [WildForestDefinedTokenUriNft._mintFor(address,string)](contracts/WildForestDefinedTokenUriNft.sol#L93-L101):
  External calls:
  - [_safeMint(to,_tokenId)](contracts/WildForestDefinedTokenUriNft.sol#L97)
    - [retval = IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data)](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L406-L417)
  Event emitted after the call(s):
  - [MetadataUpdate(tokenId)](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#L59)
    - [_setTokenURI(_tokenId,_tokenURI)](contracts/WildForestDefinedTokenUriNft.sol#L99)

contracts/WildForestDefinedTokenUriNft.sol#L93-L101


## assembly
Impact: Informational
Confidence: High
 - [ ] ID-26
[ERC721._checkOnERC721Received(address,address,uint256,bytes)](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L399-L421) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L413-L415)

node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L399-L421


 - [ ] ID-27
[EnumerableSet.values(EnumerableSet.UintSet)](node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L367-L377) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L372-L374)

node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L367-L377


 - [ ] ID-28
[EnumerableSet.values(EnumerableSet.Bytes32Set)](node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L219-L229) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L224-L226)

node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L219-L229


 - [ ] ID-29
[Math.mulDiv(uint256,uint256,uint256)](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L62-L66)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L85-L92)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L99-L108)

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L55-L134


 - [ ] ID-30
[Strings.toString(uint256)](node_modules/@openzeppelin/contracts/utils/Strings.sol#L19-L39) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Strings.sol#L25-L27)
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Strings.sol#L31-L33)

node_modules/@openzeppelin/contracts/utils/Strings.sol#L19-L39


 - [ ] ID-31
[Address._revert(bytes,string)](node_modules/@openzeppelin/contracts/utils/Address.sol#L231-L243) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/Address.sol#L236-L239)

node_modules/@openzeppelin/contracts/utils/Address.sol#L231-L243


 - [ ] ID-32
[EnumerableSet.values(EnumerableSet.AddressSet)](node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L293-L303) uses assembly
  - [INLINE ASM](node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L298-L300)

node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L293-L303


## pragma
Impact: Informational
Confidence: High
 - [ ] ID-33
Different versions of Solidity are used:
  - Version used: ['^0.8.0', '^0.8.1', '^0.8.16']
  - [^0.8.0](node_modules/@openzeppelin/contracts/access/AccessControl.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/access/IAccessControl.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/access/IAccessControlEnumerable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/interfaces/IERC165.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/interfaces/IERC4906.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/interfaces/IERC721.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/security/Pausable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/Context.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/Counters.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/Strings.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4)
  - [^0.8.0](node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L5)
  - [^0.8.0](contracts/sky-mavis-nft/ERC721Common.sol#L2)
  - [^0.8.0](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2)
  - [^0.8.0](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2)
  - [^0.8.0](contracts/sky-mavis-nft/refs/IERC721State.sol#L2)
  - [^0.8.1](node_modules/@openzeppelin/contracts/utils/Address.sol#L4)
  - [^0.8.16](contracts/WildForestDefinedTokenUriNft.sol#L2)
  - [^0.8.16](contracts/WildForestNft.sol#L2)
  - [^0.8.16](contracts/WildForestToken.sol#L2)
  - [^0.8.16](contracts/WildForestTokenMedal.sol#L2)

node_modules/@openzeppelin/contracts/access/AccessControl.sol#L4


## costly-loop
Impact: Informational
Confidence: Medium
 - [ ] ID-34
[ERC721._burn(uint256)](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L299-L320) has costly operations inside a loop:
  - [delete _tokenApprovals[tokenId]](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L308)

node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L299-L320


 - [ ] ID-35
[ERC721._burn(uint256)](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L299-L320) has costly operations inside a loop:
  - [delete _owners[tokenId]](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L315)

node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L299-L320


## dead-code
Impact: Informational
Confidence: Medium
 - [ ] ID-36
[ERC721Nonce._beforeTokenTransfer(address,address,uint256,uint256)](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L26-L35) is never used and should be removed

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L26-L35


## solc-version
Impact: Informational
Confidence: High
 - [ ] ID-37
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/interfaces/IERC721.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/interfaces/IERC721.sol#L4


 - [ ] ID-38
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4


 - [ ] ID-39
solc-0.8.16 is not recommended for deployment

 - [ ] ID-40
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4


 - [ ] ID-41
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L5) allows old versions

node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol#L5


 - [ ] ID-42
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Context.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Context.sol#L4


 - [ ] ID-43
Pragma version[^0.8.16](contracts/WildForestTokenMedal.sol#L2) allows old versions

contracts/WildForestTokenMedal.sol#L2


 - [ ] ID-44
Pragma version[^0.8.16](contracts/WildForestNft.sol#L2) allows old versions

contracts/WildForestNft.sol#L2


 - [ ] ID-45
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol#L4


 - [ ] ID-46
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol#L4


 - [ ] ID-47
Pragma version[^0.8.0](contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2) allows old versions

contracts/sky-mavis-nft/ERC721PresetMinterPauserAutoIdCustomized.sol#L2


 - [ ] ID-48
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Strings.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Strings.sol#L4


 - [ ] ID-49
Pragma version[^0.8.0](contracts/sky-mavis-nft/refs/IERC721State.sol#L2) allows old versions

contracts/sky-mavis-nft/refs/IERC721State.sol#L2


 - [ ] ID-50
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol#L4


 - [ ] ID-51
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#L4


 - [ ] ID-52
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol#L4


 - [ ] ID-53
Pragma version[^0.8.1](node_modules/@openzeppelin/contracts/utils/Address.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Address.sol#L4


 - [ ] ID-54
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol#L4


 - [ ] ID-55
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#L4


 - [ ] ID-56
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L4


 - [ ] ID-57
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/Counters.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/Counters.sol#L4


 - [ ] ID-58
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4


 - [ ] ID-59
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/access/IAccessControlEnumerable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/access/IAccessControlEnumerable.sol#L4


 - [ ] ID-60
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/access/IAccessControl.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/access/IAccessControl.sol#L4


 - [ ] ID-61
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/access/AccessControl.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/access/AccessControl.sol#L4


 - [ ] ID-62
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#L4


 - [ ] ID-63
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4


 - [ ] ID-64
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol#L4


 - [ ] ID-65
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4


 - [ ] ID-66
Pragma version[^0.8.16](contracts/WildForestDefinedTokenUriNft.sol#L2) allows old versions

contracts/WildForestDefinedTokenUriNft.sol#L2


 - [ ] ID-67
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/security/Pausable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/security/Pausable.sol#L4


 - [ ] ID-68
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4


 - [ ] ID-69
Pragma version[^0.8.16](contracts/WildForestToken.sol#L2) allows old versions

contracts/WildForestToken.sol#L2


 - [ ] ID-70
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol#L4


 - [ ] ID-71
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol#L4


 - [ ] ID-72
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/interfaces/IERC4906.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/interfaces/IERC4906.sol#L4


 - [ ] ID-73
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4


 - [ ] ID-74
Pragma version[^0.8.0](contracts/sky-mavis-nft/ERC721Common.sol#L2) allows old versions

contracts/sky-mavis-nft/ERC721Common.sol#L2


 - [ ] ID-75
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L4


 - [ ] ID-76
Pragma version[^0.8.0](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2) allows old versions

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L2


 - [ ] ID-77
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/interfaces/IERC165.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/interfaces/IERC165.sol#L4


 - [ ] ID-78
Pragma version[^0.8.0](node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol#L4) allows old versions

node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol#L4


## low-level-calls
Impact: Informational
Confidence: High
 - [ ] ID-79
Low level call in [Address.functionCallWithValue(address,bytes,uint256,string)](node_modules/@openzeppelin/contracts/utils/Address.sol#L128-L137):
  - [(success,returndata) = target.call{value: value}(data)](node_modules/@openzeppelin/contracts/utils/Address.sol#L135)

node_modules/@openzeppelin/contracts/utils/Address.sol#L128-L137


 - [ ] ID-80
Low level call in [Address.sendValue(address,uint256)](node_modules/@openzeppelin/contracts/utils/Address.sol#L64-L69):
  - [(success) = recipient.call{value: amount}()](node_modules/@openzeppelin/contracts/utils/Address.sol#L67)

node_modules/@openzeppelin/contracts/utils/Address.sol#L64-L69


 - [ ] ID-81
Low level call in [Address.functionStaticCall(address,bytes,string)](node_modules/@openzeppelin/contracts/utils/Address.sol#L155-L162):
  - [(success,returndata) = target.staticcall(data)](node_modules/@openzeppelin/contracts/utils/Address.sol#L160)

node_modules/@openzeppelin/contracts/utils/Address.sol#L155-L162


 - [ ] ID-82
Low level call in [Address.functionDelegateCall(address,bytes,string)](node_modules/@openzeppelin/contracts/utils/Address.sol#L180-L187):
  - [(success,returndata) = target.delegatecall(data)](node_modules/@openzeppelin/contracts/utils/Address.sol#L185)

node_modules/@openzeppelin/contracts/utils/Address.sol#L180-L187


## naming-convention
Impact: Informational
Confidence: High
 - [ ] ID-83
Parameter [WildForestMedal.totalSupply(uint256)._id](contracts/WildForestTokenMedal.sol#L44) is not in mixedCase

contracts/WildForestTokenMedal.sol#L44


 - [ ] ID-84
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._seasonIds](contracts/WildForestTokenMedal.sol#L105) is not in mixedCase

contracts/WildForestTokenMedal.sol#L105


 - [ ] ID-85
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._from](contracts/WildForestTokenMedal.sol#L104) is not in mixedCase

contracts/WildForestTokenMedal.sol#L104


 - [ ] ID-86
Parameter [WildForestMedal.burnBatch(address,uint256[],uint256[])._amounts](contracts/WildForestTokenMedal.sol#L106) is not in mixedCase

contracts/WildForestTokenMedal.sol#L106


 - [ ] ID-87
Parameter [WildForestMedal.mint(address,uint256,uint256)._to](contracts/WildForestTokenMedal.sol#L64) is not in mixedCase

contracts/WildForestTokenMedal.sol#L64


 - [ ] ID-88
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._seasonIds](contracts/WildForestTokenMedal.sol#L75) is not in mixedCase

contracts/WildForestTokenMedal.sol#L75


 - [ ] ID-89
Parameter [WildForestMedal.uri(uint256)._seasonId](contracts/WildForestTokenMedal.sol#L49) is not in mixedCase

contracts/WildForestTokenMedal.sol#L49


 - [ ] ID-90
Parameter [WildForestMedal.burn(address,uint256,uint256)._seasonId](contracts/WildForestTokenMedal.sol#L91) is not in mixedCase

contracts/WildForestTokenMedal.sol#L91


 - [ ] ID-91
Variable [ERC721Nonce.______gap](contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L21) is not in mixedCase

contracts/sky-mavis-nft/refs/ERC721Nonce.sol#L21


 - [ ] ID-92
Parameter [ERC721Common.bulkMint(address[])._recipients](contracts/sky-mavis-nft/ERC721Common.sol#L69) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L69


 - [ ] ID-93
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._to](contracts/WildForestTokenMedal.sol#L74) is not in mixedCase

contracts/WildForestTokenMedal.sol#L74


 - [ ] ID-94
Parameter [WildForestDefinedTokenUriNft.mint(address,string)._tokenUri](contracts/WildForestDefinedTokenUriNft.sol#L37) is not in mixedCase

contracts/WildForestDefinedTokenUriNft.sol#L37


 - [ ] ID-95
Parameter [WildForestMedal.mint(address,uint256,uint256)._seasonId](contracts/WildForestTokenMedal.sol#L65) is not in mixedCase

contracts/WildForestTokenMedal.sol#L65


 - [ ] ID-96
Function [ERC721.__unsafe_increaseBalance(address,uint256)](node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L463-L465) is not in mixedCase

node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L463-L465


 - [ ] ID-97
Parameter [ERC721Common.stateOf(uint256)._tokenId](contracts/sky-mavis-nft/ERC721Common.sol#L16) is not in mixedCase

contracts/sky-mavis-nft/ERC721Common.sol#L16


 - [ ] ID-98
Parameter [WildForestMedal.mintBatch(address,uint256[],uint256[])._amounts](contracts/WildForestTokenMedal.sol#L76) is not in mixedCase

contracts/WildForestTokenMedal.sol#L76


 - [ ] ID-99
Parameter [WildForestMedal.burn(address,uint256,uint256)._amount](contracts/WildForestTokenMedal.sol#L92) is not in mixedCase

contracts/WildForestTokenMedal.sol#L92


 - [ ] ID-100
Parameter [WildForestMedal.burn(address,uint256,uint256)._from](contracts/WildForestTokenMedal.sol#L90) is not in mixedCase

contracts/WildForestTokenMedal.sol#L90


 - [ ] ID-101
Parameter [WildForestMedal.mint(address,uint256,uint256)._amount](contracts/WildForestTokenMedal.sol#L66) is not in mixedCase

contracts/WildForestTokenMedal.sol#L66


## immutable-states
Impact: Optimization
Confidence: High
 - [ ] ID-102
[WildForestMedal._governance](contracts/WildForestTokenMedal.sol#L10) should be immutable

contracts/WildForestTokenMedal.sol#L10