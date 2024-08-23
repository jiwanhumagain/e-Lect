import React from "react";
// Internal import
import "./VoterCard.css";

const VoterCard = ({ voterArray }) => {
  return (
    <div className="card">
      {/* Loop through the voterArray and create a card for each voter */}
      {voterArray.map((eL, i) => (
        <div className="card_box">
          <div className="image">
            {/* Display the profile photo of the voter */}
            <img src={eL[3]} alt="profile photo" />
          </div>
          <div className="card_info">
            <h2>
              {/* Display the name and ID number of the voter */}
              {eL[2]} #{eL[0].toNumber()}
            </h2>
            <p>Address:{eL[4].slice(0, 10)}...</p>
            <p>Details</p>
            <p className="voterCardStyle.vote_status">
              {/* Display the vote status of the voter */}
              {eL[5] === true ? "You Already Voted" : "Not Voted"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterCard;
