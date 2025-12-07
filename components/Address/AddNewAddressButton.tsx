import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

interface AddNewAddressButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const AddNewAddressButton: React.FC<AddNewAddressButtonProps> = ({
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      style={[
        styles.addButton,
        { backgroundColor: isDark ? "#333333" : " #ffff" },
      ]}
      onPress={onPress}
    >
      <Text style={styles.addButtonText}>+ Add New Address</Text>
    </TouchableOpacity>
  );
};

export default AddNewAddressButton;

const styles = StyleSheet.create({
  addButton: {
    borderWidth: 1.5,
    borderColor: "#3b82f6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderStyle: "dashed",
    marginTop: 8,
  },
  addButtonText: {
    color: "#3b82f6",
    fontSize: 16,
    fontFamily: "NunitoSans_800ExtraBold",
  },
});
