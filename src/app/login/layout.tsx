import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Widd",
  description: "Login Page",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
