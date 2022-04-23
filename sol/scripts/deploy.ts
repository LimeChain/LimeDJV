import hre, { ethers } from "hardhat";
import fs from "fs";

async function deploy(): Promise<void> {
  await hre.run("compile");
  const [deployer] = await hre.ethers.getSigners();
  const txObject = { gasLimit: 9000000 };

  console.log("Deploying contracts with the account:", deployer.address);

  console.log(
    `Account balance: ${(await deployer.getBalance()).toString()} \n`
  );

  /**
   * Deploying JointVentureFactory
   */
  const JointVentureFactory = await ethers.getContractFactory(
    "JointVentureFactory"
  );
  const jvf = await JointVentureFactory.deploy(txObject);
  await jvf.deployed();

  /**
   * Deploying MockVentureCalls
   */
  const MockVentureCalls = await ethers.getContractFactory("MockVentureCalls");
  const mockVentureCalls = await MockVentureCalls.deploy(txObject);
  await mockVentureCalls.deployed();

  /**
   * Deploying MockToken
   */
  const MockToken = await ethers.getContractFactory("MockToken");
  const token = await MockToken.deploy(txObject);
  await token.deployed();

  console.log("JointVentureFactory deployed to:", jvf.address);
  console.log("MockVentureCalls deployed to:", mockVentureCalls.address);
  console.log("MockToken deployed to:", token.address);

  fs.writeFileSync(
    "./contracts.json",
    JSON.stringify(
      {
        network: hre.network.name,
        deployer: await deployer.getAddress(),
        jvFactory: jvf.address,
        mockVentureCalls: mockVentureCalls.address,
        token: token.address,
      },
      null,
      2
    )
  );
}

module.exports = {
  deploy,
};
