import type { Metadata } from "next";
import "./globals.css";
import ContextMenu from "@/components/features/ContextMenu";

export const metadata: Metadata = {
  title: {
    default: "DSP.Audio | Research Portfolio",
    template: "%s | DSP.Audio"
  },
  description: "Advanced undergraduate research on audio signal denoising using MATLAB and Butterworth filter implementations.",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "DSP Audio Noise Removal Project",
    description: "Explore frequency domain analysis and filter design for audio signals.",
    type: "website",
    locale: "en_US",
    siteName: "DSP.Audio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
        <ContextMenu />
      </body>
    </html>
  );
}
