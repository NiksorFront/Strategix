<script lang="ts">
  import '@/shared/ui/theme/normalize.css';
  import '@/shared/ui/media.css';
  import '@/shared/ui/font.css';
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

    @media (--tablet-width) {
      --padding-section-x: 5vw;
    }

    @media (--pc-width) {
      --padding-section-x: calc((100vw - 2560px) / 2);
    }
  }
  
  .small-text {
    font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 500;          /* Medium */
    font-size: min(14px, 100%);
    line-height: 110%;         
    letter-spacing: 0;
    text-align: center;
    text-transform: capitalize; /* приближение к макетному Title case */

    @media(--mobile-small) {
      font-size: 87%;
    }

    @media(--big-laptop-width) {
      font-size: clamp(14px, 1.25vw, 28px);
    }
  }

</style>
