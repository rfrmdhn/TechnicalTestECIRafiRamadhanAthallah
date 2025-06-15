<template>
    <div class="min-h-screen bg-gray-50 p-6 max-w-md mx-auto flex flex-col">
      <!-- Tombol Back -->
      <NuxtLink to="/home" class="inline-flex items-center text-blue-600 hover:underline mb-6">
        ← Kembali ke Home
      </NuxtLink>
  
      <!-- Heading -->
      <h1 class="text-2xl font-bold text-gray-800 mb-6">🔤 Spelled Out</h1>
  
      <!-- Form -->
      <form @submit.prevent="confirmDisplay" class="flex flex-col gap-5">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Masukkan jumlah uang</label>
          <input
            v-model="formattedAmount"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Contoh: Rp. 100.000"
            @input="formatInput"
          />
          <p v-if="error" class="text-red-600 text-sm mt-1">{{ error }}</p>
        </div>
  
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition shadow"
        >
          Konversi ke Terbilang
        </button>
      </form>
  
      <!-- Popup Konfirmasi -->
      <div
        v-if="showConfirm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-lg">
          <h2 class="text-lg font-semibold mb-4 text-center text-gray-800">Konfirmasi</h2>
          <p class="text-sm text-center mb-4 text-gray-700">
            Apakah anda yakin ingin menyebutkan <strong>{{ formattedAmount }}</strong>?
          </p>
          <div class="flex justify-between gap-4">
            <button
              @click="showConfirm = false"
              class="w-full border border-gray-300 rounded py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              @click="handleSubmit"
              class="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
            >
              Yakin
            </button>
          </div>
        </div>
      </div>
  
      <!-- Output -->
      <div
        v-if="hasil"
        class="mt-6 p-4 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm"
      >
        {{ hasil }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import toWords from 'terbilang-ts'
  
  const formattedAmount = ref('')
  const hasil = ref('')
  const error = ref('')
  const showConfirm = ref(false)
  
  function formatInput(e: Event) {
    const input = e.target as HTMLInputElement
    let value = input.value.replace(/[^\d]/g, '')
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    formattedAmount.value = value ? 'Rp. ' + value : ''
  }
  
  function confirmDisplay() {
    error.value = ''
    hasil.value = ''
    const numeric = formattedAmount.value.replace(/[^\d]/g, '')
    if (!numeric || isNaN(Number(numeric))) {
      error.value = 'Masukkan angka yang valid.'
      return
    }
    showConfirm.value = true
  }
  
  function handleSubmit() {
    const numeric = formattedAmount.value.replace(/[^\d]/g, '')
    const number = Number(numeric)
    const terbilang = toWords(number)
    hasil.value = terbilang.charAt(0).toUpperCase() + terbilang.slice(1) + ' Rupiah'
    showConfirm.value = false
  }
  </script>
  