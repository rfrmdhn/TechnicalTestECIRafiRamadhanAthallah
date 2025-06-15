<template>
    <div class="min-h-screen bg-gray-50 p-6 max-w-md mx-auto flex flex-col">
      <!-- Tombol Back -->
      <NuxtLink
        to="/home"
        class="inline-flex items-center text-blue-600 hover:underline mb-6"
      >
        ← Kembali ke Home
      </NuxtLink>
  
      <!-- Judul -->
      <h1 class="text-2xl font-bold text-gray-800 mb-6">⭐ Get the Stars</h1>
  
      <!-- Form -->
      <form @submit.prevent="confirmDisplay" class="flex flex-col gap-5">
        <!-- Input Jumlah Baris -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            Jumlah Baris Bintang
          </label>
          <input
            v-model.number="count"
            type="number"
            min="1"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Contoh: 5"
          />
        </div>
  
        <!-- Radio Tipe Alignment -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            Tipe Alignment
          </label>
          <div class="flex flex-col gap-2 text-gray-700">
            <label class="inline-flex items-center gap-2">
              <input type="radio" v-model="type" value="left" />
              Type 1 (Kiri)
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="radio" v-model="type" value="right" />
              Type 2 (Kanan)
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="radio" v-model="type" value="center" />
              Type 3 (Tengah)
            </label>
          </div>
        </div>
  
        <!-- Tombol Tampilkan -->
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition shadow"
        >
          Tampilkan
        </button>
      </form>
  
      <!-- Popup Konfirmasi -->
      <div
        v-if="showConfirm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-lg">
          <h2 class="text-lg font-semibold mb-4 text-center text-gray-800">
            Konfirmasi
          </h2>
          <p class="text-sm text-center mb-4 text-gray-700">
            Apakah kamu yakin ingin menampilkan <strong>{{ count }}</strong> baris
            bintang dengan
            <strong>
              {{
                type === 'left'
                  ? 'Type 1'
                  : type === 'right'
                  ? 'Type 2'
                  : 'Type 3'
              }}
            </strong>?
          </p>
          <div class="flex justify-between gap-4">
            <button
              @click="showConfirm = false"
              class="w-full border border-gray-300 rounded py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              @click="generateStars"
              class="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
            >
              Yakin
            </button>
          </div>
        </div>
      </div>
  
      <!-- Output Stars -->
      <div v-if="stars.length" class="mt-6 space-y-1">
        <div
          v-for="(count, index) in stars"
          :key="index"
          :class="[
            'flex font-mono text-yellow-500',
            finalType === 'left'
              ? 'justify-start'
              : finalType === 'right'
              ? 'justify-end'
              : 'justify-center'
          ]"
        >
          <span>{{ '⭐'.repeat(count) }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const count = ref(0)
  const type = ref('left')
  const stars = ref([])
  
  const finalType = ref('left')
  const finalCount = ref(0)
  const showConfirm = ref(false)
  
  function confirmDisplay() {
    if (count.value < 1) return
    showConfirm.value = true
  }
  
  function generateStars() {
    const result = []
    for (let i = 1; i <= count.value; i++) {
      result.push(i)
    }
    stars.value = result
    finalCount.value = count.value
    finalType.value = type.value
    showConfirm.value = false
  }
  </script>
  