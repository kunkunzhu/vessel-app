/** @format */

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
        background: "var(--off-white)",
        primary: "var(--off-black)",
        secondary: "var(--pale-purple)",
        accent: "var(--purple)",
      },
      fontFamily: {
        text: ["var(--text-font)"],
        title: ["var(--title-font)"],
      },
      dropShadow: {
        bullet: "0px 0px 5px rgba(69, 12, 255, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
