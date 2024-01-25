import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Colors } from "../../constants/Colors";

const ExpensesOutput = ({ expenses, expensesTime }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} timeline={expensesTime} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.beige,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});
