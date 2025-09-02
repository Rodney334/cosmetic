// components/Layout.tsx
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TokenExpirationHandler from "@/components/TokenExpirationHandler";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <TokenExpirationHandler />
      <Footer />
    </div>
  );
}
