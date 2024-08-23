import React from "react";
import "./HowItWorks.css";
const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      <h1 className="how-it-works-page__title">How It Works</h1>
      <p className="how-it-works-page__paragraph">
        e-Lect is a decentralized voting platform that allows users to register
        as voters, verify their identity, and cast their vote for a candidate of
        their choice. The platform also allows administrators to create new
        candidates and monitor the voting process.
      </p>

      <h2 className="how-it-works-page__subtitle">How to Use</h2>
      <ol className="how-it-works-page__list">
        <li className="how-it-works-page__list-item">
          Verify your voter ID using the provided function.
        </li>
        <li className="how-it-works-page__list-item">
          Once verified, you will be able to view the list of candidates.
        </li>
        <li className="how-it-works-page__list-item">
          Select your preferred candidate and cast your vote.
        </li>
        <li className="how-it-works-page__list-item">
          After the voting period has ended, the winner will be automatically
          determined and displayed on the voting page.
        </li>
      </ol>
    </div>
  );
};

export default HowItWorks;
