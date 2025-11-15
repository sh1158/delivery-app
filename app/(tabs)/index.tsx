import BestSellerCarousel from "@/components/BestSellerCarousel";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import HomeHeader from "@/components/HomeHeader";
import OffersCarousel from "@/components/OffersCarousel";
import { RecommendedSection } from "@/components/RecommendedSection";
import SectionHeader from "@/components/SectionHeader";
import { Colors } from "@/constants/theme";
import { bestSellers, categories, offers } from "@/utils/data";
import { getGreeting } from "@/utils/greetingsHelper";
import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

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
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.subGreeting}>{message}</Text>
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

        <View style={styles.whiteCard}>
          <View>
            <SectionHeader title="Categories" showViewAll={false} />
            <CategoriesCarousel
              categories={categories}
              onSelectCategory={(cat) => console.log(cat.name)}
            />
          </View>
          <View>
            <SectionHeader
              title="Best Sellers"
              onPressViewAll={() => console.log("View All pressed")}
            />
            <BestSellerCarousel
              items={bestSellers}
              onSelectItem={(item) => console.log(item.name)}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <SectionHeader
              title="Special Offers"
              onPressViewAll={() => console.log("View All pressed")}
            />
            <OffersCarousel offers={offers} />
          </View>
          <View style={{ marginTop: 10 }}>
            <SectionHeader
              title="Recommended for you"
              onPressViewAll={() => console.log("View All pressed")}
            />
            <RecommendedSection />
          </View>
        </View>
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
    top: 110,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: Colors.primary,
    zIndex: 0,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
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
    backgroundColor: "#fff",
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
