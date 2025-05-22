"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/common/ThemeProvider";
import RouteProgress from "@/components/layout/common/RouteProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} ${geistSans.className}`}
        cz-shortcut-listen="true"
      >
        <Providers>
          <RouteProgress />
          {children}
        </Providers>
      </body>
    </html >
  );
}
