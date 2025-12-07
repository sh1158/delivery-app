import CartSkeleton from "@/components/Cart/CartSkeleton";
import CartItem from "@/components/CartItem";
import Screen from "@/components/Screen";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { TextH4, TextP } from "@/components/ui/typography/Text";
import { useCartStore } from "@/store/useCartStore";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function CartScreen() {
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);
  const isEmpty = cart.length === 0;
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <Screen noPaddingTop scroll={false}>
      <Header title="Cart" />
      {loading ? (
        <CartSkeleton />
      ) : isEmpty ? (
        <ThemedView style={styles.emptyContainer}>
          <TextH4>Your cart is empty 🛒</TextH4>
          <TextP>Add items to your cart and come back!</TextP>
        </ThemedView>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListFooterComponent={
            <ThemedView style={styles.bottomBar}>
              <View style={styles.totalRow}>
                <TextH4 style={styles.bold}>Total</TextH4>
                <TextH4 style={styles.bold}>₹{total.toFixed(2)}</TextH4>
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
            </ThemedView>
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
    // backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  bold: {
    fontSize: 15,
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
