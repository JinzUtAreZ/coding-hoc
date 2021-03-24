import React from "react";
import "./form-input.css";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="inputgroup">
    <input
      className="inputgroup__form-input"
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } inputgroup__form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
