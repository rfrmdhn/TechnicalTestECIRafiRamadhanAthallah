<template>
    <div class="min-h-screen bg-gray-50 p-6 max-w-md mx-auto flex flex-col rounded-lg shadow-md">
      <NuxtLink
        to="/home"
        class="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block"
      >
        ← Kembali ke Home
      </NuxtLink>
  
      <h1 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>📊</span> Data Dikirim
      </h1>
  
      <div class="bg-white rounded-lg shadow p-5">
        <dl class="divide-y divide-gray-200">
          <div class="py-3 flex justify-between">
            <dt class="font-medium text-gray-700">Nama</dt>
            <dd class="text-gray-900">{{ getQueryValue('nama') || '-' }}</dd>
          </div>
  
          <div class="py-3 flex justify-between">
            <dt class="font-medium text-gray-700">Nomor HP</dt>
            <dd class="text-gray-900">
              {{ getQueryValue('kodeNegara') || '' }} {{ getQueryValue('nomorHp') || '-' }}
            </dd>
          </div>
  
          <div class="py-3 flex justify-between">
            <dt class="font-medium text-gray-700">Email</dt>
            <dd class="text-gray-900">{{ getQueryValue('email') || '-' }}</dd>
          </div>
  
          <div class="py-3 flex justify-between">
            <dt class="font-medium text-gray-700">Alamat</dt>
            <dd class="text-gray-900 max-w-xs text-right break-words">
              {{ getQueryValue('alamat') || '-' }}
            </dd>
          </div>
  
          <div class="py-3 flex justify-between">
            <dt class="font-medium text-gray-700">Provinsi</dt>
            <dd class="text-gray-900">{{ getQueryValue('provinsi') || '-' }}</dd>
          </div>
  
          <div class="py-3 flex justify-between">
            <dt class="font-medium text-gray-700">Kota</dt>
            <dd class="text-gray-900">{{ getQueryValue('kota') || '-' }}</dd>
          </div>
  
          <div class="py-3 flex justify-between">
            <dt class="font-medium text-gray-700">Kecamatan</dt>
            <dd class="text-gray-900">{{ getQueryValue('kecamatan') || '-' }}</dd>
          </div>
  
          <div v-if="getQueryValue('foto')" class="py-3 flex flex-col items-center">
            <dt class="font-medium text-gray-700 mb-2">Foto Profil</dt>
            <dd>
              <img
                :src="getQueryValue('foto')"
                alt="Foto Profil"
                class="w-32 h-32 rounded-lg object-cover border border-gray-300 shadow-sm"
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  function getQueryValue(key: string): string {
    const val = route.query[key]
    if (Array.isArray(val)) return val[0] || ''
    if (!val) return ''
    return val.toString()
  }
  </script>
  