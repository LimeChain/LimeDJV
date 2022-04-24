import hre from "hardhat";

async function verify(): Promise<void> {
  const address = "0x..";
  const name = "name";
  const description = "description";
  const voters = ["0x.."];
  const proposers = ["0x.."];
  const required = 1;

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
