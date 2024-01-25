import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ onPress, name, size, color }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.pressed, styles.container] : styles.container
      }
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },

  pressed: {
    opacity: 0.7,
  },
});
