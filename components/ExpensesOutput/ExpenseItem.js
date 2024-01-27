import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({ id, description, date, amount }) => {
  const navigation = useNavigation();

  const handleExpenseDetails = () => {
    navigation.navigate("ManageExpenses", {
      itemId: id,
    });
  };
  return (
    <Pressable
      onPress={handleExpenseDetails}
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
    >
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date.toDateString()}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>₹{amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: Colors.brown,
    padding: 12,
    margin: 6,
    borderRadius: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },

  pressed: {
    opacity: 0.8,
  },

  description: {
    fontSize: 16,
    fontWeight: "600",
    overflow: "scroll",
    paddingBottom: 8,
  },

  descriptionContainer: {
    maxWidth: "75%",
  },

  date: {
    color: Colors.beige,
    fontSize: 13,
    fontWeight: "bold",
  },

  amountContainer: {
    borderColor: Colors.darkBrown,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.beige,
  },

  amount: {
    padding: 2,
    fontSize: 12,
    fontWeight: "bold",
  },
});
