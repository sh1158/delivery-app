import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import OtpInput from "@/components/ui/OtpInput"; // <-- import your OTP component
import { TextLink, TextP } from "@/components/ui/typography/Text";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");

  const onSubmit = () => {
    console.log("OTP ENTERED:", otp);
    router.push("/resetPassword");
  };

  return (
    <Screen noPaddingTop>
      <Header title="Verify OTP" />

      <TextP style={{ marginBottom: 30, textAlign: "center", color: "#666" }}>
        Enter the 6-digit code sent to your email
      </TextP>

      <View style={styles.inputContainer}>
        <OtpInput length={4} onChange={setOtp} />
      </View>

      <Button label="Verify" onPress={onSubmit} />

      <TextP style={styles.resendText}>
        Didn't receive the code?{" "}
        <TextLink onPress={() => console.log("Resend OTP")}>Resend</TextLink>
      </TextP>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  resendText: {
    marginTop: 20,
    textAlign: "center",
  },
});
