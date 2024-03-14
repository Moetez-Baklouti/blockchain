
const hre = require("hardhat");

async function main() {

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  const Auth = await hre.ethers.getContractFactory("Auth");
  const auth = await Auth.deploy(); // Deploy the Auth contract

  await auth.deployed();

  console.log("Auth deployed to:", auth.address);

  const Expedition = await hre.ethers.getContractFactory("Expedition");

  const expedition = await Expedition.deploy(); // Deploy the Expedition contract


  await expedition.deployed();

  console.log("Expedition deployed to:", expedition.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
