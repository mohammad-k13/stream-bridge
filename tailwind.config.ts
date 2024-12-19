import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", "[data-theme='dark']"], // Enable theme switching via `class` or `[data-theme]`
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        white: 'var(--white)',
        gray: 'var(--gray)',
        black: 'var(--black)',
        red: 'var(--red)',
        background: 'var(--background)',
        graySecondary: 'var(--gray-econdary)',
        primaryOverlay: 'var(--primary-overlay)',
        blackOverlay: 'var(--black-overlay)',
        whiteOverlay: 'var(--white-overlay)',
        redOverlay: 'var(--red-econdoverlayary)',
      },
      fontFamily: {
        Commissioner: ['Commissioner', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;