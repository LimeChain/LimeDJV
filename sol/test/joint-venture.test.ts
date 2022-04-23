// @ts-nocheck
/* eslint-disable */

import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";
import {JointVenture, MultiSigWalletFactory, TestCalls, MockToken} from '../typechain';
import { findEventByName, getParamFromTxEvent } from "./utils";

describe("JointVenture", function () {
  let jv: JointVenture;
  let callInstance: TestCalls
  let tokenInstance: ERC20Mock

  let accounts: Signer[];
  let deployer: Signer;
  let voter1: Signer, voter2: Signer;
  let proposer1: Signer, proposer2: Signer;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    [deployer, voter1, voter2, proposer1, proposer2] = accounts;

    const JointVenture = await ethers.getContractFactory("JointVenture");
    jv = await JointVenture.deploy("name", "description", [voter1.address, voter2.address], [proposer1.address, proposer2.address], 2);
    await jv.deployed();

    const CallInstance = await ethers.getContractFactory("TestCalls");
    callInstance = await CallInstance.deploy();
    await callInstance.deployed();

    const TestToken = await ethers.getContractFactory("MockToken");
    tokenInstance = await TestToken.deploy()
    await tokenInstance.deployed();

  });

  afterEach(async function () {});

  context("For external calls toward contract", () => {
    it("should change a setting through receive1uint", async () => {
    
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive1uint(3)
      const resBefore = await callInstance.uint1()
      
      const tx = await jv.connect(voter1).submitTransaction(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const txId = getParamFromTxEvent(
        receipt,
        "Submission",
        "transactionId"
      )
  
      await jv.connect(voter2).confirmTransaction(txId)
      
      const resAfter = await callInstance.uint1()
  
      expect(resBefore, "not 0").to.equal("0")
      expect(resAfter, "not 3").to.equal("3")
    })
  
    it("should change a setting through receive2uints", async () => {
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive2uints(3, 7)
      const uint1Before = await callInstance.uint1()
      const uint2Before = await callInstance.uint2()
      
      const tx = await jv.connect(voter1).submitTransaction(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const txId = getParamFromTxEvent(
        receipt,
        "Submission",
        "transactionId"
      )
  
      await jv.connect(voter2).confirmTransaction(txId)
      
      const uint1After = await callInstance.uint1()
      const uint2After = await callInstance.uint2()
  
      expect(uint1Before, "not 0").to.equal("0")
      expect(uint2Before, "not 0").to.equal("0")
      expect(uint1After, "not 3").to.equal("3")
      expect(uint2After, "not 7").to.equal("7")
    })
  
    it("should change a setting through receive1bytes", async () => {
      const bytes =  '0x' + '0123456789abcdef'
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive1bytes(bytes)
      const byteArrBefore = await callInstance.byteArray1()
  
      const tx = await jv.connect(voter1).submitTransaction(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const txId = getParamFromTxEvent(
        receipt,
        "Submission",
        "transactionId"
      )
  
      await jv.connect(voter2).confirmTransaction(txId)
      
      const byteArrAfter = await callInstance.byteArray1()
  
      expect(byteArrBefore, "not 0x").to.equal("0x")
      expect(byteArrAfter, "not 3").to.equal(bytes)
    })
  })

  context("For external calls towards erc20", () => {
    it("Should transfer tokens elsewhere", async () => {
      const tokensBefore = await tokenInstance.balanceOf(jv.address)
      expect(tokensBefore, "not zero amount").to.equal(0)
      
      const sendTokens = 10
      const encodedTransfer = await tokenInstance.populateTransaction.mint(jv.address, sendTokens);
      
      const tx = await jv.connect(voter1).submitTransaction(tokenInstance.address, 0, encodedTransfer.data)
      const receipt = await tx.wait()
      const txId = getParamFromTxEvent(
        receipt,
        "Submission",
        "transactionId"
      )
  
      await jv.connect(voter2).confirmTransaction(txId)
      
      const tokensAfter = await tokenInstance.balanceOf(jv.address)
      expect(tokensAfter, "not correct amount").to.equal(sendTokens)
    })
  })

  context("Playground", () => {
    //todo 
    //! only owners can vote
    //! only proposals and voters can propose
    //! proposal should be visible from anyone
    //! change setting to the jv contract (say add new owner)
    //! transaction should not be executed before the requirements are met
    //! check state of the transactions
    //! show revenue split by ETH
    //! show revenue split by Token
    //! transfer tokens to parties
    //! transfer ether to parties


    //v2
    //! set voting power?
    //! allow working with msg value

    it("get proposalinfo", async () => {
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive1uint(3)
      const resBefore = await callInstance.uint1()
      
      //! Create proposal
      const tx = await jv.connect(voter1).submitTransaction(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const txId = getParamFromTxEvent(
        receipt,
        "Submission",
        "transactionId"
      )

      const proposalState = await jv.transactions(txId)
      console.log(proposalState);

      expect(proposalState.destination, "not correct destination").to.equal(callInstance.address)
      expect(proposalState.value, "not correct value").to.equal("0")
      expect(proposalState.data, "not correct destination").to.equal(encodedData.data)
      expect(proposalState.executed, "not correct destination").to.be.false
      

      //! Confirm tx and chagnge execution state 
      await jv.connect(voter2).confirmTransaction(txId)
      const proposalSateAfter = await jv.transactions(txId)
      console.log(proposalSateAfter);

      expect(proposalSateAfter.executed, "not correct destination").to.be.true

        
      
      // const resAfter = await callInstance.uint1()
  
      // expect(resBefore, "not 0").to.equal("0")
      // expect(resAfter, "not 3").to.equal("3")
    })

  })

});
