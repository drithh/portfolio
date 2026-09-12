import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  output: "static",
  site: "https://adriel.id",
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon({
      include: {
        "simple-icons": ["*"],
        feather: ["*"],
      },
    }),
  ],
});
