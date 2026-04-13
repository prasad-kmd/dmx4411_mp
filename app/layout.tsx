import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextMenu from "@/components/features/ContextMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSP Audio Noise Removal Project",
  description: "Undergraduate Research Project on Digital Signal Processing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ContextMenu />
      </body>
    </html>
  );
}
