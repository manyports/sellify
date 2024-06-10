import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import QueryProvider from '../components/QueryProvider';  

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sellify",
  description: "Sellify is a platform for selling your products online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
            {children}
        </QueryProvider>
      </body>
    </html>
  );
}
