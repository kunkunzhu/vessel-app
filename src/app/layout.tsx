/** @format */

import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";

const textFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--body-font",
});

const titleFont = Instrument_Serif({
  subsets: ["latin"],
  variable: "--title-font",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${textFont.variable} ${titleFont.variable} 
        font-text w-screen h-screen flex flex-col bg-background text-primary overflow-hidden`}
      >
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
