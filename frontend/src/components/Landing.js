import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
//functional component that will render the landing page

function Landing() {
  return (
    <div className="landingPage">
      <h1>Welcome to e-Lect</h1>
      <p>Join the digital revolution of voting</p>
      <div className="landing-page-buttons">
        <Link to="/voting" className="landing-page-button">
          Vote Now
        </Link>

        <Link to="/voterlist" className="landing-page-button">
          Registered Voters
        </Link>
      </div>
    </div>
  );
}

export default Landing;
