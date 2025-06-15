export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie('token')
  
    // Kalau belum login dan buka halaman selain login, redirect
    if (!token.value && to.path !== '/login') {
      return navigateTo('/login')
    }
  
    // Kalau udah login dan buka halaman login, redirect ke home
    if (token.value && to.path === '/login') {
      return navigateTo('/home')
    }
  })
  