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
      primary: "#2C8EE3",
      white: "#ffffff",
      black: "#0E1012",
      primaryText: "#1C1744",
      lightPrimary: "#2C8EE324",
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
      },
      whiteAlpha: {
        50: "#FFFFFF0A",
        100: "#FFFFFF0F",
        200: "#FFFFFF14",
        300: "#FFFFFF29",
        400: "#FFFFFF3D",
        500: "#FFFFFF5C",
        600: "#FFFFFF7A",
        700: "#FFFFFFA3",
        800: "#FFFFFFCC",
        900: "#FFFFFFEB"
      },
      blackAlpha: {
        50: "#0000000A",
        100: "#0000000F",
        200: "#00000014",
        300: "#00000029",
        400: "#0000003D",
        500: "#0000005C",
        600: "#0000007A",
        700: "#000000A3",
        800: "#000000CC",
        900: "#000000EB"
      },
      // primary: {
      //   50: "#F9F6FD",
      //   100: "#E5DAF8",
      //   200: "#D3BEF4",
      //   300: "#B795EC",
      //   400: "#A379E7",
      //   500: "#8952E0",
      //   600: "#7434DB",
      //   700: "#6023C0",
      //   800: "#4F1D9E",
      //   900: "#3B1676"
      // },
      secondary: {
        50: "#F4FBFD",
        100: "#D0EEF7",
        200: "#BAE7F3",
        300: "#A2DEEE",
        400: "#53C2E1",
        500: "#2AB4D9",
        600: "#24A2C4",
        700: "#1E86A2",
        800: "#196E85",
        900: "#135567"
      },
      red: {
        50: "#FFF5F5",
        100: "#F8D9D8",
        200: "#F1B8B4",
        300: "#E98D87",
        400: "#E4726C",
        500: "#DC4A41",
        600: "#D2140A",
        700: "#AC0900",
        800: "#930800",
        900: "#6D0600"
      },
      orange: {
        50: "#FDFAF6",
        100: "#F9EBDB",
        200: "#F1D4B1",
        300: "#E6B273",
        400: "#DC9239",
        500: "#C37B24",
        600: "#A5681E",
        700: "#835318",
        800: "#674113",
        900: "#553610"
      },
      yellow: {
        50: "#FFFEFB",
        100: "#FFF8E9",
        200: "#FEECBD",
        300: "#FDDC87",
        400: "#FBC434",
        500: "#D2A01E",
        600: "#A88018",
        700: "#836413",
        800: "#624B0E",
        900: "#513E0C"
      },
      green: {
        50: "#F7FDFB",
        100: "#D2F2E7",
        200: "#9FE3CD",
        300: "#64D2AD",
        400: "#1DBD88",
        500: "#0EA371",
        600: "#0C875E",
        700: "#096949",
        800: "#07563C",
        900: "#064731"
      },
      teal: {
        50: "#F1FCFC",
        100: "#C0F1F4",
        200: "#84E4E9",
        300: "#2DD1DA",
        400: "#22B2BA",
        500: "#1D979E",
        600: "#187B80",
        700: "#125F64",
        800: "#0F5053",
        900: "#0D4244"
      },
      blue: {
        50: "#F1F6FD",
        100: "#CDE0F6",
        200: "#A8C8F0",
        300: "#7FAFE8",
        400: "#5896E1",
        500: "#347FDB",
        600: "#236ABF",
        700: "#1B5192",
        800: "#164278",
        900: "#123662"
      },
      cyan: {
        50: "#F4FBFD",
        100: "#D0EEF7",
        200: "#BAE7F3",
        300: "#A2DEEE",
        400: "#53C2E1",
        500: "#2AB4D9",
        600: "#24A2C4",
        700: "#1E86A2",
        800: "#196E85",
        900: "#135567"
      },
      purple: {
        50: "#F9F6FD",
        100: "#E5DAF8",
        200: "#D3BEF4",
        300: "#B795EC",
        400: "#A379E7",
        500: "#8952E0",
        600: "#7434DB",
        700: "#6023C0",
        800: "#4F1D9E",
        900: "#3B1676"
      },
      pink: {
        50: "#FDF5F9",
        100: "#F8D9E7",
        200: "#F3B9D3",
        300: "#EB8DB8",
        400: "#E56BA2",
        500: "#DC3882",
        600: "#C4246C",
        700: "#A01D58",
        800: "#7D1745",
        900: "#5D1133"
      },
      linkedin: {
        50: "#E8F4F9",
        100: "#CFEDFB",
        200: "#9BDAF3",
        300: "#68C7EC",
        400: "#34B3E4",
        500: "#00A0DC",
        600: "#008CC9",
        700: "#0077B5",
        800: "#005E93",
        900: "#004471"
      },
      facebook: {
        50: "#E8F4F9",
        100: "#D9DEE9",
        200: "#B7C2DA",
        300: "#6482C0",
        400: "#4267B2",
        500: "#385898",
        600: "#314E89",
        700: "#29487D",
        800: "#223B67",
        900: "#1E355B"
      },
      messenger: {
        50: "#D0E6FF",
        100: "#B9DAFF",
        200: "#A2CDFF",
        300: "#7AB8FF",
        400: "#2E90FF",
        500: "#0078FF",
        600: "#0063D1",
        700: "#0052AC",
        800: "#003C7E",
        900: "#002C5C"
      },
      whatsapp: {
        50: "#dffeec",
        100: "#b9f5d0",
        200: "#90edb3",
        300: "#65e495",
        400: "#3cdd78",
        500: "#22c35e",
        600: "#179848",
        700: "#0c6c33",
        800: "#01421c",
        900: "#001803"
      },
      twitter: {
        50: "#E5F4FD",
        100: "#C8E9FB",
        200: "#A8DCFA",
        300: "#83CDF7",
        400: "#57BBF5",
        500: "#1DA1F2",
        600: "#1A94DA",
        700: "#1681BF",
        800: "#136B9E",
        900: "#0D4D71"
      },
      telegram: {
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#0088CC",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E"
      }
    },
    extend: {}
  },
  plugins: []
} satisfies Config;
