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
          DEFAULT: "#050517", // Deeper Ivy Black/Navy
          light: "#0F172A",
        },
        cream: {
          DEFAULT: "#FDFBF7", // Warmer academic white
          dark: "#F3F0E9",
        },
        text: {
          primary: "#050517",
          secondary: "#5C616B",
        },
        accent: "#8C1515", // Stanford Cardinal
        accent_hover: "#730E0E",
        accent_secondary: "#A51C30", // Harvard Crimson
        border: "#EAE5DC",
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
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
