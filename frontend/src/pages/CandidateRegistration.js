import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import { VotingContext } from "../context/Voter"; // Importing VotingContext from ../context/Voter.js

import "./CandidateRegistration.css";
const CandidateRegistraion = () => {
  // Defining state variables using useState hook
  const [fileUrl, setFileUrl] = useState(null);
  const [passportPhoto, setPassportPhoto] = useState(null);

  // Defining a state variable using useState hook
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
  });

  // Using useContext hook to get the necessary functions and state variables from VotingContext
  const {
    uploadToIPFSCandidate,
    setCandidate,
    candidateArray,
    getNewCandidate,
  } = useContext(VotingContext);

  // An event handler function that will be called when a file is uploaded
  const handlePassportPhotoChange = async (event) => {
    const file = event.target.files[0]; // Getting the uploaded file
    // console.log("File:", file);
    const url = await uploadToIPFSCandidate(file);
    // console.log("URL:", url);
    setFileUrl(url); // Setting the fileUrl state variable with the URL of the uploaded file
    setPassportPhoto(file);
  };

  // render the page
  return (
    <div className="createVoter">
      {/* Rendering different elements based on the fileUrl state variable */}
      <div className="side_voterInfo">
        {fileUrl && (
          <div className="voterInfo">
            <img src={fileUrl} alt="Voter Image" />
            <div className="voterInfo_paragraph">
              <p>
                {/* <h1>fileURL is not null</h1> */}
                Name: &nbsp;<span>{candidateForm.name}</span>
              </p>
              <p>
                Address: &nbsp;<span>{candidateForm.address.slice(0, 20)}</span>
              </p>
              <p>
                age: &nbsp;<span>{candidateForm.age}</span>
              </p>
            </div>
          </div>
        )}
        {!fileUrl && (
          <div className="sideInfo">
            <div className="sideInfo_box">
              {/* <h4>Register Candidate For Voting</h4> */}
              <p className="e-lect">e-Lect</p>
              <p className="sideInfo_para">The Decentralized Voting platform</p>
            </div>
            <div className="car">
              {candidateArray.map((eL, i) => {
                <div key={i + 1} className="card_box">
                  <div className="image">
                    <img src={eL[3]} alt="Profile Photo" />
                  </div>
                  <div className="card_info">
                    <p>
                      {eL[1]} #{eL[2].toNumber()}
                    </p>
                    <p>{eL[0]}</p>
                    <p>Address: {eL[6].slice(0, 10)}...</p>
                  </div>
                </div>;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="voter">
        <div className="voter_container">
          <h1>Register Candidate</h1>
        </div>
        <div className="input_container">
          {/* Name field */}
          <div className="name-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              // placeholder="First-Name  Middle-Name  Last-Name"
              onChange={(e) =>
                setCandidateForm({ ...candidateForm, name: e.target.value })
              }
            />
          </div>

          {/* Address field */}
          <div className="address-field">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              onChange={(e) => {
                setCandidateForm({ ...fileUrl, address: e.target.value });
              }}
            />
          </div>
          {/* Age field */}
          <div className="age-field">
            <label htmlFor="age">age:</label>
            <input
              type="text"
              id="age"
              onChange={(e) =>
                setCandidateForm({ ...candidateForm, age: e.target.value })
              }
            />
          </div>

          {/* Photo field */}
          <div
            className="photo-field
          "
          >
            <label htmlFor="passportPhoto">Passport Photo:</label>
            <input
              type="file"
              id="passportPhoto"
              accept="image/*"
              onChange={handlePassportPhotoChange}
              required
            />
          </div>
          {/* button  */}
          <button
            type="submit"
            onClick={() => {
              setCandidate(candidateForm, fileUrl);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegistraion;
