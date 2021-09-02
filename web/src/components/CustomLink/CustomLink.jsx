import React from "react";
import "./CustomLink.css";

import { Link } from "react-router-dom";

const CustomLink = ({ children, type, ...rest }) => {
  return (
    <Link {...rest} className={`custom-link ${type ? type : ""}`}>
      {children}
    </Link>
  );
};

export default CustomLink;
