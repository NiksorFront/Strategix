<script lang="ts">
  import '@/shared/ui/theme/normalize.css';
  import '@/shared/ui/media.css';
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  :root {
    --break-xs: 390px;
    --break-sm: 768px;
    --break-xl: 1200px;
    --break-3xl: 2620px;

    --background-dark: #202226;
    --background-light: #F1F1F1;

    --padding-section-x: 2.55vw;

    @media (--tablet-width) {
      --padding-section-x: 5vw;
    }

    @media (--pc-width) {
      --padding-section-x: calc((100vw - 2560px) / 2);
    }
  }

</style>
