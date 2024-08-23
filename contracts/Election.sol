//A contract that defines the rules and procedures for the election, including candidate registration, voter registration, and vote counting.
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing Counters library from OpenZeppelin contracts
import "@openzeppelin/contracts/utils/Counters.sol";

// Importing console library from Hardhat
import "hardhat/console.sol";

contract Create {
    // Using Counters library from OpenZeppelin contracts
    using Counters for Counters.Counter;

    // Counters for keeping track of candidate and voter IDs
    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    // Address of the voting organizer
    address public votingOrganizer;
    // Array of candidate addresses and mapping of candidate addresses to candidates
    address[] public candidateAddress;
    mapping(address => Candidate) public candidates;
    // Array of voted voter addresses, array of voter addresses, and mapping of voter addresses to voters
    address[] public votedVoters;
    address[] public votersAddress;
    mapping(address => Voter) public voters;

    // Candidate struct definition
    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voterCount;
        address _address;
        string ipfs;
    }

    // Event for candidate creation
    event CandidateCreate(
        uint256 indexed candidateId,
        address _address,
        string age,
        string name,
        string image,
        uint256 voterCount,
        string ipfs
    );

    // Voter struct definition
    struct Voter {
        uint256 voter_voterid;
        string voter_name;
        // string voter_id;
        string voter_image;
        address voter_address;
        uint256 voter_allowed;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
    }

    // Event for voter creation
    event VoterCreate(
        uint256 indexed voter_voterid,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

    // Constructor function that sets the voting organizer to the contract deployer
    constructor() {
        votingOrganizer = msg.sender;
    }

    // Function for the voting organizer to add a new candidate
    function setCandidate(
        address _address,
        string memory _age,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        // require(
        //     votingOrganizer == msg.sender,
        //     "Only Organizer can authorize candidate "
        // );

        // Increment the candidate ID counter and get the current ID
        _candidateId.increment();
        uint256 idNumber = _candidateId.current();

        // Create a new Candidate struct and add it to the candidates mapping
        Candidate storage candidate = candidates[_address];
        candidate._address = _address;
        candidate.age = _age;
        candidate.name = _name;
        candidate.candidateId = idNumber;
        candidate.image = _image;
        candidate.voterCount = 0;
        candidate.ipfs = _ipfs;

        // Add the candidate address to the candidateAddress array
        candidateAddress.push(_address);

        // Emit the CandidateCreate event
        emit CandidateCreate(
            idNumber,
            _address,
            _age,
            _name,
            _image,
            candidate.voterCount,
            _ipfs
        );
    }

    // Function to get all candidate addresses
    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    // Function to get the number of candidates
    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    // Function to get candidate data
    function getCandidateData(
        address _address
    )
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            string memory,
            uint256,
            string memory,
            address
        )
    {
        return (
            candidates[_address].age,
            candidates[_address].name,
            candidates[_address].candidateId,
            candidates[_address].image,
            candidates[_address].voterCount,
            candidates[_address].ipfs,
            candidates[_address]._address
        );
    }

    //  Returns the vote count of a candidate with the specified Ethereum address.
    function voteCount(address _address) public view returns (uint256) {
        return (candidates[_address].voterCount);
    }

    //  Returns the name of a candidate with the specified Ethereum address.
    function winnerName(address _address) public view returns (string memory) {
        return (candidates[_address].name);
    }

    // Function for voting organizer to grant voter rights
    function voterRight(
        address _address,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        // Only the voting organizer can register voters
        // require(
        //     votingOrganizer == msg.sender,
        //     "only voting organizer can register voters"
        // );

        _voterId.increment();

        uint256 idNumber = _voterId.current();
        Voter storage voter = voters[_address];
        // require(voter.voter_allowed == 0);

        // Set the voter information
        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_image = _image;
        voter.voter_address = _address;
        voter.voter_voterid = idNumber;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;
        votersAddress.push(_address);

        // Emit an event to indicate that a new voter has been registered
        emit VoterCreate(
            idNumber,
            _name,
            _image,
            _address,
            voter.voter_allowed,
            voter.voter_voted,
            voter.voter_vote,
            _ipfs
        );
    }

    // Function for voters to cast their votes
    function vote(
        address _candidateAddress,
        uint256 _candidateVoteId
    ) external {
        Voter storage voter = voters[msg.sender];

        // Check if the voter has already voted
        require(!voter.voter_voted, "You have already voted");

        // Check if the voter has the right to vote
        require(voter.voter_allowed != 0, "You have no right to vote");

        // Record the vote and update the voter information
        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;
        votedVoters.push(msg.sender);
        candidates[_candidateAddress].voterCount += voter.voter_allowed;
    }

    // Function to get the number of registered voters
    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    // Function to get voter data
    function getVoterData(
        address _address
    )
        public
        view
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            address,
            bool,
            string memory
        )
    {
        return (
            voters[_address].voter_voterid,
            voters[_address].voter_allowed,
            voters[_address].voter_name,
            voters[_address].voter_image,
            voters[_address].voter_address,
            voters[_address].voter_voted,
            voters[_address].voter_ipfs
        );
    }

    // Function to get the list of voters who have voted
    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    // Function that returns an array of addresses representing all the registered voters in the voting system
    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }
}
