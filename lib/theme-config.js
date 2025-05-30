exports.themeConfig = {
  colors: {
    primary: {
      main: "#FFA726", // Orange vif (CTA principal)
      foreground: "#222222", // Texte noir sur orange
    },
    secondary: {
      main: "#FF6B6B", // Corail (alerte, bouton secondaire)
      foreground: "#FFFFFF", // Texte blanc sur corail
    },
    neutral: {
      50: "#F5F5F5",   // Presque blanc (texte principal sur fond sombre)
      100: "#B0B3C6",  // Gris clair (texte secondaire sur fond sombre)
      900: "#181C27",  // Bleu nuit (fond dark)
    },
    background: "hsl(var(--background))",
    card: "hsl(var(--card))",
    text: "hsl(var(--text))",
    textSecondary: "#B0B3C6", // Texte secondaire sur fond dark
  },
  borders: {
    radius: {
      DEFAULT: "16px",
      lg: "16px",
      md: "12px",
      sm: "8px",
    },
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      heading: ["Inter", "sans-serif"],
    },
  },
  shadows: {
    card: "0 2px 8px rgba(24,28,39,0.08)",
  },
}; 