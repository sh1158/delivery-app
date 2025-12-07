import LottieView from "lottie-react-native";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { ThemedView } from "./themed-view";
import { Button } from "./ui/Button";
import { TextH3, TextP } from "./ui/typography/Text";

interface PaymentSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message?: string;
  description?: string;
}

export default function PaymentSuccessModal({
  visible,
  onClose,
  message = "Thank You",
  description = "Order placed successfully!",
}: PaymentSuccessModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <ThemedView style={styles.container}>
          <LottieView
            source={require("../assets/lottie/success.json")}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
          <TextH3>{message}</TextH3>
          <TextP>{description}</TextP>
          <Button label="Close" onPress={onClose} style={styles.btn} />
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    // backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    padding: 20,
  },
  lottie: {
    width: 150,
    height: 200,
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 20,
    textAlign: "center",
  },
  btn: {
    marginTop: 10,
  },
});
