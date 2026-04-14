import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "../components/Providers";
import { MainLayout } from "../components/layout/MainLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | Audio Signal Denoising System",
    default: "Audio Signal Denoising System - DSP Mini Project",
  },
  description: "Comprehensive audio signal processing and noise removal project report.",
  keywords: ["DSP", "audio processing", "noise removal", "MATLAB", "filters"],
  authors: [{ name: "Undergraduate Student" }],
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-inter">
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
