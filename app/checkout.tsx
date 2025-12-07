import AddNewAddressButton from "@/components/Address/AddNewAddressButton";
import AddressForm from "@/components/Address/AddressForm";
import AddressList from "@/components/Address/AddressList";
import CartItem from "@/components/CartItem";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";
import Screen from "@/components/Screen";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { TextH4 } from "@/components/ui/typography/Text";

import { useAddressStore } from "@/store/useAddressStore";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";

import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function CheckoutScreen() {
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);

  const { addresses, selectedAddressId, addAddress, selectAddress } =
    useAddressStore();

  const addOrder = useOrderStore((s) => s.addOrder);

  const [successVisible, setSuccessVisible] = useState(false);
  const [addingNew, setAddingNew] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      return Toast.show({
        type: "error",
        text1: "Address not selected",
        text2: "Please select or add an address",
      });
    }

    const address = addresses.find((a) => a.id === selectedAddressId);
    if (!address) return;

    addOrder({ items: cart, address, total });
    clearCart();
    setSuccessVisible(true);
  };

  const handleSuccessClose = () => {
    setSuccessVisible(false);
    router.replace("/(tabs)");
  };

  return (
    <Screen noPaddingTop scroll={false}>
      <Header title="Checkout" />

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CartItem item={item} />}
            ListHeaderComponent={
              <View style={{ marginBottom: 20 }}>
                <TextH4 style={styles.sectionTitle}>Delivery Address</TextH4>

                {!addingNew ? (
                  <>
                    <AddressList
                      addresses={addresses}
                      selectedAddressId={selectedAddressId}
                      onSelect={selectAddress}
                    />

                    <AddNewAddressButton onPress={() => setAddingNew(true)} />
                  </>
                ) : (
                  <AddressForm
                    onCancel={() => setAddingNew(false)}
                    onSuccess={(data) => {
                      addAddress(data);
                      setAddingNew(false);
                      Toast.show({
                        type: "success",
                        text1: "Success",
                        text2: "Address added successfully!",
                      });
                    }}
                  />
                )}
              </View>
            }
            contentContainerStyle={{ paddingBottom: 150 }}
          />

          <ThemedView style={styles.summary}>
            <View style={styles.summaryRow}>
              <TextH4>Total:</TextH4>
              <TextH4>₹{total.toFixed(2)}</TextH4>
            </View>

            <Button label="Place Order" onPress={handlePlaceOrder} />
          </ThemedView>
        </View>
      )}

      <PaymentSuccessModal
        visible={successVisible}
        onClose={handleSuccessClose}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, fontWeight: "600", color: "#666" },

  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
  },

  summary: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
