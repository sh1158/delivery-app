import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  ViewStyle,
  useColorScheme,
} from "react-native";

type Dimension = number | `${number}%` | "auto";

interface SkeletonProps {
  width?: Dimension;
  height?: Dimension;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export default function SkeletonShimmer({
  width = 100,
  height = 20,
  borderRadius = 6,
  style,
}: SkeletonProps) {
  const shimmer = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const animatedStyle = {
    opacity: shimmer.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 1],
    }),
  };

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: isDark ? "#2A2A2A" : "#E1E9EE",
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {},
});
