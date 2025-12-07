import { Colors } from "@/constants/theme";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

interface Offer {
  id: string;
  image: any;
}

interface Props {
  offers: Offer[];
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;
const SIDE_MARGIN = (width - CARD_WIDTH) / 6;

export default function OffersCarousel({ offers }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={offers}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: SIDE_MARGIN }}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH, alignItems: "center" }}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {offers.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, { opacity: i === activeIndex ? 1 : 0.3 }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {
    width: "97%",
    height: 180,
    borderRadius: 16,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
});
