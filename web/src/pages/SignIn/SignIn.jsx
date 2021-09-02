import React, { useState } from "react";
import "./SignIn.css";

import BackButton from "../../components/BackButton/BackButton";
import CustomButton from "../../components/CustomButton/CustomButton";
import LabeledInput from "../../components/LabeledInput/LabeledInput";

import { useHistory } from "react-router-dom";
import { authenticate } from "../../context/auth/auth.actions";
import { useAuthDispatch, useAuthState } from "../../context/auth/auth.context";
import FlashCard from "../../components/FlashCard/FlashCard";

const SignIn = () => {
  const history = useHistory();

  const authDispatch = useAuthDispatch();
  const { errorMessage, loading } = useAuthState();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = await authenticate("/signin", authDispatch, formValues);
      if (!data) return;
      if (data.success) history.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in-page">
      {loading && <FlashCard text="Loading..." />}
      {errorMessage && <FlashCard text={errorMessage} />}
      <BackButton onClick={() => history.goBack()} />
      <h1>TeamPro</h1>
      <form action="" onSubmit={handleSubmit}>
        <LabeledInput
          required
          type="email"
          value={formValues.email}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, email: e.target.value }))
          }
        >
          Email
        </LabeledInput>
        <LabeledInput
          required
          type="password"
          value={formValues.password}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, password: e.target.value }))
          }
        >
          Password
        </LabeledInput>
        <CustomButton type="submit" variant="primary" id="submit-button">
          Continue
        </CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
