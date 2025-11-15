import CartItem from "@/components/CartItem";
import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { useCartStore } from "@/store/useCartStore";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);

  const isEmpty = cart.length === 0;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Screen noPaddingTop scroll={false}>
      <Header title="Cart" />

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
          <Text style={styles.emptySubText}>
            Add items to your cart and come back!
          </Text>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListFooterComponent={
            <View style={styles.bottomBar}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>₹{total.toFixed(2)}</Text>
              </View>

              <View style={styles.buttonRow}>
                <Button
                  label="Clear Cart"
                  variant="secondary"
                  onPress={clearCart}
                  style={styles.leftButton}
                />
                <Button
                  label="Checkout"
                  onPress={() => router.push("/checkout")}
                  style={styles.rightButton}
                />
              </View>
            </View>
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
  },
  emptySubText: {
    fontSize: 14,
    marginTop: 6,
    color: "#666",
    textAlign: "center",
  },

  bottomBar: {
    paddingTop: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  totalAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },

  leftButton: {
    flex: 1,
  },

  rightButton: {
    flex: 1,
  },

  totalText: {
    fontSize: 18,
    fontWeight: "700",
  },
  checkoutBtn: {
    width: undefined,
    paddingHorizontal: 20,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  clearBtn: {
    alignSelf: "center",
    marginTop: 10,
  },
  clearText: {
    color: "red",
    fontSize: 14,
  },
});
