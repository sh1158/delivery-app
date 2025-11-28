import CartItem from "@/components/CartItem";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";
import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { useAddressStore } from "@/store/useAddressStore";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import * as yup from "yup";

const addressSchema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
  street: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
});

export default function CheckoutScreen() {
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrderStore((s) => s.addOrder);

  const addresses = useAddressStore((s) => s.addresses);
  const selectedAddressId = useAddressStore((s) => s.selectedAddressId);
  const addAddress = useAddressStore((s) => s.addAddress);
  const selectAddress = useAddressStore((s) => s.selectAddress);

  const [successVisible, setSuccessVisible] = useState(false);
  const [addingNew, setAddingNew] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      street: "",
      city: "",
      pincode: "",
    },
    resolver: yupResolver(addressSchema),
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      Toast.show({
        type: "error",
        text1: "Address not selected",
        text2: "Please select or add an address",
      });
      return;
    }

    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

    if (!selectedAddress) return;

    addOrder({
      items: cart,
      address: selectedAddress,
      total: total,
    });

    setSuccessVisible(true);
    clearCart();
  };

  const handleModelClose = () => {
    setSuccessVisible(false);
    router.replace("/(tabs)");
  };

  const handleSaveAddress = (data: any) => {
    addAddress(data);
    setAddingNew(false);
    reset();
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Address added successfully!",
    });
  };

  return (
    <Screen noPaddingTop scroll={false}>
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
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Delivery Address</Text>
                  {addresses.length > 0 && !addingNew && (
                    <Text style={styles.addressCount}>
                      {addresses.length} saved
                    </Text>
                  )}
                </View>

                {!addingNew && (
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
                        <View style={styles.addressHeader}>
                          <Text style={styles.addressName}>{addr.name}</Text>
                          {selectedAddressId === addr.id && (
                            <View style={styles.selectedBadge}>
                              <Text style={styles.selectedBadgeText}>
                                ✓ Selected
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.addressPhone}>{addr.phone}</Text>
                        <Text style={styles.addressDetails}>
                          {addr.street}, {addr.city} - {addr.pincode}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => setAddingNew(true)}
                    >
                      <Text style={styles.addButtonText}>
                        + Add New Address
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                {addingNew && (
                  <View style={styles.form}>
                    <View style={styles.formCard}>
                      <Input
                        name="name"
                        control={control}
                        placeholder="Full Name *"
                      />

                      <Input
                        name="phone"
                        control={control}
                        placeholder="Phone Number *"
                        keyboardType="phone-pad"
                      />

                      <Input
                        name="street"
                        control={control}
                        placeholder="Street / House No / Building *"
                      />

                      <View style={styles.row}>
                        <Input
                          name="city"
                          control={control}
                          placeholder="City *"
                          style={styles.inputHalf}
                        />
                        <Input
                          name="pincode"
                          control={control}
                          placeholder="Pincode *"
                          keyboardType="numeric"
                          style={styles.inputHalf}
                        />
                      </View>
                    </View>

                    <View style={styles.formActions}>
                      <View style={styles.buttonWrapper}>
                        <Button
                          label="Cancel"
                          variant="secondary"
                          onPress={() => {
                            setAddingNew(false);
                            reset();
                          }}
                        />
                      </View>

                      <View style={styles.buttonWrapper}>
                        <Button
                          label="Save Address"
                          onPress={handleSubmit(handleSaveAddress)}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            }
            contentContainerStyle={{ paddingBottom: 150 }}
          />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount:</Text>
              <Text style={styles.totalText}>₹{total.toFixed(2)}</Text>
            </View>
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
  emptyText: { fontSize: 20, fontWeight: "600", color: "#666" },

  addressSection: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#000" },
  addressCount: { fontSize: 14, color: "#666", fontWeight: "500" },

  addressCard: {
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  selectedAddress: {
    borderColor: "#10b981",
    backgroundColor: "#f0fdf4",
    borderWidth: 2,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  addressName: { fontSize: 16, fontWeight: "700", color: "#000" },
  addressPhone: { fontSize: 14, color: "#666", marginBottom: 4 },
  addressDetails: { fontSize: 14, color: "#444", lineHeight: 20 },
  selectedBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedBadgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  addButton: {
    borderWidth: 1.5,
    borderColor: "#3b82f6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderStyle: "dashed",
    backgroundColor: "#eff6ff",
  },
  addButtonText: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "600",
  },

  form: { marginTop: 8 },
  formCard: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 15,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  inputHalf: {
    flex: 1,
  },

  formActions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
  summary: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  totalText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
});
