import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import Card from "../../../shared/components/UIElements/Card";
import Input1 from "../../../shared/components/FormEliments/input.custom.component";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../../util/validators";
import { useForm } from "../../../hooks/form-hook";
import "./login.style.css";
import Button from "../../../shared/components/UIElements/custom-button/custom-button.component";
import { AuthContext } from "../../../context/auth-context";
import LoadingSpinner from "../../../shared/components/loader/loader.component";
import ErrorModal from "../../../shared/components/errors/ErrorModal";

export default function Login() {
  const auth = useContext(AuthContext);
  //loging and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //listening to login or signup state
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  //form submission

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isLoginMode) {
      try {
        setError(null);
        const response = await fetch(
          "http://localhost:5000/authenticate/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData = await response.json();

        if (response.ok && responseData.admin === true) {
          setIsLoading(false);
          auth.admin(responseData.token, responseData.admin);
          console.log("logged in as a admin");
        } else if (response.ok && responseData.admin === false) {
          setIsLoading(false);
          auth.login(responseData.token, responseData.admin);
          console.log("logged in as a user");
        } else {
          throw new Error(responseData.message);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "something went wrong");
      }
    } else {
      try {
        setError(null);
        const response = await fetch(
          "http://localhost:5000/authenticate/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              mobile: formState.inputs.mobile.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login(responseData.token, responseData.admin);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "something went wrong");
      }
    }
    setIsLoading(false);
  };

  //switch login & signup
  const switchModeHandler = (e) => {
    e.preventDefault();
    if (!isLoginMode) {
      setFormData(
        // { ...formState.inputs, name: undefined, mobile: undefined },
        formState.inputs.email && formState.inputs.password
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { isValid: false, value: "" },
          mobile: { isValid: false, value: "" },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  //error handrler
  const clearError = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Card className="auth-container">
        <h2>{isLoginMode ? "Login required" : "signup required"}</h2>

        <form>
          {!isLoginMode && (
            <>
              <Input1
                label="name"
                id="name"
                type="text"
                placeholder="Enter name"
                errorText="please enter a valid name"
                validators={[VALIDATOR_MINLENGTH(3)]}
                onInput={inputHandler}
              />
              <Input1
                label="mobile number"
                id="mobile"
                type="text"
                placeholder="Enter mobile number"
                errorText="please enter a valid number"
                validators={[VALIDATOR_MINLENGTH(10)]}
                onInput={inputHandler}
              />
            </>
          )}
          <Input1
            label="email"
            id="email"
            type="text"
            placeholder="Enter email"
            errorText="please enter a valid email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input1
            label="password"
            id="password"
            type="password"
            placeholder="Enter password"
            errorText="please enter a valid password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
            onClick={handleAuth}
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
          <hr />
          <Button inverted onClick={switchModeHandler}>
            {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
          {auth.isLoggedIn && <Redirect to="/" />}
          {auth.isAdmin && <Redirect to="/authenticate/admin" />}
        </form>
      </Card>
    </>
  );
}
