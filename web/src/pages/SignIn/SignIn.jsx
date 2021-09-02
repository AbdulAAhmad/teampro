import React from "react";
import "./SignIn.css";

import BackButton from "../../components/BackButton/BackButton";
import CustomButton from "../../components/CustomButton/CustomButton";
import LabeledInput from "../../components/LabeledInput/LabeledInput";

import { useHistory } from "react-router-dom";

const SignIn = () => {
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.replace("/home");

    // try {
    //   let response = await authenticate(AUTH_LOGIN_URL, dispatch, formValues);
    //   if (!response.sessionId) return;
    //   history.push("/home");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="sign-in-page">
      <BackButton onClick={() => history.goBack()} />
      <h1>TeamPro</h1>
      <form action="" onSubmit={handleSubmit}>
        <LabeledInput>Email</LabeledInput>
        <LabeledInput type="password">Password</LabeledInput>
        <CustomButton type="submit" variant="primary" id="submit-button">
          Continue
        </CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
