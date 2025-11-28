import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { TextH4, TextP } from "@/components/ui/typography/Text";
import { useOrderStore } from "@/store/useOrderStore";
import { formatDateTime } from "@/utils/formatDate";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const order = useOrderStore((s) => s.getOrderById(id as string));

  if (!order) {
    return (
      <Screen>
        <Header title="Order Details" />
        <View style={styles.center}>
          <Text style={styles.notFound}>Order not found 😢</Text>
        </View>
      </Screen>
    );
  }

  const total = order.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Screen noPaddingTop scroll={false}>
      <Header title="Order Details" />

      <View style={styles.card}>
        <TextH4 style={styles.mainHead}>Order Information</TextH4>

        <View style={styles.row}>
          <TextP>Order ID</TextP>
          <TextP>{order.id}</TextP>
        </View>

        <View style={styles.row}>
          <TextP>Status</TextP>
          <TextP>{order.status}</TextP>
        </View>

        <View style={styles.row}>
          <TextP>Order Date</TextP>
          <TextP>{formatDateTime(order.createdAt)}</TextP>
        </View>
      </View>

      <View style={styles.card}>
        <TextH4 style={styles.mainHead}>Items</TextH4>

        <FlatList
          data={order.items}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <TextP>{item.name}</TextP>

              <TextP style={styles.itemPrice}>
                {item.quantity} × ₹{item.price}
              </TextP>
            </View>
          )}
        />

        <View style={styles.totalRow}>
          <TextP style={{ fontWeight: "700" }}>Total</TextP>
          <TextP style={{ fontWeight: "700" }}>₹{total?.toFixed(2)}</TextP>
        </View>
      </View>

      <Button
        label="Back to Orders"
        onPress={() => router.back()}
        style={styles.button}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainHead: {
    marginBottom: 10,
  },
  notFound: {
    fontSize: 18,
    fontWeight: "600",
  },

  card: {
    padding: 15,
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },
  button: {
    marginTop: 10,
  },
});
