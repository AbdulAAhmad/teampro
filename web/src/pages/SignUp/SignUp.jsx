import React from "react";
import "./SignUp.css";

import CustomButton from "../../components/CustomButton/CustomButton";
import LabeledInput from "../../components/LabeledInput/LabeledInput";

import { useHistory } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";

const SignUp = () => {
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
    <div className="sign-up-page">
      <BackButton onClick={() => history.goBack()} />
      <h1>TeamPro</h1>
      <form action="" onSubmit={handleSubmit}>
        <LabeledInput>Name</LabeledInput>
        <LabeledInput>Email</LabeledInput>
        <LabeledInput type="password">Password</LabeledInput>
        <LabeledInput type="password">Confirm Password</LabeledInput>
        <CustomButton type="submit" variant="primary" id="submit-button">
          Continue
        </CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
