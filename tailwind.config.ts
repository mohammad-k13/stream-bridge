import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        white: "var(--white)",
        gray: "var(--gray)",
        black: "var(--black)",
        red: "var(--red)",
        background: "var(--background)",
        "gray-secondary": "var(--gray-econdary)",
        "primary-overlay": "var(--primary-overlay)",
        "black-overlay": "var(--black-overlay)",
        "white-overlay": "var(--white-overlay)",
        "red-overlay": "var(--red-econdoverlayary)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)", // Default radius
      },
      fontSize: {
        "heading-1": "28px",
        "heading-2": "24px",
        "heading-3": "20px",
        "heading-4": "18px",
        "heading-5": "16px",
        "body": "14px",
        "caption": "12px"
      },
    },
  },
  plugins: [],
} satisfies Config;