import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/ui/IconButton";
import { Colors } from "../constants/Colors";
import { ExpensesStoreContext } from "../store/ExpensesContext";
import ExpenseForm from "../components/ExpensesForm/ExpenseForm";
import {
  deleteDataInDataBase,
  sendDataToDatabase,
  updateDataInDatabase,
} from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesStoreContext);
  const expenseId = route.params?.itemId;
  const isEditing = !!expenseId;
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

  const handleAddUpdate = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesContext.updateExpense(expenseId, expenseData);
        await updateDataInDatabase(expenseId, expenseData);
      } else {
        const id = await sendDataToDatabase(expenseData);
        expensesContext.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Check your internet connectivity!");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteDataInDataBase(expenseId);
      expensesContext.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Check your internet connectivity!");
    }
    setIsSubmitting(false);
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

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
