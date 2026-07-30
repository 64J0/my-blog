const nextConfig = require("eslint-config-next");

module.exports = [
  ...nextConfig,
  {
    ignores: ["out/**", "coverage/**", "public/**"],
  },
  {
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "@next/next/no-img-element": "off",
      "@next/next/next-script-for-ga": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];
