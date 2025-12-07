import OrdersSkeleton from "@/components/Orders/OrdersSkeleton";
import Screen from "@/components/Screen";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { TextH4, TextP } from "@/components/ui/typography/Text";
import { useOrderStore } from "@/store/useOrderStore";
import { formatDateTime } from "@/utils/formatDate";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";

export default function OrdersScreen() {
  const orders = useOrderStore((s) => s.orders);
  const [loading, setLoading] = React.useState(true);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }, [])
  );

  const isEmpty = orders.length === 0;

  return (
    <Screen noPaddingTop scroll={false}>
      <Header title="My Orders" />

      {loading ? (
        <OrdersSkeleton />
      ) : isEmpty ? (
        <ThemedView style={styles.emptyContainer}>
          <TextH4>No orders yet 📦</TextH4>
          <TextP style={styles.emptySubText}>
            You haven't placed any orders yet.
          </TextP>
        </ThemedView>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView
              style={[
                styles.orderCard,
                { backgroundColor: isDark ? "#333333" : "#f5f3f3ff" },
              ]}
            >
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
            </ThemedView>
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
    marginVertical: 8,
    borderRadius: 12,
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
