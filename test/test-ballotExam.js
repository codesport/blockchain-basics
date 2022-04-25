/**
* npx hardhat test  //to run script
* 
* PRO-TIPS:
*  Convert decimal to ether: ethers.utils.parseEther('1') = ethers.utils.parseUnits('1', 18) = 1e18
*  Convert ether and BigNumber to decimal: ethers.utils.formatEther( onChainBigNumber )
*  Convert normal number on chain to JavaScript Normal number: onchainBigNumber.toNumber()
*
* https://blog.8bitzen.com/posts/18-03-2019-easily-testing-solidity-structs-in-javascript/
*  structs from Solidity get returned as an array on the JavaScript side
* 
* 
*/
const { expect } = require("chai");
const { ethers } = require("hardhat")



describe("Test Ballot Contract Functions Adhering to Exam Questions (Voting Period Expiry, Set Proposal, Valid Voting)", function() {//name to the set of tests we are going to perform


    //Define Globals Here

    let contract //the docs don't tell you that this must be global to the tests
    let voteTimeLength = 3 //seconds
    let sleepTime = 5e3 // in JavaScript, time is in milliseconds. 

    
    //https://stackoverflow.com/a/39914235
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    this.beforeEach(async function() {

        [owner, user1, user2] = await hre.ethers.getSigners(); //set as globals 


       const  proposalOne_bytes32 = ethers.utils.formatBytes32String( "test proposal 1" )
       const  proposalTwo_bytes32 = ethers.utils.formatBytes32String( "test proposal 2" )

        const factory = await hre.ethers.getContractFactory("BallotExam");
        contract = await factory.deploy( [proposalOne_bytes32, proposalTwo_bytes32] ); //set as global
        await contract.deployed();

  

    })

    it("1. Should allow get voteTimeLength and it should equal 5 minutes", async function(){


       let voteDuration = await contract.voteTimeLength()

       expect(  voteDuration ).to.equal( 300 ) 



    })



    it("2. Should allow setting and getting voteTimeLength equal to " + voteTimeLength + " seconds", async function() { 

       let voteDuration = await contract.setVoteTimeLength( voteTimeLength)
       await voteDuration.wait()


       voteDuration = await contract.voteTimeLength()

       expect(  voteDuration ).to.equal( voteTimeLength) 



    })


    it("3. Should allow setting voteTimeLength equal to " + voteTimeLength + " seconds. And then give voting rights to user1", async function() { 

        let voteDuration = await contract.setVoteTimeLength( voteTimeLength)
        await voteDuration.wait()
 
        voteDuration = await contract.voteTimeLength()
        expect(  voteDuration ).to.equal( voteTimeLength) 
 

        let assignVotingRights = await contract.giveRightToVote( user1.address);
        await assignVotingRights.wait()


        // timeLeft = ( await contract.getVotingTimeRemaining() ).toNumber()

        // console.log("Time Left: " + timeLeft)


            //structs from Solidity get returned as an array on the JavaScript side
        let [weight, votedBool, delegateAddress, vote] = await contract.voters(user1.address)


        const voterWeight = weight.toNumber()
        
        //console.log("Assigned Vote Weight: " + voterWeight)


       expect(  voterWeight ).to.equal( 1 ) 
 
     })    


     it("4. Should Fail: When voting after expiry time of " + voteTimeLength + " seconds is exceeded", async function() {

        let voteDuration = await contract.setVoteTimeLength( voteTimeLength)
        await voteDuration.wait()

        voteDuration = await contract.voteTimeLength()

        //console.log("Voting Duration: " + voteDuration)

        let assignVotingRights = await contract.giveRightToVote( user1.address);
        await assignVotingRights.wait()        


        await sleep( sleepTime ) //seconds


        await expect ( contract.connect(user1).vote(1) ).to.be.revertedWith('Voting period has expired');



     })


     it("5. Should allow Voting", async function() { 

        let voteDuration = await contract.setVoteTimeLength( voteTimeLength)
        await voteDuration.wait()


        voteDuration = await contract.voteTimeLength()

        //console.log("Voting Duration: " + voteDuration)

        let assignVotingRights = await contract.giveRightToVote( user1.address);
        await assignVotingRights.wait()        

        let vote =  await contract.connect(user1).vote(1)
        await vote.wait()


        let voteResult = ethers.utils.parseBytes32String( await contract.winnerName() )
        //await voteResult.wait()

        //console.log(voteResult)


        expect(  voteResult ).to.equal( "test proposal 2" ) 
     })    





})