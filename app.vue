<template>
  <div>
    <NuxtLayout />
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      src: 'https://speed.vercel.dev/script.js',
      'data-sdkn': 'speed-insights',
      defer: true
    }
  ]
})
</script>
