module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [
      "client/tsconfig.json",
      "functions/tsconfig.json",
    ],
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "import",
  ]
}
