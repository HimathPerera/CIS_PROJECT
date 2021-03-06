import React from "react";
import "./custom-input.style.scss";

export default function Input({ handleChange, label, ...otherProps }) {
  return (
    <div className="group">
      <input onChange={handleChange} className="form-input" {...otherProps} />
      {label ? (
        <label
          className={`${otherProps.data ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}
