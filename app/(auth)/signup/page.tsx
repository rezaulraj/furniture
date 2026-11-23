import type { Metadata } from "next";
import AuthForm from "../../components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign up — Furniture",
  description: "Create an account for faster checkout, wishlists and members-only offers.",
};

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
