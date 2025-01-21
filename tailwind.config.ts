import type { Config } from "tailwindcss";
import {heroui} from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#3D12FA",
        color2: "#6B6B6B",
        color3: "#F4F8FC",
        color4: "#018221",
        color5: "#84C953",
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;