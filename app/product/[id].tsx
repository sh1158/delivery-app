import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { TextH4, TextP } from "@/components/ui/typography/Text";
import { Colors } from "@/constants/theme";
import { useCartStore } from "@/store/useCartStore";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { bestSellers, recommendedItems } from "@/utils/data";
import { useLocalSearchParams } from "expo-router";
import { Heart } from "lucide-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  const allProducts = [...recommendedItems, ...bestSellers];
  const product = allProducts.find((p) => String(p.id) === String(id));

  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);
  const isFavorite = useFavoriteStore((s) => s.isFavorite);
  const favorites = useFavoriteStore((s) => s.favorites);

  const addToCart = useCartStore((s) => s.addToCart);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    Toast.show({
      type: "success",
      text1: "Added to Cart",
      text2: `${product.name} has been added.`,
    });
  };

  if (!product) {
    return (
      <Screen>
        <Header title="Product" />
        <Text style={{ padding: 20 }}>Product not found.</Text>
      </Screen>
    );
  }

  const liked = isFavorite(product.id);

  return (
    <Screen noPaddingTop>
      <Header title={product.name} />

      <View style={styles.scroll}>
        <View style={styles.imageWrapper}>
          <Image source={product.image} style={styles.image} />
          <TouchableOpacity
            style={styles.favIcon}
            onPress={() => toggleFavorite(product)}
          >
            <Heart
              size={26}
              color={liked ? Colors.primary : "#fff"}
              fill={liked ? Colors.primary : "transparent"}
            />
          </TouchableOpacity>

          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>₹{product.price}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <TextH4>{product.name}</TextH4>
          <Text style={styles.rating}>⭐ {product.rating}</Text>

          <TextH4>Description</TextH4>
          <TextP style={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            High-quality premium product with excellent design and long-lasting
            durability.
          </TextP>

          <Button label="Add to cart" onPress={handleAddToCart} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 40,
    paddingTop: 7,
  },

  imageWrapper: {
    width: "100%",
    height: 350,
    // backgroundColor: "#eee",
    position: "relative",
    overflow: "hidden",
    borderRadius: 15,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  favIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 30,
  },

  priceBadge: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  priceText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  details: {
    paddingTop: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },

  rating: {
    fontSize: 17,
    color: "#666",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 20,
  },

  cartBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  cartBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
