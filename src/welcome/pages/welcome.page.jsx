import React, { useContext } from "react";
import "./welcome.style.css";

import WelcomeContent from "../components/welcomeContent.component";
import Button from "../../shared/components/UIElements/custom-button/custom-button.component";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

export default function Welcome() {
  const auth = useContext(AuthContext);
  return (
    <div className="section_wrapper">
      <img
        src="./img/logo_arpico_supercenter.png"
        alt="arpico logo"
        className="welcome_logo"
      />
      <WelcomeContent />
      <Link
        to={auth.isLoggedIn ? "/surway/questions" : "/authenticate"}
        className="link"
      >
        <Button>Start</Button>
      </Link>
    </div>
  );
}
