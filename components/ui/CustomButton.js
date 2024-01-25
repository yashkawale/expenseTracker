import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const CustomButton = ({ onPress, title, mode }) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => (pressed ? styles.pressed : null)}
      >
        <View style={[styles.titleContainer, mode === "flat" && styles.flat]}>
          <Text style={[styles.title, mode === "flat" && styles.flatTitle]}>
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: Colors.brown,
    shadowColor: "black",
    borderRadius: 6,
    minWidth: 120,
    marginHorizontal: 10,
  },

  pressed: {
    opacity: 0.7,
  },

  title: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 18,
    color: Colors.beige,
    fontWeight: "500",
  },

  flat: {
    backgroundColor: "transparent",
  },

  flatTitle: {
    color: Colors.darkBrown,
  },
});
