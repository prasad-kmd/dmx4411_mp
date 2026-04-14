import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const googleSans = localFont({
  src: [
    {
      path: "../public/fonts/GoogleSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-primary",
});

const jetBrainsMono = localFont({
  src: [
    {
      path: "../public/fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Audio Signal Denoising | DSP Mini Project",
    template: "%s | DSP Mini Project",
  },
  description: "Digital Signal Processing project focused on audio noise removal using MATLAB filter design and frequency domain analysis.",
  keywords: ["Digital Signal Processing", "DSP", "Audio Denoising", "MATLAB", "Butterworth Filter", "FFT Analysis"],
  authors: [{ name: "Undergraduate Researcher" }],
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${googleSans.variable} ${jetBrainsMono.variable} font-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
