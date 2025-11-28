import Avatar from "@/components/Avatar";
import Screen from "@/components/Screen";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { TextH3, TextH4, TextP } from "@/components/ui/typography/Text";
import { profileItems } from "@/utils/data";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const user = {
    name: "Sreehari",
    email: "sreehari@example.com",
    phone: "+91 9876543210",
  };

  return (
    <Screen noPaddingTop>
      <Header title="Profile" />

      <View style={styles.card}>
        <View>
          <TextH3>{user.name}</TextH3>
          <TextP>{user.email}</TextP>
          <TextP>{user.phone}</TextP>
        </View>

        <Avatar name={user.name} size={70} />
      </View>

      <View style={styles.section}>
        <TextH4>Account</TextH4>

        {profileItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.item}
            onPress={() => router.push(item.path)}
          >
            <TextP>{item.label}</TextP>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <Button
        label="Logout"
        style={{ marginTop: 30 }}
        onPress={() => {
          router.replace("/login");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    fontSize: 14,
    marginTop: 5,
    color: "#444",
  },
  phone: {
    fontSize: 14,
    marginTop: 3,
    color: "#444",
  },

  section: {
    marginTop: 20,
  },
  sectionTitle: {
    marginLeft: 15,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#555",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
