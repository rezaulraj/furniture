import type { Metadata } from "next";
import AuthForm from "../../components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Log in — Furniture",
  description: "Log in to manage your orders, wishlist and account.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
