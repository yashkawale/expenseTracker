import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { Colors } from "../constants/Colors";
import CustomButton from "../components/ui/CustomButton";

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.itemId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expenses" : "Add Expenses",
    });
  }, [navigation, isEditing]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAddUpdate = () => {
    navigation.goBack();
  };

  const handleDelete = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <CustomButton title="Cancel" mode="flat" onPress={handleCancel} />
        <CustomButton
          title={isEditing ? "Update" : "Add"}
          onPress={handleAddUpdate}
        />
      </View>
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

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
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
