<template>
    <div class="min-h-screen bg-gray-50 p-6 max-w-md mx-auto flex flex-col">
      <!-- Tombol Back -->
      <NuxtLink to="/home" class="text-blue-600 hover:underline mb-6">← Kembali ke Home</NuxtLink>
  
      <!-- Heading -->
      <h1 class="text-2xl font-bold text-gray-800 mb-6">📄 Form Data</h1>
  
      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
        <!-- Nama -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Nama</label>
          <input
            v-model="form.nama"
            @blur="touched.nama = true"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            required
          />
          <p v-if="touched.nama && form.nama === ''" class="text-red-500 text-sm mt-1">Nama wajib diisi</p>
        </div>
  
        <!-- Nomor HP -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Nomor HP</label>
          <div class="flex gap-2">
            <Multiselect
              v-model="form.kodeNegara"
              :options="negaraOptions"
              placeholder="Pilih negara"
              searchable
              class="w-28"
            />
            <input
              v-model="form.nomorHp"
              @blur="touched.nomorHp = true"
              type="number"
              class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              placeholder="812xxxxxxx"
              pattern="\d{7,15}"
              required
            />
          </div>
          <p
            v-if="touched.nomorHp && form.nomorHp && !/^\d{7,15}$/.test(form.nomorHp)"
            class="text-red-500 text-sm mt-1"
          >
            Nomor HP tidak valid
          </p>
        </div>
  
        <!-- Email -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            @blur="touched.email = true"
            type="email"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            required
          />
          <p
            v-if="touched.email && form.email && !/^\S+@\S+\.\S+$/.test(form.email)"
            class="text-red-500 text-sm mt-1"
          >
            Format email tidak valid
          </p>
        </div>
  
        <!-- Alamat -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Alamat</label>
          <textarea
            v-model="form.alamat"
            @blur="touched.alamat = true"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            required
          ></textarea>
          <p v-if="touched.alamat && form.alamat === ''" class="text-red-500 text-sm mt-1">Alamat wajib diisi</p>
        </div>
  
        <!-- Provinsi -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Provinsi</label>
          <Multiselect
            v-model="form.provinsi"
            @blur="touched.provinsi = true"
            :options="provinsiList"
            placeholder="Pilih provinsi"
            searchable
            class="bg-white"
          />
          <p v-if="touched.provinsi && form.provinsi === ''" class="text-red-500 text-sm mt-1">Provinsi wajib dipilih</p>
        </div>
  
        <!-- Kota -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Kota/Kabupaten</label>
          <Multiselect
            v-model="form.kota"
            @blur="touched.kota = true"
            :options="kotaList"
            placeholder="Pilih kota"
            :disabled="!form.provinsi"
            searchable
            class="bg-white"
          />
          <p v-if="touched.kota && form.provinsi && form.kota === ''" class="text-red-500 text-sm mt-1">Kota wajib dipilih</p>
        </div>
  
        <!-- Kecamatan -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Kecamatan</label>
          <Multiselect
            v-model="form.kecamatan"
            @blur="touched.kecamatan = true"
            :options="kecamatanList"
            placeholder="Pilih kecamatan"
            :disabled="!form.kota"
            searchable
            class="bg-white"
          />
          <p
            v-if="touched.kecamatan && form.kota && form.kecamatan === ''"
            class="text-red-500 text-sm mt-1"
          >
            Kecamatan wajib dipilih
          </p>
        </div>
  
        <!-- Upload Foto -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Foto Profil</label>
          <label
            class="w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-600 transition"
          >
            <div v-if="!preview" class="text-gray-400 text-4xl font-bold">+</div>
            <img
              v-if="preview"
              :src="preview"
              alt="Preview"
              class="w-full h-full object-cover rounded-lg"
            />
            <input type="file" class="hidden" @change="onFileChange" accept="image/*" />
          </label>
          <p v-if="touched.foto && !form.foto" class="text-red-500 text-sm mt-1">Foto wajib diunggah</p>
        </div>
  
        <!-- Tombol Submit -->
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition shadow"
        >
          Kirim
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import Multiselect from '@vueform/multiselect'
  import '@vueform/multiselect/themes/default.css'
  
  const form = ref({
    nama: '',
    nomorHp: '',
    kodeNegara: '+62',
    email: '',
    alamat: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    foto: null
  })
  
  const touched = ref({
    nama: false,
    nomorHp: false,
    email: false,
    alamat: false,
    provinsi: false,
    kota: false,
    kecamatan: false,
    foto: false
  })
  
  const negaraOptions = [
    { label: 'Indonesia (+62)', value: '+62' },
    { label: 'Malaysia (+60)', value: '+60' },
    { label: 'Singapore (+65)', value: '+65' },
    { label: 'Thailand (+66)', value: '+66' }
  ]
  
  const provinsiList = ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Banten']
  const kotaList = ref<string[]>([])
  const kecamatanList = ref<string[]>([])
  
  watch(() => form.value.provinsi, (prov) => {
    form.value.kota = ''
    form.value.kecamatan = ''
    if (prov === 'DKI Jakarta') kotaList.value = ['Jakarta Selatan', 'Jakarta Barat']
    else if (prov === 'Jawa Barat') kotaList.value = ['Bandung', 'Bekasi']
    else if (prov === 'Banten') kotaList.value = ['Serang', 'Tangerang']
    else kotaList.value = []
  })
  
  watch(() => form.value.kota, (kota) => {
    form.value.kecamatan = ''
    if (kota === 'Jakarta Selatan') kecamatanList.value = ['Kebayoran Baru', 'Pasar Minggu']
    else if (kota === 'Bandung') kecamatanList.value = ['Coblong', 'Cicendo']
    else if (kota === 'Serang') kecamatanList.value = ['Kasemen', 'Walantaka']
    else kecamatanList.value = []
  })
  
  const preview = ref<string | null>(null)
  function onFileChange(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    touched.value.foto = true
    if (file) {
      form.value.foto = file
      preview.value = URL.createObjectURL(file)
    }
  }
  
  const router = useRouter()
  function handleSubmit() {
    const query = {
      ...form.value,
      foto: preview.value ?? ''
    }
    router.push({ path: '/result', query })
  }
  </script>
  
  <style scoped>
  @import "@vueform/multiselect/themes/default.css";
  </style>
  