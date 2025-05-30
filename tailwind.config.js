const { themeConfig } = require("./lib/theme-config")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Palette principale BeFriend
        primary: {
          DEFAULT: themeConfig.colors.primary.main,
          foreground: themeConfig.colors.primary.foreground,
        },
        secondary: {
          DEFAULT: themeConfig.colors.secondary.main,
          foreground: themeConfig.colors.secondary.foreground,
        },
        // Neutres et fonds
        neutral: themeConfig.colors.neutral,
        background: "var(--background)",
        card: "var(--card)",
        text: "var(--text)",
        textSecondary: themeConfig.colors.textSecondary,
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        foreground: "var(--foreground)",
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        cardForeground: "hsl(var(--card-foreground))",
      },
      borderRadius: {
        DEFAULT: themeConfig.borders.radius.DEFAULT,
        lg: themeConfig.borders.radius.lg,
        md: themeConfig.borders.radius.md,
        sm: themeConfig.borders.radius.sm,
      },
      fontFamily: {
        sans: [...themeConfig.typography.fontFamily.sans],
        heading: [...themeConfig.typography.fontFamily.heading],
      },
      boxShadow: {
        card: themeConfig.shadows.card,
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
