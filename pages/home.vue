<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 relative">
      <!-- Tombol Logout -->
      <div class="absolute top-4 right-4">
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition shadow"
          @click="logout"
        >
          Logout
        </button>
      </div>
  
      <!-- Heading -->
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
        Selamat Datang 👋<br />
        Silakan pilih modul
      </h1>
  
      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <!-- Card: Get the Stars -->
        <div
          class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 flex flex-col items-center text-center border border-gray-200"
        >
          <div class="text-4xl mb-2">⭐</div>
          <p class="text-lg font-semibold text-gray-800">Get the Stars</p>
          <button
            class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition shadow-sm"
            @click="goTo('/stars')"
          >
            Buka Modul
          </button>
        </div>
  
        <!-- Card: Spelled Out -->
        <div
          class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 flex flex-col items-center text-center border border-gray-200"
        >
          <div class="text-4xl mb-2">🔢</div>
          <p class="text-lg font-semibold text-gray-800">Spelled Out</p>
          <button
            class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition shadow-sm"
            @click="goTo('/spelled')"
          >
            Buka Modul
          </button>
        </div>
  
        <!-- Card: Form Data -->
        <div
          class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 flex flex-col items-center text-center border border-gray-200"
        >
          <div class="text-4xl mb-2">📝</div>
          <p class="text-lg font-semibold text-gray-800">Form Data</p>
          <button
            class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition shadow-sm"
            @click="goTo('/formData/form')"
          >
            Buka Modul
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const goTo = (path: string) => {
    navigateTo(path)
  }
  
  const logout = () => {
    useCookie('token').value = null
    navigateTo('/login')
  }
  </script>
  