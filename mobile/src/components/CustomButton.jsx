import React from "react";
import { Pressable, Text, StyleSheet, PermissionsAndroid } from "react-native";

const CustomButton = ({ title = "", onPress, variant = "primary" }) => {
  const pressableStyle =
    variant === "primary"
      ? styles.button
      : [styles.button, styles.secondaryButton];
  const titleStyle =
    variant === "primary"
      ? styles.buttonTitle
      : [styles.buttonTitle, styles.secondaryButtonTitle];

  return (
    <Pressable style={pressableStyle} onPress={onPress}>
      <Text style={titleStyle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFDE0",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFDE0",
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: "#002E27",
    borderWidth: 2,
  },
  buttonTitle: {
    fontSize: 22,
    textAlign: "center",
    color: "#002E27",
  },
  secondaryButtonTitle: {
    color: "#FFFDE0",
  },
});

export default CustomButton;
