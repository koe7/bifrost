async function main() {
  const Balancer = await ethers.getContractFactory("Balancer");
  const balancer = await Balancer.deploy();
  console.log("Deployed at ", balancer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
