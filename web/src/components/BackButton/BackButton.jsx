import React from "react";
import "./BackButton.css";

import { FaCaretLeft } from "react-icons/fa";

const BackButton = ({ ...rest }) => {
  return (
    <button {...rest} className="back-button">
      <FaCaretLeft className="icon" />
    </button>
  );
};

export default BackButton;
