const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const NFTCollection = await hre.ethers.getContractFactory("NFTCollection");
  const nftcollection = await NFTCollection.deploy();

  await nftcollection.deployed();

  const data = {
    address: nftcollection.address,
    abi: JSON.parse(nftcollection.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/NFTCollection.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
