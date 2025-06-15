<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
  
    <main class="">
      <NuxtPage />
      <SpeedInsights /> 
    </main>
  </div>
</template>


<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>