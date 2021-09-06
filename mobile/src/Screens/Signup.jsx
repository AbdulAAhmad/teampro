import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../components/CustomButton";
import LabeledInput from "../components/LabeledInput";
import { authenticate } from "../context/auth/auth.actions";
import { useAuthDispatch } from "../context/auth/auth.context";

const SignupScreen = ({ navigation }) => {
  const authDispatch = useAuthDispatch();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleSubmit = async (e) => {
    try {
      let data = await authenticate("/register", authDispatch, formValues);
      if (!data) return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>TeamPro</Text>
        <View style={styles.form}>
          <LabeledInput
            label="Name"
            textContentType="name"
            value={formValues.name}
            onChangeText={(text) => {
              setFormValues((prev) => ({ ...prev, name: text }));
            }}
          />
          <LabeledInput
            label="Email"
            textContentType="emailAddress"
            value={formValues.email}
            onChangeText={(text) => {
              setFormValues((prev) => ({ ...prev, email: text }));
            }}
          />
          <LabeledInput
            label="Password"
            secureTextEntry={true}
            textContentType="newPassword"
            value={formValues.password}
            onChangeText={(text) => {
              setFormValues((prev) => ({ ...prev, password: text }));
            }}
          />
          <LabeledInput
            label="Confirm Password"
            secureTextEntry={true}
            textContentType="newPassword"
            value={formValues.passwordConfirmation}
            onChangeText={(text) => {
              setFormValues((prev) => ({
                ...prev,
                passwordConfirmation: text,
              }));
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title="Continue" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#002E27",
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  title: {
    fontSize: 78,
    color: "#FFFDE0",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  topContainer: {
    width: "100%",
  },
  form: {
    marginTop: 30,
  },
});

export default SignupScreen;
