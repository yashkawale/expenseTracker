import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import { Colors } from "../../constants/Colors";
import CustomButton from "../ui/CustomButton";

const ExpenseForm = ({ onCancel, isEditing, onSubmit, defaultExpense }) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultExpense ? defaultExpense.amount.toString() : "",
    date: defaultExpense ? defaultExpense.date.toISOString().slice(0, 10) : "",
    description: defaultExpense ? defaultExpense.description : "",
  });

  const [inputValidity, setInputValidity] = useState({
    amount: true,
    date: true,
    description: true,
  });

  const handleInputValues = (identifier, enteredValue) => {
    setInputValues((currValues) => ({
      ...currValues,
      [identifier]: enteredValue,
    }));
  };

  const validateInput = (identifier, enteredValue) => {
    switch (identifier) {
      case "amount":
        return !isNaN(enteredValue) && parseFloat(enteredValue) > 0;

      case "date":
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(enteredValue);

      case "description":
        return enteredValue.trim().length > 0;

      default:
        return true;
    }
  };

  const submitHandler = () => {
    const amountIsValid = validateInput("amount", inputValues.amount);
    const dateIsValid = validateInput("date", inputValues.date);
    const descriptionIsValid = validateInput(
      "description",
      inputValues.description
    );

    setInputValidity({
      amount: amountIsValid,
      date: dateIsValid,
      description: descriptionIsValid,
    });

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      const expenseData = {
        amount: +inputValues.amount,
        date: new Date(inputValues.date),
        description: inputValues.description,
      };

      onSubmit(expenseData);
    }
  };

  const isFormValid =
    !inputValidity.amount || !inputValidity.date || !inputValidity.description;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputContainer}>
        <CustomInput
          style={styles.rowFlex}
          label="Amount"
          inValid={!inputValidity.amount}
          inputConfig={{
            inputMode: "decimal",
            value: inputValues.amount,
            onChangeText: handleInputValues.bind(this, "amount"),
          }}
        />
        <CustomInput
          style={styles.rowFlex}
          label="Date"
          inValid={!inputValidity.date}
          inputConfig={{
            maxLength: 10,
            placeholder: "YYYY-MM-DD",
            value: inputValues.date,
            onChangeText: handleInputValues.bind(this, "date"),
          }}
        />
      </View>
      <CustomInput
        label="Description"
        inValid={!inputValidity.description}
        inputConfig={{
          multiline: true,
          autoCapitalize: "none",
          value: inputValues.description,
          onChangeText: handleInputValues.bind(this, "description"),
        }}
      />
      {isFormValid && (
        <Text style={styles.errorText}>
          Invalid entries!! {"\n"} Enter valid data into the fields.
        </Text>
      )}
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

  errorText: {
    textAlign: "center",
    margin: 8,
    color: Colors.red,
  },
});
