import React from "react";
import CustomLink from "../../components/CustomLink/CustomLink";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <h1>TeamPro</h1>
      <CustomLink to="/signup" type="primary">
        Sign Up
      </CustomLink>
      <CustomLink to="/signin">Sign In</CustomLink>
    </div>
  );
};

export default Landing;
