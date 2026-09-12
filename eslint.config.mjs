import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: [
      ".astro/**",
      ".next/**",
      ".superpowers/**",
      "dist/**",
      "node_modules/**",
    ],
  },
];
