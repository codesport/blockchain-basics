const main = async () =>{

    //store ower address and a random address in a constant
    const [owner] = await hre.ethers.getSigners();

    //compile contract and generate the necessary files (e.g., ABI) in artifacts directory
    const factory1 = await hre.ethers.getContractFactory("Number");  // <== use contract name here (not name of file)

    //deploy our contract to the blockchain. Add any parameters for the constructor here.  
    const contract1 = await factory1.deploy(); 

    //wait until contract is deployed to local blockchain! The smart contract constructor runs after this line of code.
    await contract1.deployed();
    console.log("Number Contract deployed TO:", contract1.address); 

    const  proposalOne_bytes32 = ethers.utils.formatBytes32String( "test proposal 1" )
    const  proposalTwo_bytes32 = ethers.utils.formatBytes32String( "test proposal 2" )

    const factory2 = await hre.ethers.getContractFactory("BallotExam");  // <== use contract name here (not name of file)
    const contract2 = await factory2.deploy( [proposalOne_bytes32, proposalTwo_bytes32] ); 
    await contract2.deployed();
   
    console.log("Ballot Contract deployed TO:", contract2.address); 
    console.log("All Contracts deployed BY: ", owner.address);


}


//boiler plate
const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
  //npx hardhat run scripts/deploy.js --network harmony