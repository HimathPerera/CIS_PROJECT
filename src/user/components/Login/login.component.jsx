import React from "react";
import "./login.style.css";

import Button from "../../../shared/components/UIElements/custom-button/custom-button.component";
import Input from "../../../shared/components/UIElements/custom-input/custom-input.component";

export default function Login() {
  return (
    <div className="sign-in">
      <h2>I ALREADY HAVE AN ACCOUNT</h2>
      <span>Sign in with your Email and Password</span>

      <form>
        <Input
          name="email"
          type="email"
          id="signinEmail"
          label="email"
          // data={cred.signinEmail}
          required
          // onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          id="signinPassword"
          label="password"
          // data={cred.signinPassword}
          required
          // onChange={handleChange}
        />
        <div className="buttons">
          <Button>Sign in</Button>
        </div>
      </form>
    </div>
  );
}
