import React from "react";
import "./welcome.style.css";

import WelcomeContent from "../components/welcomeContent.component";
import Button from "../../shared/components/UIElements/custom-button/custom-button.component";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="section_wrapper">
      <img
        src="./img/logo_arpico_supercenter.png"
        alt="arpico logo"
        className="welcome_logo"
      />
      <WelcomeContent />
      <Link to="/questions" className="link">
        <Button>Start</Button>
      </Link>
    </div>
  );
}
