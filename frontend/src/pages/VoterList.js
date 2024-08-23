// Import necessary modules
import React, { useState, useEffect, useContext } from "react";
import { VotingProvider } from "../context/Voter";
import { VotingContext, fetchContract } from "../context/Voter";
import VoterCard from "../components/VoterCard";
import "./VoterList.css";

// Define the VoterList component
const VoterList = () => {
  // Get the getAllVoterData function and voterArray from the VotingContext
  const { getAllVoterData, voterArray } = useContext(VotingContext);

  // Call getAllVoterData when the component mounts
  useEffect(() => {
    getAllVoterData();
  }, []);

  // Render the VoterList component

  return (
    <div className="voterList">
      <VoterCard voterArray={voterArray} />
    </div>
  );
};

// Export the VoterList component
export default VoterList;
