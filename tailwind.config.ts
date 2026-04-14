import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        jetbrains: ["var(--font-jetbrains)"],
        google: ["var(--font-google)"],
        mozilla: ["var(--font-mozilla)"],
        "mozilla-headline": ["var(--font-mozilla-headline)"],
        noto: ["var(--font-noto)"],
        roboto: ["var(--font-roboto)"],
        space: ["var(--font-space)"],
      },
    },
  },
  plugins: [],
};
export default config;
