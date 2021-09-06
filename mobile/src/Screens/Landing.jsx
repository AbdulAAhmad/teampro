import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../components/CustomButton";

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>TeamPro</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Sign Up"
          onPress={() => navigation.push("Signup")}
        />
        <CustomButton
          title="Sign In"
          variant="secondary"
          onPress={() => navigation.push("Signin")}
        />
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
  },
  buttonContainer: {
    width: "100%",
  },
});

export default LandingScreen;
