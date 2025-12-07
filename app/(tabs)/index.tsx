import BestSellersSection from "@/components/BestSellers/BestSellersSection";
import CategoriesSection from "@/components/Categories/CategoriesSection";
import HomeHeader from "@/components/HomeHeader";
import OffersSection from "@/components/Offers/OffersSection";
import { RecommendedSection } from "@/components/Recommended/RecommendedSection";
import SectionHeader from "@/components/SectionHeader";
import { ThemedView } from "@/components/themed-view";
import { TextH2, TextP } from "@/components/ui/typography/Text";
import { Colors } from "@/constants/theme";
import { getGreeting } from "@/utils/greetingsHelper";
import React, { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { greeting, message } = getGreeting();

  const greetingOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const greetingTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -30],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.screen}>
      <View style={styles.backgroundLayer} />

      <View style={styles.fixedHeader}>
        <HomeHeader />
      </View>

      <Animated.View
        style={[
          styles.greetingSection,
          {
            opacity: greetingOpacity,
            transform: [{ translateY: greetingTranslateY }],
          },
        ]}
        pointerEvents="none"
      >
        <TextH2 style={styles.greeting}>{greeting}</TextH2>
        <TextP style={styles.subGreeting}>{message}</TextP>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.spacer} />

        <ThemedView style={styles.whiteCard}>
          <View>
            <SectionHeader title="Categories" showViewAll={false} />
            <CategoriesSection />
          </View>
          <BestSellersSection />
          <OffersSection />
          <RecommendedSection />
        </ThemedView>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  greetingSection: {
    position: "absolute",
    top: 105,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: Colors.primary,
    zIndex: 0,
  },
  greeting: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "PlayfairDisplay_700Bold",
  },
  subGreeting: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  spacer: {
    height: 200,
  },
  whiteCard: {
    // backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 90,
    minHeight: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardsContainer: {
    gap: 15,
    paddingBottom: 30,
  },
  card: {
    height: 120,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
});
