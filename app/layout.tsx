import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Audio Signal Denoising System",
  description: "DSP Mini Project",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
