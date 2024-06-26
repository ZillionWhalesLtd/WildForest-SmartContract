const chai = require('chai')
const { deployments, ethers, upgrades } = require('hardhat')
const deep_equal = require('deep-equal-in-any-order')

const { signTransferData, ZERO_ADDRESS } = require('./_utils')

chai.use(deep_equal)

const { expect } = chai

const contractName = 'WildForestTokenClaimTransfer'

const all_events = transaction =>
  transaction
    .wait()
    .then(({ events }) => events)

let tokenContractAddress
const initialSupply = ethers.utils.parseUnits('99900000000000', 18)
const name = 'Wild Forest'
const symbol = 'WF'

const deploy = async () => {
  await deployments.fixture()
  const accounts = await ethers.getSigners()
  const [owner, alice, bob, steve] = accounts
  const ownerAddress = await owner.getAddress()
  const tokenOwnerAddress = await steve.getAddress()

  const signerAddress = ownerAddress

  const WildForestToken = await ethers.getContractFactory("WildForestToken")
  const tokenContract = await WildForestToken.deploy(initialSupply, name, symbol, tokenOwnerAddress)
  const seteveTokenContract = await tokenContract.connect(steve)

  tokenContractAddress = tokenContract.address

  const WildForestClaimTokenTransfer = await ethers.getContractFactory("WildForestClaimTokenTransfer")
  const tokenClaimTransferContract = await upgrades.deployProxy(WildForestClaimTokenTransfer, [contractName, ownerAddress, signerAddress, tokenContractAddress])

  const grantMinterTransaction = await seteveTokenContract.approve(tokenClaimTransferContract.address, initialSupply)
  await all_events(grantMinterTransaction)

  return {
    owner: {
      contract: tokenClaimTransferContract,
      // tokenContract: tokenContract,
      address: ownerAddress,
      signer: owner,
    },
    alice: {
      contract: await tokenClaimTransferContract.connect(alice),
      address: await alice.getAddress(),
      signer: alice,
    },
    bob: {
      contract: await tokenClaimTransferContract.connect(bob),
      tokenContract: tokenContract.connect(bob),
      address: await bob.getAddress(),
      signer: bob,
    },
    steve: {
      contract: await tokenClaimTransferContract.connect(steve),
      address: await steve.getAddress(),
      signer: steve,
    },
  }
}

describe('WildForestClaimTokenTransfer', function () {
  it('initialize not available second time', async () => {
    const { owner } = await deploy()
    await expect(owner.contract.initialize(contractName, owner.address, owner.address, tokenContractAddress)).to.be.revertedWith(
      'Initializable: contract is already initialized'
    )
  })

  it('setUserTransferSigner should be available only for admin', async () => {
    const { owner, bob } = await deploy()

    await expect(bob.contract.setUserTransferSigner(owner.address)).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
    )

    await expect(owner.contract.setUserTransferSigner(ZERO_ADDRESS)).to.be.revertedWith(
      'ClaimTokenTransfer: signerAddress is the zero address'
    )

    const set_transaction = await owner.contract.setUserTransferSigner(owner.address)
    const events = await all_events(set_transaction)

    const setSignerEvent = events.find(e => e.event === 'SignerAddressChanged')
    const { args: { signerAddress } } = setSignerEvent
    expect(signerAddress).to.equal(owner.address)
  })

  it('setTokenContractAddress should be available only for admin', async () => {
    const { owner, bob } = await deploy()

    await expect(bob.contract.setTokenContractAddress(tokenContractAddress)).to.be.revertedWith(
      `AccessControl: account ${bob.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
    )

    await expect(owner.contract.setTokenContractAddress(ZERO_ADDRESS)).to.be.revertedWith(
      'ClaimTokenTransfer: tokenContractAddress is the zero address'
    )

    const set_transaction = await owner.contract.setTokenContractAddress(tokenContractAddress)
    const events = await all_events(set_transaction)

    const setSignerEvent = events.find(e => e.event === 'TokenContractChanged')
    const { args: { tokenContractAddress: updatedAddress } } = setSignerEvent
    expect(updatedAddress).to.equal(tokenContractAddress)
  })

  it('UserTransfer should be available only with correct signature', async () => {
    const { owner, bob, steve } = await deploy()

    const deadlineExpired = BigInt((await ethers.provider.getBlock('latest')).timestamp) // + 60 * 60 * 24
    const deadline = BigInt((await ethers.provider.getBlock('latest')).timestamp + 60 * 60 * 24)

    const amount = 2 * 10^18

    const expiredTransferData = {
      walletAddress: bob.address,
      playerId: '660e8400-e29b-41d4-a716-446655441234',
      senderAddress: steve.address,
      amount,
      identificator: '550e8400-e29b-41d4-a716-446655440000',
      deadline: deadlineExpired,
    }

    const transferData = {
      walletAddress: bob.address,
      playerId: '660e8400-e29b-41d4-a716-446655441234',
      senderAddress: steve.address,
      amount,
      identificator: '550e8400-e29b-41d4-a716-446655440000',
      deadline,
    }

    const verififyingContractAddress = await bob.contract.address
    const expiredSignature = await signTransferData(owner.signer, expiredTransferData, contractName, verififyingContractAddress)
    const signature = await signTransferData(owner.signer, transferData, contractName, verififyingContractAddress)

    const invalidContractAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    const invalidAddressSignature = await signTransferData(owner.signer, transferData, contractName, invalidContractAddress)

    await expect(owner.contract.userTransfer(transferData, signature)).to.be.revertedWith(
      'Caller address is not TransferData.walletAddress'
    )

    await expect(bob.contract.userTransfer(expiredTransferData, expiredSignature)).to.be.revertedWithCustomError(
      bob.contract, 'Expired'
    )

    const invalidData = { ...transferData, identificator: '550e8400-e29b-41d4-a716-446655440001' }
    await expect(bob.contract.userTransfer(invalidData, signature)).to.be.revertedWithCustomError(
      bob.contract, 'InvalidSignature'
    )

    await expect(bob.contract.userTransfer(transferData, invalidAddressSignature)).to.be.revertedWithCustomError(
      bob.contract, 'InvalidSignature'
    )

    // await expect(bob.contract.userTransfer(transferData, signature)).not.to.be.reverted
    const mint_transaction = await bob.contract.userTransfer(transferData, signature)
    const events = await all_events(mint_transaction)

    const userTransferEvent = events.find(e => e.event === 'UserTransfer')
    const { args: { walletAddress, senderAddress, amount: _amount, identificator, playerId } } = userTransferEvent

    expect(Number(_amount)).to.equal(amount)
    expect(transferData.walletAddress).to.equal(walletAddress)
    expect(transferData.senderAddress).to.equal(senderAddress)
    expect(transferData.identificator).to.equal(identificator)
    expect(transferData.playerId).to.equal(playerId)

    await expect(bob.contract.userTransfer(transferData, signature)).to.be.revertedWithCustomError(
      bob.contract,
      'NonceAlreadyUsed'
    )
  })

})
