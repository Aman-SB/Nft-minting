async function main() {
  const MyNFT = await ethers.getContractFactory("MyNft");

  //start deployment returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy();
  console.log("Contract deployed to address : ", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // 0xAD3bE8991656afFD5417822bb62024c32CC15503