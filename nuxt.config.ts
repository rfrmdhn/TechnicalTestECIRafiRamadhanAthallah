// nuxt.config.ts
export default defineNuxtConfig({
  // Module bawaan Nuxt
  modules: [
    '@nuxtjs/tailwindcss', // Tailwind CSS
  ],

  // File global CSS
  css: ['@/assets/css/main.css'],

  // Aktifkan devtools
  devtools: { enabled: true },

  // Runtime Config (jika nanti pakai env/token)
  runtimeConfig: {
    public: {
      apiBase: '/api' // Default base URL untuk useFetch
    }
  },

  // Router middleware global
  router: {
    middleware: ['auth'] // Ini opsional, jika ingin eksplisit
  }
})
