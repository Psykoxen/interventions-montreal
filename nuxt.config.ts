// nuxt.config.ts
import path from "path";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-icon", "@nuxt/content", "@nuxt/fonts"],
  css: ["~/assets/css/main.css"],

  alias: {
    "@content": path.resolve(__dirname, "content"),
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: false,
  compatibilityDate: "2024-07-28",
});
