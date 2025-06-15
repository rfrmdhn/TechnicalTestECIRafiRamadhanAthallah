<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
          <img src="https://eci.id/img/logo_new.webp" alt="Logo ECI" class="h-24" />
        </div>
  
        <!-- Heading -->
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Masuk ke akun Anda</h2>
  
        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-sm text-gray-600 mb-1" for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="contoh@email.com"
              class="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-800 placeholder-gray-400"
            />
            <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
          </div>
  
          <!-- Password -->
          <div>
            <label class="block text-sm text-gray-600 mb-1" for="password">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimal 6 karakter"
                class="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none text-gray-800 placeholder-gray-400"
              />
              <span
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 cursor-pointer"
                @click="togglePassword"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </span>
            </div>
            <p v-if="passwordError" class="text-sm text-red-500 mt-1">{{ passwordError }}</p>
          </div>
  
          <!-- General Error -->
          <p v-if="formError" class="text-center text-sm text-red-500">{{ formError }}</p>
  
          <!-- Tombol Login -->
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const formError = ref('')
  const emailError = ref('')
  const passwordError = ref('')
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const validateForm = () => {
    emailError.value = ''
    passwordError.value = ''
    formError.value = ''
  
    let isValid = true
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.value = 'Format email tidak valid'
      isValid = false
    }
  
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}/.test(password.value)) {
      passwordError.value =
        'Password minimal 6 karakter, huruf besar, kecil, angka dan simbol'
      isValid = false
    }
  
    return isValid
  }
  
  const handleLogin = async () => {
    if (!validateForm()) return
  
    const { data, error } = await useFetch('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })
  
    if (error.value || !data.value?.success) {
      formError.value = 'Email atau password salah'
      return
    }
  
    useCookie('token', { sameSite: 'lax', path: '/' }).value = data.value.token
    await navigateTo('/home')
  }
  </script>
  