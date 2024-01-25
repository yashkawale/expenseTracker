import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { Colors } from "../constants/Colors";
import { ExpensesStoreContext } from "../store/ExpensesContext";
import ExpenseForm from "../components/ExpensesForm/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.itemId;
  const isEditing = !!expenseId;
  const expensesContext = useContext(ExpensesStoreContext);
  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === expenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expenses" : "Add Expenses",
    });
  }, [navigation, isEditing]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAddUpdate = (expenseData) => {
    if (isEditing) {
      expensesContext.updateExpense(expenseId, expenseData);
    } else {
      expensesContext.addExpense(expenseData);
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    expensesContext.deleteExpense(expenseId);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={handleCancel}
        onSubmit={handleAddUpdate}
        defaultExpense={selectedExpense}
      />

      {isEditing && (
        <View style={styles.innerContainer}>
          <IconButton
            name="trash"
            size={35}
            color={Colors.red}
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.beige,
    justifyContent: "center",
  },

  innerContainer: {
    alignItems: "center",
    borderTopWidth: 2,
    margin: 20,
    padding: 12,
    borderColor: Colors.darkBrown,
  },
});
