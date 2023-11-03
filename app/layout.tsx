import type { Metadata } from "next";

import { Montserrat } from "next/font/google";

import "./globals.css";

const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mont",
});

export const metadata: Metadata = {
  title: "Fetch Frontend Take-Home",
  description: "Find your best friend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mont.variable}`}>
        <div className="main">
          <div className="gradient" />
        </div>
        {children}
      </body>
    </html>
  );
}
