const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const Contract = await ethers.getContractFactory(""); // Substitua "NomeDoContrato" pelo nome do seu contrato
  const contract = await Contract.deploy();

   // Espere o contrato ser implantado e confirmado na blockchain

  console.log("Contract deployed to:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
