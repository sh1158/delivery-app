import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { TextH4, TextP } from "@/components/ui/typography/Text";
import { useOrderStore } from "@/store/useOrderStore";
import { formatDateTime } from "@/utils/formatDate";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function OrdersScreen() {
  const orders = useOrderStore((s) => s.orders);

  const isEmpty = orders.length === 0;

  return (
    <Screen noPaddingTop scroll={false}>
      <Header title="My Orders" />

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <TextH4>No orders yet 📦</TextH4>
          <TextP style={styles.emptySubText}>
            You haven't placed any orders yet.
          </TextP>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.row}>
                <TextP>Order ID</TextP>
                <TextP>{item.id}</TextP>
              </View>

              <View style={styles.row}>
                <TextP>Status</TextP>
                <TextP>{item.status}</TextP>
              </View>

              <View style={styles.row}>
                <TextP>Date</TextP>
                <TextP>{formatDateTime(item.createdAt)}</TextP>
              </View>

              <Button
                label="View Details"
                onPress={() =>
                  router.push({
                    pathname: "/orders/[id]",
                    params: { id: item.id },
                  })
                }
                style={{ marginTop: 10 }}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptySubText: {
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },

  orderCard: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
