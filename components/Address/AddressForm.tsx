import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, useColorScheme, View } from "react-native";
import * as yup from "yup";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ThemedView } from "../themed-view";

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

export type AddressFormValues = yup.InferType<typeof addressSchema>;

export default function AddressForm({
  onSuccess,
  onCancel,
  initialValues,
}: {
  onSuccess: (data: AddressFormValues) => void;
  onCancel: () => void;
  initialValues?: Partial<AddressFormValues>;
}) {
  const { control, handleSubmit, reset } = useForm<AddressFormValues>({
    defaultValues: {
      name: initialValues?.name || "",
      phone: initialValues?.phone || "",
      street: initialValues?.street || "",
      city: initialValues?.city || "",
      pincode: initialValues?.pincode || "",
    },
    resolver: yupResolver(addressSchema),
  });

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const submit = (data: AddressFormValues) => {
    onSuccess(data);
    reset();
  };

  return (
    <ThemedView style={styles.form}>
      <View
        style={[
          styles.formCard,
          { backgroundColor: isDark ? "#333333" : "#ffff" },
        ]}
      >
        <Input name="name" control={control} placeholder="Full Name *" />
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
          <Button label="Cancel" variant="secondary" onPress={onCancel} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button label="Save Address" onPress={handleSubmit(submit)} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 8 },
  formCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 15,
  },
  row: { flexDirection: "row", gap: 10 },
  inputHalf: { flex: 1 },

  formActions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  buttonWrapper: { flex: 1 },
});
