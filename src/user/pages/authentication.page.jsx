import React from "react";
import "./authentication.style.css";

import Login from "../components/Login/login.component";

export default function Authentication() {
  return (
    <div className="auth">
      <div className="image-container"></div>
      <Login />
    </div>
  );
}
