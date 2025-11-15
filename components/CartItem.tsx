import { Colors } from "@/constants/theme";
import { CartItem as Item, useCartStore } from "@/store/useCartStore";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedView } from "./themed-view";

interface Props {
  item: Item;
}

export default function CartItem({ item }: Props) {
  const increase = useCartStore((s) => s.increaseQty);
  const decrease = useCartStore((s) => s.decreaseQty);
  const remove = useCartStore((s) => s.removeFromCart);

  return (
    <ThemedView style={styles.container}>
      {/* Image */}
      <Image source={item.image} style={styles.image} />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>

        {/* Qty controls */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => decrease(item.id)}
            style={styles.qtyBtn}
          >
            <Minus size={16} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => increase(item.id)}
            style={styles.qtyBtn}
          >
            <Plus size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete */}
      <TouchableOpacity onPress={() => remove(item.id)}>
        <Trash2 size={20} color="red" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    margin: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    backgroundColor: Colors.primary,
    padding: 6,
    borderRadius: 6,
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
});
