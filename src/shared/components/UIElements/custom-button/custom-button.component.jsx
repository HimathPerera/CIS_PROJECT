import React from "react";
import "./custom-button.style.scss";

export default function Button({
  children,
  isgoogle,
  inverted,
  disabled,
  ...otherProps
}) {
  return (
    <button
      className={`${inverted ? "inverted" : ""}
      ${isgoogle ? "google-sign-in" : ""} ${
        disabled ? "disabled" : ""
      } custom-button`}
      {...otherProps}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
