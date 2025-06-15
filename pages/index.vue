<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h1 class="text-2xl font-bold mb-6 text-center text-blue-700">Login</h1>
  
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Masukkan email"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': emailError }"
              required
              @blur="validateEmail"
            />
            <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
          </div>
  
          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Masukkan password"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                :class="{ 'border-red-500': passwordError }"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <UIcon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
              </button>
            </div>
            <p v-if="passwordError" class="text-sm text-red-500 mt-1">{{ passwordError }}</p>
          </div>
  
          <!-- Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const email = ref('')
  const password = ref('')
  const emailError = ref('')
  const passwordError = ref('')
  const showPassword = ref(false)
  
  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      emailError.value = 'Format email tidak valid.'
    } else {
      emailError.value = ''
    }
  }
  
  function handleLogin() {
    emailError.value = ''
    passwordError.value = ''
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
    if (!emailRegex.test(email.value)) {
      emailError.value = 'Format email tidak valid.'
      return
    }
  
    // if (email.value !== 'admin@example.com') {
    //   emailError.value = 'Email tidak terdaftar.'
    //   return
    // }
  
    // if (password.value !== 'password123') {
    //   passwordError.value = 'Password salah.'
    //   return
    // }
  
    localStorage.setItem('token', 'mock-token-eci')
    router.push('/home')
  }
  </script>
  