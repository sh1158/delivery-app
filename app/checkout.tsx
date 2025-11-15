import CartItem from "@/components/CartItem";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";
import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { useAddressStore } from "@/store/useAddressStore";
import { useCartStore } from "@/store/useCartStore";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CheckoutScreen() {
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);

  const addresses = useAddressStore((s) => s.addresses);
  const selectedAddressId = useAddressStore((s) => s.selectedAddressId);
  const addAddress = useAddressStore((s) => s.addAddress);
  const selectAddress = useAddressStore((s) => s.selectAddress);

  const [successVisible, setSuccessVisible] = useState(false);
  const [addingNew, setAddingNew] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      alert("Please select or add an address");
      return;
    }
    setSuccessVisible(true);
    clearCart();
  };

  const handleModelClose = () => {
    setSuccessVisible(false);
    router.replace("/(tabs)");
  };

  const handleSaveAddress = () => {
    const { name, phone, street, city, pincode } = form;
    if (!name || !phone || !street || !city || !pincode) {
      alert("Please fill all fields");
      return;
    }
    addAddress(form);
    setAddingNew(false);
    setForm({ name: "", phone: "", street: "", city: "", pincode: "" });
  };

  return (
    <Screen noPaddingTop>
      <Header title="Checkout" />

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CartItem item={item} />}
            ListHeaderComponent={
              <View style={styles.addressSection}>
                <Text style={styles.sectionTitle}>Delivery Address</Text>

                {addresses.length > 0 && !addingNew && (
                  <>
                    {addresses.map((addr) => (
                      <TouchableOpacity
                        key={addr.id}
                        style={[
                          styles.addressCard,
                          selectedAddressId === addr.id &&
                            styles.selectedAddress,
                        ]}
                        onPress={() => selectAddress(addr.id)}
                      >
                        <Text>{addr.name}</Text>
                        <Text>{addr.phone}</Text>
                        <Text>
                          {addr.street}, {addr.city} - {addr.pincode}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <Button
                      label="Add New Address"
                      onPress={() => setAddingNew(true)}
                    />
                  </>
                )}

                {addingNew && (
                  <View style={styles.form}>
                    <TextInput
                      placeholder="Name"
                      value={form.name}
                      onChangeText={(text) => setForm({ ...form, name: text })}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Phone"
                      value={form.phone}
                      onChangeText={(text) => setForm({ ...form, phone: text })}
                      style={styles.input}
                      keyboardType="phone-pad"
                    />
                    <TextInput
                      placeholder="Street"
                      value={form.street}
                      onChangeText={(text) =>
                        setForm({ ...form, street: text })
                      }
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="City"
                      value={form.city}
                      onChangeText={(text) => setForm({ ...form, city: text })}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Pincode"
                      value={form.pincode}
                      onChangeText={(text) =>
                        setForm({ ...form, pincode: text })
                      }
                      style={styles.input}
                      keyboardType="numeric"
                    />
                    <Button label="Save Address" onPress={handleSaveAddress} />
                  </View>
                )}
              </View>
            }
            contentContainerStyle={{ paddingBottom: 150 }}
          />

          <View style={styles.summary}>
            <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
            <Button label="Place Order" onPress={handlePlaceOrder} />
          </View>
        </View>
      )}

      <PaymentSuccessModal
        visible={successVisible}
        onClose={handleModelClose}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, fontWeight: "600" },

  addressSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  addressCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedAddress: { borderColor: "green", borderWidth: 2 },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  summary: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  totalText: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
});
