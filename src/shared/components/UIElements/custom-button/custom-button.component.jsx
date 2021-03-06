import React from "react";
import "./custom-button.style.scss";

export default function Button({
  children,
  isgoogle,
  inverted,
  ...otherProps
}) {
  return (
    <button
      className={`${inverted ? "inverted" : ""}
      ${isgoogle ? "google-sign-in" : ""} custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
