import React from "react";
import "./authentication.style.css";

import Login from "../components/Login/login.component";
import SignUp from "../components/Signup/signUp.component";

export default function Authentication() {
  return (
    <div className="auth">
      <Login />
      <div className="line"></div>
      <SignUp />
    </div>
  );
}
