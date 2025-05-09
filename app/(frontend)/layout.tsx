import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RightsFooter from "./components/AllRights";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Summit Valley Properties",
  description: "Future Choice",
};

export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
  children,
  auth,
}: {
  children: React.ReactNode;
  auth?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        // style={{ fontFamily: "var(--font-rocksalt)" }}
        
      >
        <header>
          <Header/>
        </header>

        <main>
          {children}

          <SpeedInsights />
          <Analytics />
        </main>
          {auth}

        <footer>
          <Footer />
          <RightsFooter />
        </footer>
      </body>
    </html>
  );
}
