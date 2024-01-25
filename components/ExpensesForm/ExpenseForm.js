import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import { Colors } from "../../constants/Colors";
import CustomButton from "../ui/CustomButton";

const ExpenseForm = ({ onCancel, isEditing, onSubmit, defaultExpense }) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultExpense ? defaultExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultExpense
        ? defaultExpense.date.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
    description: {
      value: defaultExpense ? defaultExpense.description : "",
      isValid: true,
    },
  });

  const handleInputValues = (identifier, enteredValue) => {
    setInputValues((currValue) => {
      return {
        ...currValue,
        [identifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((currValue) => {
        return {
          amount: { value: currValue.amount.value, isValid: amountIsValid },
          date: { value: currValue.date.value, isValid: dateIsValid },
          description: {
            value: currValue.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
    }

    onSubmit(expenseData);
  };

  const isFormValid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputContainer}>
        <CustomInput
          style={styles.rowFlex}
          label="Amount"
          inputConfig={{
            inputMode: "decimal",
            value: inputValues.amount.value,
            onChangeText: handleInputValues.bind(this, "amount"),
          }}
        />
        <CustomInput
          style={styles.rowFlex}
          label="Date"
          inputConfig={{
            maxLength: 10,
            placeholder: "YYYY-MM-DD",
            value: inputValues.date.value,
            onChangeText: handleInputValues.bind(this, "date"),
          }}
        />
      </View>
      <CustomInput
        label="Description"
        inputConfig={{
          multiline: true,
          autoCapitalize: "none",
          value: inputValues.description.value,
          onChangeText: handleInputValues.bind(this, "description"),
        }}
      />
      {isFormValid && <Text>Invalid input</Text>}
      <View style={styles.buttonContainer}>
        <CustomButton title="Cancel" mode="flat" onPress={onCancel} />
        <CustomButton
          title={isEditing ? "Update" : "Add"}
          onPress={submitHandler}
        />
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: Colors.darkBrown,
    marginBottom: 20,
  },

  inputContainer: {
    gap: 10,
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },

  rowFlex: {
    flex: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});
