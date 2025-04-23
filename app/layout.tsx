import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monosans = Mona_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "smartPrep",
  description: "AI interview assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monosans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
