import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "images/**", "jenkins-pipeline-lab/**"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,   // console, process, require, module
        ...globals.jest,   // test, expect, describe
      },
    },
  },
];
