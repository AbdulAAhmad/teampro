import React from "react";
import "./Home.css";

import CustomButton from "../../components/CustomButton/CustomButton";
import MessageCard from "../../components/MessageCard/MessageCard";
import { useAuthDispatch } from "../../context/auth/auth.context";
import { signout } from "../../context/auth/auth.actions";

const Home = () => {
  const authDispatch = useAuthDispatch();

  return (
    <div className="home-page">
      <div className="side-bar">
        <h1>TeamPro</h1>
        <CustomButton onClick={() => signout(authDispatch)}>
          Sign Out
        </CustomButton>
      </div>
      <div className="home-page-body">
        <MessageCard />
      </div>
    </div>
  );
};

export default Home;
