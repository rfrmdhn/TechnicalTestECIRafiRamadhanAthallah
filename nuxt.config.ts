export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  css: ['@/assets/css/main.css'],

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },

  router: {
    middleware: ['auth']
  }
})
