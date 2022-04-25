/**
 * references:
 * @link https://stermi.medium.com/how-to-create-tests-for-your-solidity-smart-contract-9fbbc4f0a319
 * @link https://learn.figment.io/tutorials/create-nft-smart-contract-with-hardhat#testing-the-smart-contract
 * @link https://ethereum-waffle.readthedocs.io/en/latest/matchers.html?highlight=events#revert
 * @link https://hardhat.org/tutorial/testing-contracts.html
 * @link https://hardhat.org/guides/waffle-testing.html 
 * 
 * Event Logging and testing:
 * 
 * @link https://ethereum.stackexchange.com/a/110049
 * @link https://ethereum.stackexchange.com/a/87669/3506
 * @link https://stackoverflow.com/questions/68168566/how-do-i-listen-to-events-from-a-smart-contract-using-ethers-js-contract-on-in
 * @link https://docs.ethers.io/v5/concepts/events/
 * @link https://www.google.com/search?q=access+the+contract%27s+event+with+ethersjs
 * @link https://betterprogramming.pub/learn-solidity-events-2801d6a99a92
 * @link https://ethereum.org/en/developers/tutorials/waffle-dynamic-mocking-and-testing-calls/
 * @link https://ethereum.org/sl/developers/tutorials/waffle-test-simple-smart-contract/
 * 
 *  
 * npx hardhat test  //to run script
 * 
 * PRO-TIP:
 *  Convert decimal to ether: ethers.utils.parseEther('1') = ethers.utils.parseUnits('1', 18) = 1e18
 *  Convert ether and BigNumber to decimal: ethers.utils.formatEther( onChainBigNumber )
 * 
 * 
 */
 const { expect } = require("chai");
 const { ethers } = require("hardhat")

 
 
 describe("Test State Variable Setter and Getter Functions", function() {//name to the set of tests we are going to perform
 
 
     //Define Globals Here
 
     let contract //the docs don't tell you that this must be global to the tests
     let newNumber = 15

 
 
     this.beforeEach(async function() {
 
         [owner, user1, user2] = await hre.ethers.getSigners(); //set as globals 

         const factory = await hre.ethers.getContractFactory("Number");
         contract = await factory.deploy(); //set as global
         await contract.deployed();
 
     })
 
     it("1. Should allow get number. And number should equal zero", async function(){


        let number = await contract.getNumber()

        expect(  number ).to.equal( 0 ) 


 
     })
 
 
 
     it("2. Should allow setting and getting number equal to " + newNumber, async function() { 

        let number = await contract.setNumber( newNumber )
        await number.wait()


        number = await contract.getNumber()

        expect(  number ).to.equal( newNumber ) 


 
     })


})