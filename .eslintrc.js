module.exports = {
  env: {
    node: true,
    jest: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "script"
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
};
