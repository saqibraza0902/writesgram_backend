import * as Yup from "yup";

export const SignUpValidator = Yup.object({
  name: Yup.string().required("Name is required."),
  phone: Yup.number().required("Phone is required."),
  country: Yup.string().required("Country is required."),
  city: Yup.string().required("City is required."),
  email: Yup.string().required("Email is required").email("Invalid email."),
  password: Yup.string().required("Password is required."),
});

export const loginValidator = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email."),
  password: Yup.string().required("Password is required."),
});
export const OTPValidator = Yup.object({
  id: Yup.string().required("Id is required"),
  otp: Yup.number().required("OTP is required."),
});
export const ContactValidator = Yup.object({
  email: Yup.string().required("Email is required"),
  subject: Yup.string().required("Subject is required."),
  msg: Yup.string().required("Message is required."),
});
export const ProfileValidator = Yup.object({
  name: Yup.string().required("Name is required."),
  email: Yup.string().required("Email is required").email("Invalid email."),
  country: Yup.string().required("Country is required."),
  city: Yup.string().required("City is required."),
  profile: Yup.string().required("City is required."),
});
export const PasswordValidator = Yup.object({
  oldpassword: Yup.string().required("Old Password is required."),
  newpassword: Yup.string().required("New Password is required"),
  confirmnewpassword: Yup.string().required(
    "Confirm New Password is required."
  ),
});
