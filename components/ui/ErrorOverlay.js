import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ErrorOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>An error occur!!</Text>
      <Text style={styles.error}>{message}</Text>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    color: "red",
  },

  error: {
    fontSize: 18,
  },
});
