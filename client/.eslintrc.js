module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
  ],
  rules: {
    // React hooks
    "react-hooks/exhaustive-deps": ["error"],
    "react-hooks/rules-of-hooks": ["error"],
  },
  settings: {
    react: {
      version: "detect",
    }
  }
}
