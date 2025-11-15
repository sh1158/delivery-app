import { Colors } from "@/constants/theme";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Product } from "@/types/Product";
import { Heart } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ProductCardProps = {
  item: Product;
  onPress: (item: Product) => void;
};

export default function ProductCard({ item, onPress }: ProductCardProps) {
  // subscribe to re-render correctly
  const liked = useFavoriteStore((state) => state.isFavorite(item.id));
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />

        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>₹{item.price}</Text>
        </View>

        <TouchableOpacity
          style={styles.favIcon}
          onPress={() => toggleFavorite(item)}
        >
          <Heart
            size={20}
            color={liked ? Colors.primary : "#fff"}
            fill={liked ? Colors.primary : "transparent"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{item.name}</Text>

      {/* Rating */}
      <Text style={styles.rating}>⭐ {item.rating}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginRight: 0,
  },
  imageWrapper: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  priceBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priceText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  favIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
  name: {
    marginTop: 8,
    fontWeight: "600",
    fontSize: 14,
  },
  rating: {
    color: "#777",
    fontSize: 12,
    marginTop: 2,
  },
});
