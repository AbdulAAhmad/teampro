import React from "react";
import "./LabeledInput.css";

const LabeledInput = ({ type = "text", children, ...rest }) => {
  return (
    <label className="labeled-input">
      {children}
      <input type={type} {...rest} />
    </label>
  );
};

export default LabeledInput;
