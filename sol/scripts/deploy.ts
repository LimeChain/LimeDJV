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

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!", txObject);

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  fs.writeFileSync(
    "./contracts.json",
    JSON.stringify(
      {
        network: hre.network.name,
        deployer: await deployer.getAddress(),
        greeter: greeter.address,
      },
      null,
      2
    )
  );
}

module.exports = {
  deploy,
};
