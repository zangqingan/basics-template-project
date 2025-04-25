import js from "@eslint/js";
import globals from "globals";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  // 测试用例
  {
    files: ["./index.js"], //确定配置对象应用于哪些文件
    ignores: ["node_modules"], //确定应该忽略哪些文件
    rules: {
      "no-undef": "warn",
      "no-alert": "error", //禁止使用 alert、confirm 和 prompt
      "no-empty-function": "error", //禁止空函数
      "no-var": "error", //禁止使用var
    },
  },
  // 将 Prettier 作为规则插入到 ESLint 里面
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  // 配置忽略检查文件
  {
    ignores: ["**/node_modules", "**/public", "**/assets", "**/dist", "**/package-lock.json", "**/yarn.lock", "**/pnpm-lock.yaml"],
  },
];
