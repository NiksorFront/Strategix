<script setup lang="ts">
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
    --strategix-dark: #202226;
    --strategix-light: #F1F1F1;
    --strategix-accent: #2AB464;
    --strategix-gray: #A7A7A7;
    
    
    --card-radius: min(24px, 1vw + 1vh);
    --gap-grid: clamp(10px, 0.834vw, 20px);

    --padding-section-x: 5vw;

    @media (--pc-width) {
      --padding-section-x: calc((100vw - 2560px) / 2);
    }
  }
  
  .small-text {
    font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 500;          /* Medium */
    font-size: min(14px, 3.6vw);
    line-height: 110%;         
    letter-spacing: 0;
    text-align: center;

    @media(--tablet-width){
      font-size: clamp(14px, 1.1675vw, 28px);
    }

    @media(--mobile-medium) {
      font-size: min(14px, 2.917vh);
    }

  }

  .base-text {
    font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 700;    
    letter-spacing: -3%;
    text-align: center;
    text-transform: none;
  }

  .upperscase-text {
    font-family: "Liberty-MT", "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 400;        
    letter-spacing: 0;
    text-align: center;
    text-transform: none;
    text-transform: uppercase;
  }

  .hover{
    transition: all 0.3s;
  }

  .hover:hover{
    cursor: pointer;
    font-weight: 600 !important;
    text-decoration: underline !important;
    opacity: 0.9;
  }

</style>
