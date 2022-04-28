**Attribution:** This dApp and the accompanying solutions were created by **Marcos (Marcus) A. B.** His GitHub username is [codesport](https://github.com/codesport/).  [BallotExam.sol](https://github.com/codesport/blockchain-basics/blob/master/contracts/BallotExam.sol) is a modification of Ballot.sol from [Soliditylang.org](https://docs.soliditylang.org/en/v0.8.11/solidity-by-example.html#voting)

# A. Conceptual Knowledge

1. **What is a smart contract? How are they deployed? You should be able to describe how a smart contract is deployed and the necessary steps.**

    **Solution:**

    A Smart Contract is computer code (also known as a script, software, computer program, etc) that is compiled into machine readable code called byte code. It may  then be deployed to a distributed and decentralized network (distributed ledger) called a blockchain.  The smart contract contains a fixed set of immutable instructions that should be performed under a given set of conditions.


2. **What is gas? Why is gas optimization such a big focus when building smart contracts?**

    **Solution:**

    Gas is a transaction fee that's charged for write operations to the Ethereum blockchain.  Write operations include deploying contracts, sending funds to another address as well as changing state variables within already deployed contracts. It is argued that Gas deters "spamming" the network with frivolous transactions. 

    Gas optimization (minimizing gas fees) is important since it saves money. Specifically, it reduces the gas fees end users  pay to interact with our contracts as well as our cost to deploy said contracts. The more complex the computations within a smart contract, the higher the gas fees.


3. **What is a hash? Why do people use hashing to hide information?**

    **Solution:**

    Hash is the transformation of a source (file, text, or string) into a unique (if collision resistant) alphanumeric representation called a digest. This digest has a specific and standardized length depending on the hashing algorithm used.  Furthermore, for a given algorithm, the length of the hash is the same regardless of the size of the source.  

    Hashing may be used to verify whether a file has been tampered with by comparing it to a reference hash. This concept is called data integrity. Hence, if the reference hash does not match that of the delivered "file", the delivered file has been tampered with.  Such a scenario violates data integrity.
    
    Hashing is used to hide information because the best algorithms are traditionally viewed  as 1-way (non-reversible).  However, there exist the concept of "rainbow" tables. Ipso facto, these rainbow tables make 1-way hashes 2-way by means of lookup tables.  Rainbow tables are built by brute force computations of hashes on common dictionary words or passwords. Hashing may be made more robust (computationally expensive to crack)  by seeding the source with a `salt` and ensuring the hashing algorithm does indeed generate unique hashes (by being collision resistant).
    
    As a final note, hashing is not encryption. Encryption is natively 2-way. 


4. **How would you prove to a colorblind person that two different colored objects are actually of different colors?**

    **Solution:**
    
    * Express and show colors within an objective and neutral reference (e.g., a machine, a language, etc) that you both trust and know to be absolute sources of truth: 
       
        * After taking photos of both objects with a camera provided by colorblind friend, use Photoshop's color picker to get a HEX or RGB representation of both colors. 
        
        * The different HEX and RGB values from Photoshop (an objective source of truth) will show that the objects are of different colors 

# B. Solidity

1. **Program a super simple “Hello World” smart contract: write a storeNumber function to store an unsigned integer and then a retrieveNumber function to retrieve it. Clearly comment your code. Include a screenshot of the Remix UI once deployed in your final submission pdf**

**Solution to Question 1:**

* The contract is named `Number.sol`.  It was unit [tested](https://github.com/codesport/blockchain-basics/blob/master/test/test-number.js) and deployed to Harmony's testnet using my normal hardhat workflow.  Afterwards,  to comply with the Remix requirement, the deployed contract was pasted and compiled  within Remix.  I then attached to the deployed contract within Remix and took the requested screenshot:

![Remix Screenshot for Number.sol](https://github.com/codesport/blockchain-basics/blob/master/images/number-remix.png "Remix Screenshot for Number.sol")
#### Figure 1: Remix Screenshot for Number.sol

* `Number.sol`: https://github.com/codesport/blockchain-basics/blob/master/contracts/Number.sol

* Unit Tests for `Number.sol`: https://github.com/codesport/blockchain-basics/blob/master/test/test-number.js

* `Number.sol` Harmony Deployment: https://explorer.pops.one/address/0x7c4fc4f86e83089d84108983316929e6dfe3f5e5?activeTab=7

---

2. (through 4) **Suppose we want to limit the voting period of each Ballot contract to 5 minutes. To do so, implement the following:**

    * **Add a state variable startTime to record the voting start time.**
    * **Create a modifier voteEnded that will check if the voting period is over.** 
    * **Use that modifier in the vote function to forbid voting and revert the transaction after the deadline**

**Solution to Questions 2 - 4:**

* As with the above `Number.sol` example, `BallotExam.sol` was thoroughly [tested](https://github.com/codesport/blockchain-basics/blob/master/test/test-ballotExam.js) and then deployed using my hardhat development workflow. 

* To comply with the Remix screenshot requirements, the contract was then pasted and compiled within Remix. Afterwards, I attached to the already deployed contract by entering its address in Remix.  Finally, I accessed contract's `giveRightToVote` and `vote` functions via the Remix UI and took the screen captures shown in [Figure 2](https://github.com/codesport/blockchain-basics#figure-2-timestamped-screenshots-for-contract-deployment-giverighttovote-assignment-and-reverted-voting-with-ballotexamsol) below.

    * `startTime` is initialized in [line 135](https://github.com/codesport/blockchain-basics/blob/master/contracts/BallotExam.sol#L135) of `BallotExam.sol` when the chairperson executes the `giveRightToVote` function. Line 135 is:  `startTime = block.timestamp;`

    * `giveRightToVote` was called at 9:42 AM, thus auto-initializing the `startTime` global. The 9:42 AM timestamp shown in the screen capture of the Harmony Explorer in [Figure 2](https://github.com/codesport/blockchain-basics#figure-2-timestamped-screenshots-for-contract-deployment-giverighttovote-assignment-and-reverted-voting-with-ballotexamsol)

    * A vote was attempted 15 minutes later at 9:57 AM.  The reverted message is also shown in [Figure 2](https://github.com/codesport/blockchain-basics#figure-2-timestamped-screenshots-for-contract-deployment-giverighttovote-assignment-and-reverted-voting-with-ballotexamsol) along with the timestamp. 

        * Reversion is enforced by [line 187](https://github.com/codesport/blockchain-basics/blob/master/contracts/BallotExam.sol#L187),  `function vote(uint proposal) external voteEnded(block.timestamp){` which feeds the current `block.timestamp` to the ["dynamic" function modifier on lines 65 - 83](https://github.com/codesport/blockchain-basics/blob/master/contracts/BallotExam.sol#L65-L83) .

    * `BallotExam.sol`: https://github.com/codesport/blockchain-basics/blob/master/contracts/BallotExam.sol

    * Unit Tests for `BallotExam.sol` : https://github.com/codesport/blockchain-basics/blob/master/test/test-ballotExam.js

    * `BallotExam.sol` Harmony Deployment:  https://explorer.pops.one/address/0xb344828c56ec9dc815e572fdfd022a1d69d737e2?activeTab=7


#### Figure 2: Timestamped Screenshots for Contract Deployment, `giveRightToVote` Assignment, and Reverted Voting with BallotExam.sol
![Remix Screenshot for BallotExam.sol](https://github.com/codesport/blockchain-basics/blob/master/images/ballot-remix.png "Remix Screenshot for the modified ballot contract")
**Figure 2: Timestamped Screenshots for Contract Deployment, `giveRightToVote` Assignment, and Reverted Voting with BallotExam.sol**

## Unit Test Screenshot Results for Part B, Solidity Questions 1 - 4

* **`BallotExam.sol` Unit Test Script:** https://github.com/codesport/blockchain-basics/blob/master/test/test-ballotExam.js

* **`Number.sol` Unit Tests Script:** https://github.com/codesport/blockchain-basics/blob/master/test/test-number.js

![Unit Test Screenshot for Questions 1 - 4](https://github.com/codesport/blockchain-basics/blob/master/images/unit-tests-022-04-23-203409.png "Unit Tests")
#### Figure 3: Automated Unit Test Screenshot for Questions 1 - 4

   
## Proof of Contract Deployment Via Hardhat Workflow 

![Contract Deployment Via Hardhat](https://github.com/codesport/blockchain-basics/blob/master/images/deploy-confirmation.png "Contract Deployment Via Hardhat")
#### Figure 4: Contract Deployment Via Hardhat
