import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
// import Header from "./components/Header"; // Will be styled later
import Footer from "./components/Footer"; // Will be styled later
import Navbar from "./components/Navbar"; // Import Navbar

const cyberpunkFont = Rajdhani({
  weight: ["600"], // Use 600 for bold futuristic style
  subsets: ["latin"],
  variable: "--font-cyberpunk",
});

export const metadata: Metadata = {
  title: "PulseWave - The Gamer’s Hub",
  description:
    "Stay updated with the latest gaming news, trending videos, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cyberpunkFont.variable} bg-black text-white min-h-screen flex flex-col`}
      >
        <Navbar />
        {/* <Header /> */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
