<script setup lang="ts">
  import '@/shared/ui/theme/normalize.css';
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  :root {
    --background-dark: #202226;
    --background-light: #F1F1F1;

    --padding-section-x: 2.55vw;

  }

  @media (width > 768px) {
    :root {
      --padding-section-x: 5vw;
    }
  }

  @media (width > 2620px) {
    :root {
      --padding-section-x: calc((100vw - 2560px) / 2);
    }
  }
</style>
