import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0f1f3d",
          light: "#1a3460",
        },
        cream: {
          DEFAULT: "#faf8f4",
          dark: "#f0ece4",
        },
        text: {
          primary: "#1a1a2e",
          secondary: "#4a5568",
        },
        accent: "#c8973a",
        border: "#e2d9cc",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text.primary"),
            a: {
              color: theme("colors.accent"),
              "&:hover": {
                color: theme("colors.navy.DEFAULT"),
              },
            },
            h1: {
              color: theme("colors.navy.DEFAULT"),
              fontFamily: 'Playfair Display, serif',
            },
            h2: {
              color: theme("colors.navy.DEFAULT"),
              fontFamily: 'Playfair Display, serif',
            },
            h3: {
              color: theme("colors.navy.DEFAULT"),
              fontFamily: 'Playfair Display, serif',
            },
            h4: {
              color: theme("colors.navy.DEFAULT"),
              fontFamily: 'Playfair Display, serif',
            },
            code: {
              color: theme("colors.navy.light"),
              backgroundColor: theme("colors.cream.dark"),
              padding: "2px 4px",
              borderRadius: "4px",
              fontFamily: "JetBrains Mono, monospace",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
