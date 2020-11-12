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
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [
      "client/tsconfig.json",
      "functions/tsconfig.json",
      "tsconfig.json",
    ],
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    // TypeScript
    "@typescript-eslint/explicit-module-boundary-types": ["warn"],
    "@typescript-eslint/method-signature-style": ["error", "property"],
    "@typescript-eslint/no-dynamic-delete": ["error"],
    "@typescript-eslint/no-explicit-any": ["warn"],
    "@typescript-eslint/no-invalid-void-type": ["error"],
    "@typescript-eslint/no-require-imports": ["error"],
    "@typescript-eslint/no-throw-literal": ["error"],
    "@typescript-eslint/prefer-enum-initializers": ["error"],
    "@typescript-eslint/prefer-for-of": ["error"],
    "@typescript-eslint/prefer-function-type": ["error"],
    "@typescript-eslint/prefer-includes": ["error"],
    "@typescript-eslint/prefer-literal-enum-member": ["error"],
    "@typescript-eslint/prefer-nullish-coalescing": ["error"],
    "@typescript-eslint/prefer-optional-chain": ["error"],
    "@typescript-eslint/prefer-readonly": ["error"],
    "@typescript-eslint/prefer-string-starts-ends-with": ["error"],
    "@typescript-eslint/prefer-ts-expect-error": ["error"],
    "@typescript-eslint/promise-function-async": ["error"],
    "@typescript-eslint/require-array-sort-compare": ["error"],
    "@typescript-eslint/strict-boolean-expressions": ["error"],
    "@typescript-eslint/switch-exhaustiveness-check": ["error"],
    "@typescript-eslint/type-annotation-spacing": ["error"],


    // Typescript Overrides
    "@typescript-eslint/brace-style": ["error", "1tbs", {
      "allowSingleLine": true
    }],
    "@typescript-eslint/comma-dangle": ["error", {
      "arrays": "always-multiline",
      "enums": "always-multiline",
      "exports": "always-multiline",
      "functions": "never",
      "generics": "never",
      "imports": "always-multiline",
      "objects": "always-multiline",
      "tuples": "never",
    }],
    "@typescript-eslint/comma-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "@typescript-eslint/default-param-last": ["error"],
    "@typescript-eslint/dot-notation": ["error"],
    "@typescript-eslint/func-call-spacing": ["error", "never"],
    "@typescript-eslint/indent": ["error", 2, {
      "SwitchCase": 1
    }],
    "@typescript-eslint/keyword-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "@typescript-eslint/no-dupe-class-members": ["error"],
    "@typescript-eslint/no-duplicate-imports": ["error"],
    "@typescript-eslint/no-invalid-this": ["error"],
    "@typescript-eslint/no-loop-func": ["error"],
    "@typescript-eslint/no-loss-of-precision": ["error"],
    "@typescript-eslint/no-redeclare": ["error"],
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-expressions": ["error"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-use-before-define": ["warn"],
    "@typescript-eslint/no-useless-constructor": ["error"],
    "@typescript-eslint/return-await": ["error"],
    "@typescript-eslint/semi": ["error", "never"],

    // Possible Errors
    "no-await-in-loop": ["warn"],
    "no-console": ["warn"],
    "no-promise-executor-return": ["error"],
    "no-unreachable-loop": ["error"],
    "require-atomic-updates": ["error"],

    // Best Practices
    "block-scoped-var": ["error"],
    "class-methods-use-this": ["error"],
    "consistent-return": ["error"],
    "curly": ["error", "all"],
    "default-case": ["error"],
    "default-case-last": ["error"],
    "dot-location": ["error", "property"],
    "eqeqeq": ["error", "always"],
    "no-alert": ["error"],
    "no-caller": ["error"],
    "no-constructor-return": ["error"],
    "no-eval": ["error"],
    "no-extend-native": ["error"],
    "no-extra-bind": ["error"],
    "no-extra-label": ["error"],
    "no-floating-decimal": ["error"],
    "no-implied-eval": ["error"],
    "no-iterator": ["error"],
    "no-labels": ["error"],
    "no-lone-blocks": ["error"],
    "no-multi-str": ["error"],
    "no-new": ["error"],
    "no-new-func": ["error"],
    "no-new-wrappers": ["error"],
    "no-param-reassign": ["error"],
    "no-proto": ["error"],
    "no-return-assign": ["error"],
    "no-return-await": ["error"],
    "no-script-url": ["error"],
    "no-self-compare": ["error"],
    "no-sequences": ["error"],
    "no-throw-literal": ["error"],
    "no-unmodified-loop-condition": ["error"],
    "no-useless-call": ["warn"],
    "no-useless-concat": ["warn"],
    "no-useless-return": ["error"],
    "prefer-promise-reject-errors": ["error"],
    "prefer-regex-literals": ["error"],
    "radix": ["error"],
    "require-await": ["warn"],
    "vars-on-top": ["error"],
    "wrap-iife": ["error", "outside"],
    "yoda": ["error", "never"],

    // Strict
    "strict": ["error", "never"],

    // Variables
    "no-label-var": ["error"],

    // Style
    "array-bracket-newline": ["error", {
      "multiline": true
    }],
    "array-bracket-spacing": ["error", "never"],
    "array-element-newline": ["error", "consistent"],
    "block-spacing": ["error", "always"],
    "camelcase": ["error", {
      "properties": "always"
    }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": ["error", "always"],
    "function-call-argument-newline": ["error", "consistent"],
    "jsx-quotes": ["error", "prefer-double"],
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true
    }],
    "linebreak-style": ["error", "unix"],
    "max-len": ["warn", 80],
    "max-params": ["warn", 5],
    "multiline-ternary": ["error", "always-multiline"],
    "new-parens": ["error", "always"],
    "no-array-constructor": ["error"],
    "no-bitwise": ["error"],
    "no-continue": ["error"],
    "no-lonely-if": ["error"],
    "no-multi-assign": ["error"],
    "no-multiple-empty-lines": ["error", {
      "max": 2,
      "maxBOF": 0,
      "maxEOF": 0
    }],
    "no-new-object": ["error"],
    "no-plusplus": ["error", {
      "allowForLoopAfterthoughts": true
    }],
    "no-tabs": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unneeded-ternary": ["error"],
    "no-whitespace-before-property": ["error"],
    "object-curly-newline": ["error", {
      "consistent": true,
    }],
    "object-curly-spacing": ["error", "always"],
    "one-var": ["error", "never"],
    "operator-assignment": ["error", "always"],
    "operator-linebreak": ["error", "after", {
      "overrides": {
        "?": "before",
        ":": "before"
      }
    }],
    "padded-blocks": ["error", "never"],
    "prefer-exponentiation-operator": ["error"],
    "prefer-object-spread": ["error"],
    "quote-props": ["error", "as-needed"],
    "semi-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "space-before-blocks": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": ["error"],
    "space-unary-ops": ["error", {
      "nonwords": false,
      "words": true
    }],
    "switch-colon-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "template-tag-spacing": ["error", "never"],
    "unicode-bom": ["error", "never"],

    // ES6
    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "no-useless-computed-key": ["error"],
    "no-useless-constructor": ["error"],
    "no-useless-rename": ["error"],
    "no-var": ["error"],
    "object-shorthand": ["error", "always"],
    "prefer-arrow-callback": ["error"],
    "prefer-const": ["error"],
    "prefer-destructuring": ["error"],
    "prefer-rest-params": ["error"],
    "prefer-spread": ["error"],
    "prefer-template": ["error"],
    "rest-spread-spacing": ["error", "never"],
    "symbol-description": ["error"],
    "template-curly-spacing": ["error", "never"]
  }
}
