import { Address } from "@/types/Address";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AddressListProps {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelect: (id: string) => void;
}

export default function AddressList({
  addresses,
  selectedAddressId,
  onSelect,
}: AddressListProps) {
  return (
    <>
      {addresses.map((addr) => (
        <TouchableOpacity
          key={addr.id}
          style={[
            styles.card,
            selectedAddressId === addr.id && styles.selectedCard,
          ]}
          onPress={() => onSelect(addr.id)}
        >
          <View style={styles.headerRow}>
            <Text style={styles.name}>{addr.name}</Text>

            {selectedAddressId === addr.id && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✓ Selected</Text>
              </View>
            )}
          </View>

          <Text style={styles.phone}>{addr.phone}</Text>

          <Text style={styles.details}>
            {addr.street}, {addr.city} - {addr.pincode}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },

  selectedCard: {
    borderColor: "#4CAF50",
    backgroundColor: "#ecfbedff",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "relative",
    alignItems: "center",
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
  },

  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "600",
  },

  phone: {
    color: "#555",
    marginTop: 4,
  },

  details: {
    color: "#777",
    marginTop: 2,
  },
});
