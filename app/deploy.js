const hre = require("hardhat");

async function main() {
  const EduChain = await hre.ethers.getContractFactory("EduChain");
  const eduChain = await EduChain.deploy();

  await eduChain.deployed();

  console.log(`EduChain deployed at: ${eduChain.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});