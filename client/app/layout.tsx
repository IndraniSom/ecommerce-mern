import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MyContextProvider } from "@/Context/CartContext";
import { AuthProvider } from "@/Context/AuthContext";
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARC",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <MyContextProvider>
    <html lang="en">
      <link rel="icon" href="/assets/favicon.ico" sizes="512x512" />
      <body className={inter.className}>{children}</body>
    </html>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"
          />
    </MyContextProvider>
    </AuthProvider>
  );
}
