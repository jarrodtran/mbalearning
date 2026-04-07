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
          DEFAULT: "#0F172A", // Deep Slate
          light: "#1E293B",
        },
        cream: {
          DEFAULT: "#F8FAFC", // Cool White
          dark: "#F1F5F9",
        },
        text: {
          primary: "#0F172A",
          secondary: "#64748B",
        },
        accent: "#4F46E5", // Indigo
        accent_hover: "#4338CA",
        accent_secondary: "#E11D48", // Rose
        border: "#E2E8F0",
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
