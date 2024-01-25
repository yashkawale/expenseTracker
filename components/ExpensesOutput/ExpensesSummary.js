import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const ExpensesSummary = ({ timeline, expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.timeline}>{timeline}</Text>
      <Text style={styles.total}>Total: ₹{totalExpenses.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.darkBrown,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },

  timeline: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.beige,
  },

  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.beige,
  },
});
