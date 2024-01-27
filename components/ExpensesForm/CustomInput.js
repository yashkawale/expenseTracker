import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const CustomInput = ({ label, inputConfig, style, inValid }) => {
  const inputStyles = [styles.input];

  if (inputConfig && inputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (inValid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...inputConfig} style={inputStyles} />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.darkBrown,
  },

  input: {
    backgroundColor: Colors.brown,
    color: Colors.beige,
    fontSize: 20,
    borderRadius: 4,
    padding: 4,
  },

  inputMultiline: {
    height: 100,
  },

  invalidInput: {
    backgroundColor: Colors.red,
  },
});
