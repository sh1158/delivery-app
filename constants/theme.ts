/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const primaryColor = "#a70000";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primaryColor,
    tabBackground: "white",
    inputBackground: "#fff",
    inputBorder: "#D0D0D0",
    inputPlaceholder: "#9E9E9E",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryColor,
    tabBackground: "#2d3234ff",
    inputBackground: "#1a1a1a",
    inputBorder: "#333333",
    inputPlaceholder: "#666666",
  },
  primary: "#a70000",
  secondary: "#0a7ea4",
};

export const Fonts = Platform.select({
  ios: {
    heading: "NunitoSans_700Bold",
    subheading: "NunitoSans_600SemiBold",
    body: "Inter_400Regular",
    bodySemiBold: "Inter_600SemiBold",
  },
  android: {
    heading: "NunitoSans_700Bold",
    subheading: "NunitoSans_600SemiBold",
    body: "Inter_400Regular",
    bodySemiBold: "Inter_600SemiBold",
  },
  default: {
    heading: "NunitoSans_700Bold",
    subheading: "NunitoSans_600SemiBold",
    body: "Inter_400Regular",
    bodySemiBold: "Inter_600SemiBold",
  },
});
