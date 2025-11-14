import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { TextP } from "@/components/ui/typography/Text";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

export default function ForogotPasswordEmail() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("EMAIL DATA:", data);
    router.push("/otpVerification");
  };

  return (
    <Screen noPaddingTop>
      <Header title="Forgot Password" />

      <TextP style={{ marginBottom: 30 }}>
        Enter your email to receive a verification code
      </TextP>

      <Input
        name="email"
        control={control}
        placeholder="Email Address"
        keyboardType="email-address"
        style={{ marginBottom: 30 }}
      />

      <Button label="Send OTP" onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
}
