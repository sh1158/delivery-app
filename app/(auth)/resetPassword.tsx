import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import PasswordInput from "@/components/ui/PasswordInput";
import { TextP } from "@/components/ui/typography/Text";
import { resetPasswordSchema } from "@/validation/password";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function ResetPassword() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = (data: any) => {
    console.log("NEW PASSWORD:", data);
    router.push("/login"); // Redirect after reset
  };

  return (
    <Screen noPaddingTop>
      <Header title="Reset Password" />

      <TextP style={{ marginBottom: 30 }}>Enter your new password below</TextP>

      <View style={styles.inputContainer}>
        <PasswordInput
          name="password"
          control={control}
          placeholder="New Password"
        />

        <PasswordInput
          name="confirmPassword"
          control={control}
          placeholder="Confirm Password"
        />
      </View>

      <Button label="Reset Password" onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 15,
    marginBottom: 30,
  },
});
