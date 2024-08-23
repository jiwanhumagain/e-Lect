import React from "react";

const Features = () => {
  return (
    <div>
      {" "}
      <h2 className="how-it-works-page__subtitle">Features</h2>
      <ul className="how-it-works-page__list">
        <li className="how-it-works-page__list-item">
          Voter verification: Voters must be verified using their unique ID
          before being allowed to cast their votes.
        </li>
        <li className="how-it-works-page__list-item">
          Candidate registration: Only the admin can create candidates and add
          them to the candidate list.
        </li>
        <li className="how-it-works-page__list-item">
          Secure voting: Voters can only vote once and their vote is stored on
          the blockchain, making it tamper-proof and transparent.
        </li>
        <li className="how-it-works-page__list-item">
          Winner determination: The winner of the election is determined
          automatically after a fixed interval of time has passed since the
          voting period ended.
        </li>
        <li className="how-it-works-page__list-item">
          Voter anonymity: Voters' identities are kept anonymous on the
          blockchain, ensuring the privacy of their vote.
        </li>
      </ul>
    </div>
  );
};

export default Features;
