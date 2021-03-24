import React from "react";
import "./button.css";

const Button = ({ children, inverted, ...otherProps }) => (
  <button
    className={`${inverted ? "button--inverted" : ""} button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default Button;
