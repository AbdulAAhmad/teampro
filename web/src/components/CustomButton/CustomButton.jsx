import React from "react";
import "./CustomButton.css";

const CustomButton = ({ children, variant, ...rest }) => {
  return (
    <button {...rest} className={`custom-button ${variant ? variant : ""}`}>
      {children}
    </button>
  );
};

export default CustomButton;
