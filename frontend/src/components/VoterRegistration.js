// Import necessary packages
import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ethers, providers } from "ethers";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";
// Import custom components and context
import "./VoterRegistration.css";
import { VotingContext, VotingProvider, fetchContract } from "../context/Voter";

// import dotenv from "dotenv";
// dotenv.config();

const RegisterPage = () => {
  // Initialize necessary state variables
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    email: "",
    passportNumber: "",
    dateOfBirth: "",
  });

  const { uploadToIPFS, createVoter, voterArray, getAllVoterData } =
    useContext(VotingContext);

  // Handle the change event when user selects passport photo
  const handlePassportPhotoChange = async (event) => {
    const file = event.target.files[0];
    // console.log("File:", file);
    const url = await uploadToIPFS(file);
    // console.log("URL:", url);
    setFileUrl(url);
    setPassportPhoto(file);
  };

  // Get all voter data from the context on component mount
  // useEffect(() => {
  //   getAllVoterData();
  // }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare voter data to send for verification
    const data1 = {
      name: formInput.name,
      passportNumber: formInput.passportNumber,
      dateOfBirth: formInput.dateOfBirth,
    };

    // Make a POST request to the backend to verify the voter's information
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });

    // Parse response data and check if verification was successful
    const responseData = await response.json();
    const isVerified = responseData.verified;

    // If voter is verified, proceed with registration
    if (isVerified) {
      alert(
        "Verification Successful✅,you will be registered on the blockchain"
      );
    } else {
      alert(
        "❗Verification failed. Please check your information and try again."
      );
    }
  };

  // Render the component
  return (
    <div className="register-container">
      <h1 className="register-title">Voter Authorization</h1>

      <form onSubmit={handleSubmit} className="register-form">
        {/* Name field */}
        <div className="name-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
            required
          />
        </div>

        {/* Email field */}
        <div className="email-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) =>
              setFormInput({ ...formInput, email: e.target.value })
            }
            required
          />
        </div>

        {/* Address field */}
        <div className="address-field">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            onChange={(e) => {
              setFormInput({ ...formInput, address: e.target.value });
            }}
            required
          />
        </div>

        {/* Passport number field */}
        <div className="passport-field">
          <label htmlFor="passportNumber">Passport Number:</label>
          <input
            type="text"
            id="passportNumber"
            onChange={(e) =>
              setFormInput({ ...formInput, passportNumber: e.target.value })
            }
            required
          />
        </div>

        {/* Passport photo upload field */}
        <div className="photo-field">
          <label htmlFor="passportPhoto">Passport Photo:</label>
          <input
            type="file"
            id="passportPhoto"
            accept="image/*"
            onChange={handlePassportPhotoChange}
            required
          />
        </div>

        {/* Date of birth field */}
        <div className="dob-field">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            onChange={(e) =>
              setFormInput({ ...formInput, dateOfBirth: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          onClick={() => {
            createVoter(formInput, fileUrl);

            navigate("/voting");
          }}
        >
          Authorize
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
