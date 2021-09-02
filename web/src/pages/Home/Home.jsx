import React from "react";
import "./Home.css";

import CustomButton from "../../components/CustomButton/CustomButton";
import MessageCard from "../../components/MessageCard/MessageCard";

const Home = () => {
  return (
    <div className="home-page">
      <div className="side-bar">
        <h1>TeamPro</h1>
        <CustomButton>Sign Out</CustomButton>
      </div>
      <div className="home-page-body">
        <MessageCard />
      </div>
    </div>
  );
};

export default Home;
