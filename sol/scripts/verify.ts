import hre from "hardhat";
import fs from "fs";

//! todo fix verification script
async function verify(): Promise<void> {
  const contracts = JSON.parse(fs.readFileSync(`./contracts.json`, "utf-8"));

  if (contracts.network !== hre.network.name) {
    throw new Error(
      "Contracts are not deployed on the same network, that you are trying to verify!"
    );
  }

  // verify JointVentureFactory contract
  try {
    await hre.run("verify:verify", {
      address: contracts.jvFactory,
    });
  } catch (error: any) {
    logError("JointVentureFactory", error.message);
  }

  // verify MockVentureCalls contract
  try {
    await hre.run("verify:verify", {
      address: contracts.mockVentureCalls,
    });
  } catch (error: any) {
    logError("MockVentureCalls", error.message);
  }

  // verify MockToken contract
  try {
    await hre.run("verify:verify", {
      address: contracts.token,
    });
  } catch (error: any) {
    logError("MockToken", error.message);
  }
}

function logError(contractName: string, msg: string) {
  console.log(
    `\x1b[31mError while trying to verify contract: ${contractName}!`
  );
  console.log(`Error message: ${msg}`);
  resetConsoleColor();
}

function resetConsoleColor() {
  console.log("\x1b[0m");
}

module.exports = {
  verify,
};
