// @ts-nocheck
/* eslint-disable */

import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";
import {JointVenture, MockVentureCalls, ERC20Mock} from '../typechain';
import { getParamFromTxEvent } from "./utils";

const zeroAddress = ethers.constants.AddressZero;

describe("JointVenture", function () {
  let jv: JointVenture;
  let callInstance: MockVentureCalls
  let tokenInstance: ERC20Mock

  let accounts: Signer[];
  let deployer: Signer;
  let voter1: Signer, voter2: Signer;
  let proposer1: Signer, proposer2: Signer;
  let nonVoter: Signer
  

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    [deployer, voter1, voter2, proposer1, proposer2, nonVoter] = accounts;

    const JointVenture = await ethers.getContractFactory("JointVenture");
    jv = await JointVenture.deploy("name", "description", [voter1.address, voter2.address], [proposer1.address, proposer2.address], 2);
    await jv.deployed();

    const CallInstance = await ethers.getContractFactory("MockVentureCalls");
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
      
      const tx = await jv.connect(voter1).submitProposal(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )
  
      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)
      
      const resAfter = await callInstance.uint1()
  
      expect(resBefore, "not 0").to.equal("0")
      expect(resAfter, "not 3").to.equal("3")
    })

    it("should change a setting through receive1uint", async () => {
      const oneEth = ethers.utils.parseEther('1')
      const transferBalance = 100; //wei
      let balanceJV = await ethers.provider.getBalance(jv.address)
      let balanceCallInstance;

      expect(balanceJV).to.equal("0")

      let txFund = {
        to: jv.address,
        value: oneEth,
      };

      await deployer.sendTransaction(txFund);
      balanceJV = await ethers.provider.getBalance(jv.address)
    
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive1uint(3)
      const resBefore = await callInstance.uint1()
      
      const tx = await jv.connect(voter1).submitProposal(callInstance.address, transferBalance, encodedData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )
      
      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)

      balanceJV = await ethers.provider.getBalance(jv.address)
      balanceCallInstance = await ethers.provider.getBalance(callInstance.address)

      const resAfter = await callInstance.uint1()
        
      expect(await callInstance.lastMsgDataLength()).to.equal(32 + 4) // 32 bytes offset + 32 bytes data length + 4 bytes method signature
      expect(await callInstance.lastMsgValue()).to.equal(transferBalance) // 32 bytes offset + 32 bytes data length + 4 bytes method signature
      expect(resBefore, "not 0").to.equal("0")
      expect(resAfter, "not 3").to.equal("3")
      expect(balanceJV, "balanceJV is not correct").to.equal(oneEth.sub(transferBalance))
      expect(balanceCallInstance, "balanceCallInstance is not correct").to.equal(transferBalance)
    })
  
    it("should change a setting through receive2uints", async () => {
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive2uints(3, 7)
      const uint1Before = await callInstance.uint1()
      const uint2Before = await callInstance.uint2()
      
      const tx = await jv.connect(voter1).submitProposal(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )
  
      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)
      
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
  
      const tx = await jv.connect(voter1).submitProposal(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )

      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)
      
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
      
      const tx = await jv.connect(voter1).submitProposal(tokenInstance.address, 0, encodedTransfer.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )
  
      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)
      
      const tokensAfter = await tokenInstance.balanceOf(jv.address)
      expect(tokensAfter, "not correct amount").to.equal(sendTokens)
    })
  })

  context("Playground", () => {
    //v2
    //! set voting power?
    //! allow working with msg value

    it("should get proposal info", async () => {
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive1uint(3)
      
      //! Create proposal
      const tx = await jv.connect(voter1).submitProposal(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )

      await jv.connect(voter1).confirmProposal(proposalId)

      const proposalState = await jv.proposals(proposalId)

      expect(await jv.name()).to.equal("name")
      expect(await jv.description()).to.equal("description")
      expect(proposalState.destination, "not correct destination").to.equal(callInstance.address)
      expect(proposalState.value, "not correct value").to.equal("0")
      expect(proposalState.data, "not correct data").to.equal(encodedData.data)
      expect(proposalState.executed, "not correct state").to.be.false
      
      // //! Confirm tx and change execution state 
      await jv.connect(voter2).confirmProposal(proposalId)
      const proposalSateAfter = await jv.proposals(proposalId)

      expect(proposalSateAfter.executed, "not correct state").to.be.true
    })

    it("Should revert if sender tries to confirm proposal twice", async () => {
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive1uint(3)
      
      //! Create proposal
      const tx = await jv.connect(voter1).submitProposal(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )

      await jv.connect(voter1).confirmProposal(proposalId)
      await expect(
        jv.connect(voter1).confirmProposal(proposalId)
      ).to.be.revertedWith("JD: Tx confirmed")
    })

    it("should submit proposal with a proposer", async () => {
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive1uint(3)
      
      const tx = await jv.connect(proposer1).submitProposal(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )

      expect(proposalId, "no proposal id").to.equal("0")
    })

    it("must fail if proposer tries to vote", async () => {
      const encodedData = await callInstance.connect(voter1).populateTransaction.receive1uint(3)
      
      const tx = await jv.connect(proposer1).submitProposal(callInstance.address, 0, encodedData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )
      await expect(
        jv.connect(proposer1).confirmProposal(proposalId)
      ).to.be.revertedWith("JV: Only Voter")
    })

    it("should get details for 3 proposals", async () => {
      const encodedData1 = (await callInstance.connect(voter1).populateTransaction.receive1uint(3)).data
      const encodedData2 = (await callInstance.connect(voter1).populateTransaction.receive1uint(4)).data
      const encodedData3 = (await callInstance.connect(voter1).populateTransaction.receive1uint(5)).data

      const encData = [encodedData1, encodedData2, encodedData3]

      for (let i = 0; i < encData.length; i++) {
        await jv.connect(proposer1).submitProposal(callInstance.address, 0, encData[i])
      }

      const proposals = await jv.getProposals(0,3, true, true)

      expect(proposals.length, "not correct length").to.equal(encData.length)
    })
    
    it("should add new voter", async () => {
      const initialVoters = await jv.getVoters()
      expect(initialVoters.length).to.equal(2);
      
      const encodedData = (await jv.connect(voter1).populateTransaction.addVoter(nonVoter.address)).data
      const tx = await jv.connect(proposer1).submitProposal(jv.address, 0, encodedData)
      const receipt = await tx.wait();
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )

      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)
      
      const voters = await jv.getVoters()

      expect(voters.length, "not correct length").to.equal(3);
      expect(voters, "new voter not included").to.include(nonVoter.address)
    })
    
    it("should remove voter", async () => {
      const encodedData = (await jv.connect(voter1).populateTransaction.removeVoter(voter1.address)).data
      const tx = await jv.connect(proposer1).submitProposal(jv.address, 0, encodedData)
      const receipt = await tx.wait();
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )

      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)
      const voters = await jv.getVoters()

      expect(voters.length, "not correct length").to.equal(1);
      expect(voters, "new voter not included").not.to.include(voter1.address)
    })
    
    it("should add new proposer", async () => {
      const initialProposers = await jv.getProposers()
      expect(initialProposers.length).to.equal(2);

      const encodedData = (await jv.connect(voter1).populateTransaction.addProposer(nonVoter.address)).data
      const tx = await jv.connect(proposer1).submitProposal(jv.address, 0, encodedData)
      const receipt = await tx.wait();
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )

      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)
      const proposers = await jv.getProposers()
     
      expect(proposers.length, "not correct length").to.equal(3);
      expect(proposers, "new voter not included").to.include(nonVoter.address)
    })
    
    it("should remove proposer", async () => {
      const encodedData = (await jv.connect(voter1).populateTransaction.removeProposer(proposer1.address)).data
      const tx = await jv.connect(proposer1).submitProposal(jv.address, 0, encodedData)
      const receipt = await tx.wait();
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )

      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)
      const proposers = await jv.getProposers()

      expect(proposers.length, "not correct length").to.equal(1);
      expect(proposers, "new voter not included").not.to.include(voter1.address)
    })
    
    it("should get total revenue by eth", async () => {
      const oneEth = ethers.utils.parseEther('1')

      let balance = await ethers.provider.getBalance(jv.address)
      expect(balance).to.equal("0")

      let tx = {
        to: jv.address,
        value: oneEth,
      };

      await deployer.sendTransaction(tx);

      const rs = await jv.getRevenue(zeroAddress);
      
      expect(rs, "revenue not correctly split").to.equal(ethers.BigNumber.from(oneEth))
    })

    it("should get total revenue by token", async () => {
      const oneToken = ethers.utils.parseEther('1');
      await tokenInstance.mint(jv.address, oneToken);
      
      const rs = await jv.getRevenue(tokenInstance.address);

      expect(rs, "revenue not correctly split").to.equal(ethers.BigNumber.from(oneToken))
    })
    
    it("should transfer eth revenue correctly", async () => {
      const balanceVoter1Before = await ethers.provider.getBalance(voter1.address);
      const balanceVoter2Before = await ethers.provider.getBalance(voter2.address);
      const oneEth = ethers.utils.parseEther('1')
      
      let fundContract = {
        to: jv.address,
        value: oneEth,
      };

      await deployer.sendTransaction(fundContract);

      const splitData = await jv.populateTransaction.splitRevenue(zeroAddress);
      const tx = await jv.connect(voter1).submitProposal(jv.address, 0, splitData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )
  
      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)

      let leftInContract = await tokenInstance.balanceOf(jv.address);

      const voters =  (await jv.getVoters()).length

      const balanceVoter1After = await ethers.provider.getBalance(voter1.address);
      const balanceVoter2After = await ethers.provider.getBalance(voter2.address);

      const res1 = balanceVoter1After.sub(balanceVoter1Before)
      const res2 = balanceVoter2After.sub(balanceVoter2Before)

      const deviation = ethers.utils.parseUnits("0.0003", "ether") //tx cost
      
      expect(res1, "res1 not correct").to.be.closeTo(oneEth.div(voters), deviation)
      expect(res2, "res2 not correct").to.be.closeTo(oneEth.div(voters), deviation)
      expect(leftInContract, "contract still has funds").to.be.equal("0")
    })
    
    it("should transfer token revenue correctly", async () => {
      let balanceVoter1 = await tokenInstance.balanceOf(voter1.address);
      let balanceVoter2 = await tokenInstance.balanceOf(voter2.address);
      let leftInContract;
      expect(balanceVoter1, 'voter1 balance not 0').to.equal("0")
      expect(balanceVoter2, 'voter2 balance not 0').to.equal("0")

      const oneToken = ethers.utils.parseEther('1');
      await tokenInstance.mint(jv.address, oneToken);

      const splitData = await jv.populateTransaction.splitRevenue(tokenInstance.address);
      const tx = await jv.connect(voter1).submitProposal(jv.address, 0, splitData.data)
      const receipt = await tx.wait()
      const proposalId = getParamFromTxEvent(
        receipt,
        "Submission",
        "proposalId"
      )
  
      await jv.connect(voter1).confirmProposal(proposalId)
      await jv.connect(voter2).confirmProposal(proposalId)
      
      balanceVoter1 = await tokenInstance.balanceOf(voter1.address);
      balanceVoter2 = await tokenInstance.balanceOf(voter2.address);
      leftInContract = await tokenInstance.balanceOf(jv.address);

      const voters =  (await jv.getVoters()).length
        
      expect(leftInContract, "not 0").to.equal("0");
      expect(balanceVoter1, "balanceVoter1 is not correct").to.equal(oneToken.div(voters))
      expect(balanceVoter2, "balanceVoter2 is not correct").to.equal(oneToken.div(voters))
    })

    it("must fail if nonVoter tries to confirm", async () => {})

    it("must fail if nonVoter tries to submit", async () => {
      const encodedData = await callInstance.connect(nonVoter).populateTransaction.receive1uint(3)
      await expect(
        jv.connect(nonVoter).submitProposal(callInstance.address, 0, encodedData.data)
      ).to.be.revertedWith("JV: Nor Voter or Proposer")
    })
  })
});
