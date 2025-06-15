export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vercel/speed-insights/nuxt' 
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
