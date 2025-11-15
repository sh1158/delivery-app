import { Colors } from "@/constants/theme"; // primary color
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface BestSellerItem {
  id: number;
  name: string;
  price: number;
  image: any;
}

interface Props {
  items: BestSellerItem[];
  onSelectItem?: (item: BestSellerItem) => void;
}

const { width } = Dimensions.get("window");

export default function BestSellerCarousel({ items, onSelectItem }: Props) {
  return (
    <FlatList
      data={items}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => onSelectItem?.(item)}
        >
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <View style={styles.priceBadge}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  card: {
    width: width * 0.3,
    height: 135,
    marginRight: 15,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  priceBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  price: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});
