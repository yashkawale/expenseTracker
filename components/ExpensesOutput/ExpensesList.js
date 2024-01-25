import { FlatList, StyleSheet, View, Text } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  const renderItem = (itemData) => {
    return (
      <ExpenseItem
        id={itemData.item.id}
        description={itemData.item.description}
        date={itemData.item.date}
        amount={itemData.item.amount}
      />
    );
  };
  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
