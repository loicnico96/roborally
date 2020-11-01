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
  settings: {
    react: {
      version: "detect",
    }
  }
}
