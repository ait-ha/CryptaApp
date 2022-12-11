const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("NFTCollection", function () {

  let Collection;
  let collection;
  let owner,addr1;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    Collection = await ethers.getContractFactory("NFTCollection");
    collection = await Collection.deploy();
    await collection.deployed();
});

  it("Should return the new NFTCollection once it's changed", async function () {
    expect(await collection.getOwner()).to.equal(await owner.getAddress());
  });

  it("Should return the new price once it's updated", async function () {
    await collection.updateExposePrice(1);
    let price = await collection.getExposePrice();
    expect(price).to.equal(1);
  });
});

