import React, { useReducer, useEffect } from "react";

import { validate } from "../../../util/validators";
import "./input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
};

export default function Input1(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    isValid: false,
    value: "",
    isTouch: false,
  });

  const { onInput, id } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const changeHandler = (event) => {
    dispatch({
      val: event.target.value,
      validators: props.validators,
      type: "CHANGE",
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouch && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {!inputState.isValid && inputState.isTouch && <p>{props.errorText}</p>}
      <input
        type="text"
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    </div>
  );
}
