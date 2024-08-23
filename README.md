# e-Lect
# Decentralized Voting Platform
This is a decentralized voting platform built using React, Solidity, and Hardhat. The platform allows users to register as voters, verify their identity, and cast their vote for a candidate of their choice. The platform also allows administrators to create new candidates and monitor the voting process.

![image](https://github.com/KarkiAnmol/Blockchain-eVoting/assets/97075159/82ae12e5-5ca9-4f79-b3a1-c2b4831245bc)
![image](https://github.com/KarkiAnmol/Blockchain-eVoting/assets/97075159/60b2fd3b-74ed-4896-a9fb-62312fec6422)
![image](https://github.com/KarkiAnmol/Blockchain-eVoting/assets/97075159/f34756e3-192c-481b-891e-1f0225c5db8a)
![image](https://github.com/KarkiAnmol/Blockchain-eVoting/assets/97075159/c4ffbce1-1385-42ed-80ea-6126f2c6601e)
![image](https://github.com/KarkiAnmol/Blockchain-eVoting/assets/97075159/e7f995a3-d840-4dad-9100-1eb982c0c178)
![image](https://github.com/KarkiAnmol/Blockchain-eVoting/assets/97075159/ebf047bb-02bb-4961-858e-ca7a83be57d9)
![image](https://github.com/KarkiAnmol/Blockchain-eVoting/assets/97075159/1ea9ffa4-3041-4e3b-9c56-03d418345e74)






# Features
The system includes the following features:

⦾ Voter verification: Voters must be verified using their unique ID before being allowed to cast their votes.

⦾ Candidate registration: Only the admin can create candidates and add them to the candidate list.

⦾ Secure voting: Voters can only vote once and their vote is stored on the blockchain, making it tamper-proof and transparent.

⦾ Winner determination: The winner of the election is determined automatically after a fixed interval of time has passed since the voting period ended.

⦾ Voter anonymity: Voters' identities are kept anonymous on the blockchain, ensuring the privacy of their vote.


# Getting Started

```shell
Note: To use this platform, you need to have Metamask installed on your browser.
```
To get started with the project, clone the repository to your local machine:



```shell
git clone https://github.com/KarkiAnmol/Blockchain-eVoting
```
Next, install the dependencies:

```shell
cd Blockchain-eVoting
npm install

```
To start the local blockchain network, run the following command on the project root directory:
```shell
npx hardhat node # This will start a local blockchain network


```
To deploy the contract to a local blockchain network, run:


```shell
npx hardhat compile # This will compile the Solidity contracts
npx hardhat run scripts/deploy.js --network localhost # This will deploy the contracts to the local network

```
Once the contract is deployed, start the React app by running the command on the frontend directory:


```shell
cd frontend
npm start

```
Lastly, to start the backend server, run the following command on the backend directory:

```shell
cd backend
nodemon
```

# How to use
To use the platform, open your browser and navigate to http://localhost:3000/, then follow these steps:

1. Verify your voter ID using the provided function.

2. Once verified, you will be able to view the list of candidates.

3. Select your preferred candidate and cast your vote.

4. After the voting period has ended, the winner will be automatically determined and displayed on the voting page.

# Contributing
If you would like to contribute to the project, please create a pull request with your changes. Before submitting a pull request, please make sure to:

Run this command to check for any linting errors

```shell
npm run lint
```
Run this command to make sure all tests pass
```shell
npm test
```
# License
This project is licensed under the MIT license. See the LICENSE file for more details.
