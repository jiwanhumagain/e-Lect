//Import necessary modules
import React, { useState, useEffect, createContext, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { VotingAddress, VotingAddressABI } from "./constants";
import { seconds } from "@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time/duration";
import { exit } from "process";

// Infura project authentication credentials
const projectId = "2OoInHAMMFhyet8kCoaOnEwyUeY";
const projectSecret = "75229b2d8533c478eb558850795db1aa";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  "base64"
)}`;

// Initialize IPFS client
const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

//function to fetch the contract which allows us to communicate
export const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

// Create context and provider components
export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  // Set up initial state variables using useState hooks
  const votingTitle = "my first dapp";

  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState("");
  const [winnerAddress, setWinnerAddress] = useState(null);
  const initialValue = "No one";
  const [winName, setWinName] = useState(initialValue);
  const [voteCount, setVoteCount] = useState(0);
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);

  //End of candidate data
  const [error, setError] = useState("");
  const highestVote = [];

  //----Voter Section
  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState("");
  const [voterAddress, setVoterAddress] = useState([]);

  // Define helper function to check if a wallet is connected
  const checkIfWalletIsConnected = async () => {
    // Check if Metamask is installed
    if (!window.ethereum) return setError("Please Install Metamask");
    // Request the user's accounts
    const account = await window.ethereum.request({
      method: "eth_accounts",
    });

    // If there are any accounts, set the current account state variable
    if (account.length) {
      setCurrentAccount(account[0]);
    } else {
      setError("Please Install MetaMask and connect,then reload the page");
    }
  };

  // Define helper function to connect a wallet
  const connectWallet = async () => {
    // Check if Metamask is installed
    if (!window.ethereum) return setError("Please Install MetaMask");
    // Request the user's accounts
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // Set the current account state variable
    setCurrentAccount(account[0]);
  };

  // Define helper function to upload a voter image to IPFS
  const uploadToIPFS = async (file) => {
    const subdomain = "https://elect.infura-ipfs.io";
    try {
      const added = await client.add({ content: file });
      // console.log("added.path:", added.path);
      const URL = `${subdomain}/ipfs/${added.path}`;
      return URL;
    } catch (error) {
      console.log("Error uploading file to IPFS.", error);
    }
  };
  // Define helper function to upload a candidate image to IPFS
  const uploadToIPFSCandidate = async (file) => {
    const subdomain = "https://elect.infura-ipfs.io";
    try {
      const added = await client.add({ content: file });
      // console.log("added.path:", added.path);
      const URL = `${subdomain}/ipfs/${added.path}`;
      return URL;
    } catch (error) {
      console.log("Error uploading file to IPFS.", error);
    }
  };

  //CREATE VOTER ---- DEBUGGED ✅
  const createVoter = async (formInput, fileUrl) => {
    try {
      const { name, address, position } = formInput;

      console.log("button return:", name, address, position, fileUrl);

      //Connecting smart contract
      const providerOptions = {};
      const web3Modal = new Web3Modal({
        providerOptions, // required
      });
      const connection = await web3Modal.connect();
      // console.log(web3Modal);
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      // console.log(" create voter contract:", contract);

      //UPLOAD VOTER INFO TO IPFS
      const data = JSON.stringify({ name, address, position, image: fileUrl });
      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      // console.log("VOTER DETAILS IN IPFS URL:", url);

      // console.log("abpout ot use voter right function");
      try {
        const voter = await contract.voterRight(address, name, fileUrl, url);
        voter.wait();
        console.log(`Voter Registered:✅ `);
        console.log(
          `voter data of address ${address} that will be redirected to voterlist:`,
          voter
        );
        alert(
          "Verification Successful✅,you will be registered on the blockchain"
        );
        // voterAddress.push(address);
        // console.log("Voters Address from create Voter:", voterAddress);
        // navigate("/voterlist"); // navigate to the voter list page
      } catch (error) {
        console.log("Couldnt register:", error);
      }
      // navigate("/voterList");
    } catch (error) {
      setError("Error in creating voter", error);
      return false;
    }
  };

  //GET VOTER DATA ---- DEBUGGED✅
  const getAllVoterData = async (event) => {
    //CONNECTING SMART CONTRACT
    try {
      // Initialize web3Modal to connect to user's Web3 wallet

      const providerOptions = {};
      const web3Modal = new Web3Modal({
        providerOptions,
      });
      const connection = await web3Modal.connect();
      //   // console.log("the following object is here:  ");
      //   console.log(web3Modal);
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      // Get contract instance
      const contract = fetchContract(signer);
      console.log("get all voter contract:", contract);

      // GET VOTER DATA
      try {
        // Get list of voter addresses from the contract
        const voterListData = await contract.getVoterList({
          gasLimit: 1000000,
        });
        // voterListData.wait();

        setVoterAddress(voterListData);
        console.log("Voter list from getAllvoterdata:", voterAddress);

        // For each voter in the list, get their data and push to an array
        voterListData.map(async (eL) => {
          const singleVoterData = await contract.getVoterData(eL);
          pushVoter.push(singleVoterData);
          console.log("single voter data:", singleVoterData);
        });
      } catch (error) {
        console.log("Error while getting voter list:", error);
      }
      // GET VOTER LENGTH
      const voterListLength = await contract.getVoterLength();
      // console.log("voterListLengt:", voterListLength.toNumber());
      setVoterLength(voterListLength.toNumber());
    } catch (error) {
      setError("Something went wron fetching data", error);
    }
  };

  //GIVE VOTE --- DEBUGGED✅
  const giveVote = async (id) => {
    try {
      // Get voter address and id from input parameter
      const voterAddress = id.address;
      const voterId = id.id;

      // Initialize web3Modal to connect to user's Web3 wallet
      const providerOptions = {};
      const web3Modal = new Web3Modal({
        providerOptions,
      });
      const connection = await web3Modal.connect();
      //   // console.log("the following object is here:  ");
      //   console.log(web3Modal);
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      // Get contract instance
      const contract = fetchContract(signer);

      // GIVE VOTE
      const votedList = await contract.vote(voterAddress, voterId);
      console.log(votedList);
    } catch (error) {
      console.log(error);
    }
  };

  //---------------------CANDIDATE DATA----------
  // CREATE CANDIDATE ----DEBUGGED✅
  const setCandidate = async (candidateForm, fileUrl) => {
    try {
      // Destructure candidateForm to get name, address, and age
      const { name, address, age } = candidateForm;

      // console.log("button return:", name, address, age, fileUrl);

      //Connecting smart contract
      const providerOptions = {};
      const web3Modal = new Web3Modal({
        providerOptions, // required
      });
      const connection = await web3Modal.connect();
      // console.log(web3Modal);
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      // Get contract instance
      const contract = fetchContract(signer);
      // console.log(" create voter contract:", contract);

      //UPLOAD CANDIDATE INFO TO IPFS
      const data = JSON.stringify({ name, address, image: fileUrl, age });
      const added = await client.add(data);
      const ipfs = `https://infura-ipfs.io/ipfs/${added.path}`;
      // console.log("Candidate DETAILS IN IPFS URL:", url);

      // console.log("abpout ot use Candidate right function");
      try {
        const candidate = await contract.setCandidate(
          address,
          age,
          name,
          fileUrl,
          ipfs,
          {
            gasLimit: 1000000,
          }
        );
        candidate.wait();
        console.log(`candidate Registered:✅ `);
        console.log(
          `candidate data of address ${address} that will be redirected to candidatelist:`,
          candidate
        );
        alert("Candidate Registration Successful✅");
        // voterAddress.push(address);
        // console.log("Voters Address from create Voter:", voterAddress);
        // navigate("/voterlist"); // navigate to the voter list page
      } catch (error) {
        console.log("Couldnt register:", error);
        alert("Candidate Registration Failed❌");
      }
      // navigate("/voterList");
    } catch (error) {
      setError("Error in creating voter", error);
      return false;
    }
  };

  //GET CANDIDATE DATA --- DEBUGGED✅
  // This function is responsible for getting the candidate data from the smart contract
  const getNewCandidate = async (event) => {
    // Connecting to the smart contract
    try {
      const providerOptions = {};
      const web3Modal = new Web3Modal({
        providerOptions,
      });
      const connection = await web3Modal.connect();
      //   // console.log("the following object is here:  ");
      //   console.log(web3Modal);
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      console.log("get all candidate contract:", contract);

      // Fetching all candidate data and pushing it to an array
      const allCandidate = await contract.getCandidate();
      console.log("allCandidate data:", allCandidate);
      allCandidate.map(async (eL) => {
        const singleCandidateData = await contract.getCandidateData(eL);
        pushCandidate.push(singleCandidateData);
        console.log("singleCandidatedata", singleCandidateData);
        candidateIndex.push(singleCandidateData[2].toNumber());
      });

      // Setting the candidate length
      const allCandidateLength = await contract.getCandidateLength();
      setCandidateLength(allCandidateLength.toNumber());
      console.log("candidate length:::", candidateLength);
    } catch (error) {
      setError("Something went wron fetching data", error);
    }
  };

  // Asynchronous function to determine the winner of the election
  const winner = async () => {
    try {
      // Initialize provider options and connect to the Ethereum network using Web3Modal
      const providerOptions = {};
      const web3Modal = new Web3Modal({
        providerOptions,
      });
      const connection = await web3Modal.connect();
      // Get the signer and contract using the connected provider
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      // Get all the candidates from the smart contract
      const allCandidate = await contract.getCandidate();

      // Initialize count and winnerAddress variables
      let count = 0;
      let winnerAddress = null;

      // Loop through all the candidates and determine the one with the most votes
      for (let i = 0; i < allCandidate.length; i++) {
        // Get the vote count and name of the current candidate
        const temp = await contract.voteCount(allCandidate[i]);
        const naam = await contract.winnerName(allCandidate[i]);

        // console.log(`${naam} has vote count:`, temp.toNumber());

        // If the current candidate has more votes than the current count, update the count and winnerAddress
        if (temp.toNumber() > count) {
          count = temp.toNumber();
          setVoteCount(count);
          winnerAddress = allCandidate[i];
        }
      }

      // Get the name of the winning candidate and set winName variable wit the winner's name
      const name = await contract.winnerName(winnerAddress);
      try {
        setWinName(name);
        // alert("winner is ", name);
      } catch (error) {
        console.log(error);
      }
      // alert("THE WINNER IS ", name);
      // console.log(
      //   `The winner of the election is address: ${winnerAddress.slice(
      //     0,
      //     10
      //   )} with vote count ${count}`
      // );
    } catch (error) {
      // Log any errors that occur during the execution of the function
      console.log(
        "Error: Cannot determine the winner of the election: ",
        error
      );
    }
  };
  useEffect(() => {
    winner();
    // getNewCandidate();
    //   getAllVoterData();
  }, []);
  return (
    <VotingContext.Provider
      value={{
        votingTitle,
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIPFS,
        createVoter,
        getAllVoterData,
        giveVote,
        setCandidate,
        error,
        winName,
        voterArray,
        voterLength,
        voterAddress,
        currentAccount,
        winner,
        voteCount,
        candidateLength,
        candidateArray,
        getNewCandidate,
        uploadToIPFSCandidate,
        // winner,
        winnerAddress,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

const Voter = () => {
  const { votingTitle } = useContext(VotingContext);
  return <div>{votingTitle}</div>;
};

export default Voter;
