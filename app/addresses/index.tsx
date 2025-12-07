import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AddNewAddressButton from "@/components/Address/AddNewAddressButton";
import AddressForm, {
  AddressFormValues,
} from "@/components/Address/AddressForm";
import AddressList from "@/components/Address/AddressList";
import AddressSkeleton from "@/components/Address/AddressSkeleton";
import Screen from "@/components/Screen";
import { Header } from "@/components/ui/Header";
import { TextH4 } from "@/components/ui/typography/Text";
import { useAddressStore } from "@/store/useAddressStore";
import { useFocusEffect } from "expo-router";
import Toast from "react-native-toast-message";

const AddressScreen: React.FC = () => {
  const { addresses, selectedAddressId, addAddress, selectAddress } =
    useAddressStore();
  const [addingNew, setAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <Screen noPaddingTop scroll={false}>
      <Header title="Your Addresses" />

      <View style={styles.contentWrapper}>
        <TextH4 style={styles.sectionTitle}>Saved Addresses</TextH4>

        {loading ? (
          <AddressSkeleton />
        ) : (
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={() => null}
            ListHeaderComponent={
              <View>
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
                    onSuccess={(data: AddressFormValues) => {
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
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>
    </Screen>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: 12,
  },
});
