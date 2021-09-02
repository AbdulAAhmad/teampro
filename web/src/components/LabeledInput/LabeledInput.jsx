import React from "react";
import "./LabeledInput.css";

const LabeledInput = ({ type = "text", children }) => {
  return (
    <label className="labeled-input">
      {children}
      <input type={type} />
    </label>
  );
};

export default LabeledInput;
