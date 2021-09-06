import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const LabeledInput = ({ label = "", onChange, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput style={styles.input} onChange={onChange} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  inputLabel: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 18,
    color: "#FFFDE0",
  },
  input: { backgroundColor: "white", padding: 20, borderRadius: 10 },
});

export default LabeledInput;
