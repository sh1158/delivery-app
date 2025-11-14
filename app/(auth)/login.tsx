import deliveryAnimation from "@/assets/lottie/delivery.json";
import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { TextH1, TextLink, TextP } from "@/components/ui/typography/Text";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function Login() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = (data: any) => {
    console.log("LOGIN DATA:", data);
    router.push("/(tabs)");
  };

  const footerContent = (
    <TextP>
      New to this app?{" "}
      <TextLink onPress={() => router.push("/signUp")}>Register</TextLink>
    </TextP>
  );

  return (
    <Screen footer={footerContent}>
      <LottieView
        source={deliveryAnimation}
        autoPlay
        loop
        style={{
          width: 250,
          height: 250,
          alignSelf: "center",
        }}
      />
      <TextH1 style={{ marginBottom: 6, textAlign: "center" }}>
        Welcome Back 👋
      </TextH1>

      <TextP style={{ marginBottom: 30, color: "#666", textAlign: "center" }}>
        Please log in to continue
      </TextP>

      <Input
        name="email"
        control={control}
        placeholder="Email Address"
        keyboardType="email-address"
        style={{ marginBottom: 20 }}
      />

      <PasswordInput name="password" control={control} placeholder="Password" />

      <View style={{ alignItems: "flex-end", marginTop: 8, marginBottom: 30 }}>
        <TextLink onPress={() => router.push("/forgotPassword")}>
          Forgot password?
        </TextLink>
      </View>

      <Button label="Login" onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
}
