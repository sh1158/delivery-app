import { onboardingData } from "@/utils/data";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/Button";
import { TextH1, TextP } from "@/components/ui/typography/Text";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (flatListRef.current && currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleSkip = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: onboardingData.length - 1,
      });
    }
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const currentItem = onboardingData[currentIndex];

  return (
    <View style={styles.container} pointerEvents="box-none">
      <ThemedView style={styles.wrapper} pointerEvents="box-none">
        <View style={styles.imageContainer} pointerEvents="box-none">
          <FlatList
            ref={flatListRef}
            data={onboardingData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.contentContainer}>
            <View style={styles.textSection}>
              <TextH1>{currentItem.title}</TextH1>
              <TextP style={styles.description}>
                {currentItem.description}
              </TextP>
            </View>

            <View>
              <View style={styles.pagination}>
                {onboardingData.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      {
                        width: i === currentIndex ? 24 : 8,
                        backgroundColor:
                          i === currentIndex ? Colors.primary : "#D1D5DB",
                      },
                    ]}
                  />
                ))}
              </View>

              {currentIndex < onboardingData.length - 1 ? (
                <View style={styles.buttonRow}>
                  <View style={styles.buttonWrapper}>
                    <Button
                      label="Skip"
                      variant="secondary"
                      onPress={handleSkip}
                    />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <Button label="Next" onPress={handleNext} />
                  </View>
                </View>
              ) : (
                <Button
                  label="Get Started"
                  onPress={() => router.replace("/login")}
                />
              )}
            </View>
          </View>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    flex: 1,
  },

  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.9,
    zIndex: 1,
  },

  image: {
    width,
    height: "100%",
  },

  bottomSection: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: height * 0.7,
    paddingHorizontal: 32,
    zIndex: 2,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
  },

  textSection: {
    alignItems: "center",
  },

  description: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    color: "#6B7280",
    fontFamily: "Inter_400Regular",
    paddingHorizontal: 8,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 32,
  },

  dot: {
    height: 8,
    borderRadius: 4,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
});
