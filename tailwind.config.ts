// architect sys override
import type { Config } from "tailwindcss";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F6",
        foreground: "#1A1A1A",
        terracotta: "#E07A5F",
        olive: "#81B29A",
      },
      fontFamily: {
        serif: ['var(--font-instrument)'],
        sans: ['var(--font-dm-sans)'],
      }
    },
  },
  plugins: [],
} satisfies Config;
