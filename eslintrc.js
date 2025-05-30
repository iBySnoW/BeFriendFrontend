module.exports = {
  extends: ["next/core-web-vitals", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  rules: {
    // Désactiver les règles qui causent des problèmes de déploiement
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
