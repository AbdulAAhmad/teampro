import React, { useState } from "react";
import "./SignUp.css";

import CustomButton from "../../components/CustomButton/CustomButton";
import LabeledInput from "../../components/LabeledInput/LabeledInput";

import { useHistory } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import { authenticate } from "../../context/auth/auth.actions";
import { useAuthDispatch, useAuthState } from "../../context/auth/auth.context";
import FlashCard from "../../components/FlashCard/FlashCard";

const SignUp = () => {
  const history = useHistory();

  const authDispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = await authenticate("/register", authDispatch, formValues);
      if (!data) return;
      history.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-page">
      {loading && <FlashCard text="Loading..." />}
      {errorMessage && <FlashCard text={errorMessage} />}
      <BackButton onClick={() => history.goBack()} />
      <h1>TeamPro</h1>
      <form action="" onSubmit={handleSubmit}>
        <LabeledInput
          required
          type="text"
          value={formValues.name}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
        >
          Name
        </LabeledInput>
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
        <LabeledInput
          type="password"
          required
          value={formValues.passwordConfirmation}
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              passwordConfirmation: e.target.value,
            }))
          }
        >
          Confirm Password
        </LabeledInput>
        <CustomButton type="submit" variant="primary" id="submit-button">
          Continue
        </CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
