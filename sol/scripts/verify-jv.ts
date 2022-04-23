import hre from "hardhat";

//! todo fix verification script
async function verify(
  address: string,
  name: string,
  description: string,
  voters: string[],
  proposers: string[],
  required: string
): Promise<void> {
  // verify JointVentureFactory contract
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [name, description, voters, proposers, required],
    });
  } catch (error: any) {
    logError("JointVenture", error.message);
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
