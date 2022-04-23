// @ts-nocheck
/* eslint-disable */

import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";
import {JointVentureFactory, JointVenture} from '../typechain';
import { findEventByName, getParamFromTxEvent } from "./utils";

describe("Factory", function () {
  let factory: JointVentureFactory;

  let accounts: Signer[];
  let deployer: Signer;
  let voter1: Signer, voter2: Signer;
  let proposer1: Signer, proposer2: Signer;

  before(async () => {
    
  });

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    [deployer, voter1, voter2, proposer1, proposer2] = accounts;

    const Factory = await ethers.getContractFactory("JointVentureFactory");
    factory = await Factory.deploy();
    await factory.deployed();
   
    //! deploy factory -> Factory.deploy();
    //! create instance via factory -> await factory.create([voter1.address, voter2.address], 2);

  });

  afterEach(async function () {});

  it("should get joint ventures from different voters", async () => {
    const voters = [voter1.address, voter2.address];
    const proposers = [proposer1.address, proposer2.address];
    const required = 2;
    await factory.connect(deployer).create( "name1", "description1", voters, proposers, required)
    await factory.connect(deployer).create( "name2", "description2", voters, proposers, required)
    await factory.connect(voter1).create( "name3", "description3", voters, proposers, required)

    expect(await factory.getInstantiationCount(deployer.address), "they don't match").to.equal("2");
    expect(await factory.getInstantiationCount(voter1.address), "they don't match").to.equal("1");
  })

  it("should get joint ventures from different voters", async () => {
    const voters = [voter1.address, voter2.address];
    const proposers = [proposer1.address, proposer2.address];

    const required = 2;
    
    await factory.connect(deployer).create( "name1", "description1", voters, proposers, required)
    await factory.connect(deployer).create( "name2", "description2", voters, proposers, required)

    const instantiations = await factory.getInstantiations(deployer.address)
    
    expect(instantiations.length, "not a proper length").to.equal(2)
    expect(ethers.utils.isAddress(instantiations[0]), "not a valid address").to.be.true
    expect(ethers.utils.isAddress(instantiations[1]), "not a valid address").to.be.true
  })
});
