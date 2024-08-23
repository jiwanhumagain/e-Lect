import React from "react";
// Importing the Card component's CSS styles
import "./card.css";

// Define the Card component
const Card = ({ candidateArray, giveVote }) => {
  // Render the Card component
  return (
    <div className="card">
      {/* Loop through each candidate in the candidateArray prop */}
      {candidateArray.map((el, i) => (
        <div key={`${i}-${el[2].toNumber()}`} className="card_box">
          <div className="image">
            {/* Display the candidate's profile picture */}

            <img src={el[3]} alt="profile" />
          </div>
          <div className="card_info">
            {/* Display the candidate's name and ID */}
            <h2>
              {el[1]}#{el[2].toNumber()}
            </h2>
            <p>{el[0]}</p>
            {/* Display the first 10 characters of the candidate's address */}
            <p>Address: {el[6].slice(0, 10)}...</p>
            <p className="total">Total Vote</p>
          </div>
          <div className="card_vote">
            {/* Display the candidate's vote count */}
            <p> {el[4].toNumber()}</p>
          </div>

          <div className="card_button">
            {/* Create a button with the text "Give Vote" */}
            <button
              // Attach a click event listener that calls the giveVote function with an object containing the candidate's ID and address
              onClick={() => giveVote({ id: el[2].toNumber(), address: el[6] })}
            >
              Give Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
// Export the Card component
export default Card;
