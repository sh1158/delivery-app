import * as yup from "yup";

export const passwordRules = {
  required: "Password is required",
  minLength: { value: 6, message: "Minimum 6 characters" },
};

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});
