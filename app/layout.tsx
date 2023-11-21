import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Redressed } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CartProvider from "@/providers/CartProvider";
import { Providers } from "./Providers/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--f1",
});
const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--f2",
});

export const metadata: Metadata = {
  title: "E-Shop",
  description: "E-Shop app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${redressed.variable} text-slate-700`}
      >
        <Providers>
          <CartProvider>
            <div className="flex h-screen flex-col overflow-x-hidden">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
