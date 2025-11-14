import mapAnimation from "@/assets/lottie/map.json";
import Screen from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { TextH1, TextLink, TextP } from "@/components/ui/typography/Text";
import { signupValidationSchema } from "@/validation/signup";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function SignUp() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signupValidationSchema),
  });

  const [agreed, setAgreed] = useState(false);

  const onSubmit = (data: any) => {
    console.log("SIGNUP DATA:", data);
  };

  const footerContent = (
    <TextP>
      Already have an account?{" "}
      <TextLink onPress={() => router.push("/login")}>Login</TextLink>
    </TextP>
  );

  return (
    <Screen footer={footerContent}>
      <LottieView
        source={mapAnimation}
        autoPlay
        loop
        style={{
          width: 150,
          height: 150,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />
      <TextH1 style={{ marginBottom: 6, textAlign: "center" }}>
        Create Account
      </TextH1>

      <TextP style={{ marginBottom: 30, color: "#666", textAlign: "center" }}>
        Sign up to get started
      </TextP>

      <View style={styles.inputContainer}>
        <Input name="name" control={control} placeholder="Full Name" />

        <Input
          name="phone"
          control={control}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />

        <Input
          name="email"
          control={control}
          placeholder="Email Address"
          keyboardType="email-address"
        />

        <PasswordInput
          name="password"
          control={control}
          placeholder="Password"
        />

        <PasswordInput
          name="confirmPassword"
          control={control}
          placeholder="Confirm Password"
        />
      </View>

      <Checkbox
        value={agreed}
        onChange={setAgreed}
        label={
          <ThemedText>
            By continuing, you agree to{" "}
            <TextLink onPress={() => console.log("Terms")}>
              Terms of Use
            </TextLink>{" "}
            and{" "}
            <TextLink onPress={() => console.log("Privacy Policy")}>
              Privacy Policy
            </TextLink>
            .
          </ThemedText>
        }
      />

      <Button label="Sign Up" onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 15,
    marginBottom: 30,
  },
});
