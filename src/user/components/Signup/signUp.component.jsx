import React from "react";
import "./signUp.style.css";

import Button from "../../../shared/components/UIElements/custom-button/custom-button.component";
import Input from "../../../shared/components/UIElements/custom-input/custom-input.component";

export default function SignUp() {
  return (
    <div className="sign-up">
      <h2>I'M NOT A MEMBER YET</h2>
      <span>Sign up with your Email</span>

      <form>
        <Input
          name="email"
          type="email"
          id="signupEmail"
          label="email"
          // data={cred.signupEmail}
          required
          // onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          id="signupPassword"
          label="password"
          // data={cred.signupPassword}
          required
          // onChange={handleChange}
        />
        <Input
          name="User Name"
          type="password"
          id="User Name"
          label="User Name"
          // data={cred.confirmPassword}
          required
          // onChange={handleChange}
        />
        <Input
          name=" Mobile Number"
          type="text"
          id="Mobile Number"
          label=" Mobile Number"
          // data={cred.Name}
          required
          // onChange={handleChange}
        />

        <div className="buttons">
          <Button>Sign Up</Button>
        </div>
      </form>
    </div>
  );
}
