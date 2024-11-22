import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,tsx,mdx}"
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1792px"
    },
    colors: {
      primary: "#7BB933",
      white: "#ffffff",
      black: "#0E1012",
      primaryText: "#274D44",
      gray: {
        50: "#F9FAFA",
        100: "#F1F1F2",
        200: "#E7E7E8",
        300: "#D3D4D5",
        400: "#ABADAF",
        500: "#7D7F83",
        600: "#52555A",
        700: "#33373D",
        800: "#1D2025",
        900: "#171A1D"
      }
    },
    extend: {}
  },
  plugins: []
} satisfies Config;
