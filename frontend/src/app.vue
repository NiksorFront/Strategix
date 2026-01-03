<script setup lang="ts">
  import { onMounted, onBeforeUnmount } from 'vue';
  import { useHead } from '#imports';
  import { useLocaleHead } from '#i18n';

  // SEO/meta tags for current locale (lang, dir, hreflang)
  const head = useLocaleHead({
    lang: true,
    dir: true,
    seo: true,
  });

  useHead(head);

  onMounted(() => {
    const ua = navigator.userAgent;
    // ограничиваем логику браузерами на WebKit (Safari, iOS WebView/Chrome)
    const isWebKit = /AppleWebKit/.test(ua) && !/Chrome|Chromium|OPR|Edg/.test(ua);

    if (!isWebKit) return;

    let prevInnerHeight = window.innerHeight;

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    const onResize = () => {
      const current = window.innerHeight;
      // фильтруем мелкие изменения высоты (движение панелей)
      if (Math.abs(current - prevInnerHeight) > 130) {
        prevInnerHeight = current;
        setVh();
      }
    };

    const onOrientationChange = () => {
      // даём WebView стабилизироваться
      setTimeout(() => {
        prevInnerHeight = window.innerHeight;
        setVh();
      }, 300);
    };

    // первый замер — только на клиенте, уже внутри onMounted
    setVh();

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onOrientationChange);

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientationChange);
    });
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style src="@/shared/ui/theme/normalize.css"></style>
<style src="@/shared/ui/media.css"></style>
<style src="@/shared/ui/font.css"></style>
<style>
  html{
    scroll-behavior: smooth;
  }

  :root {
    --vh: 1vh; /* фоллбек */

    --strategix-dark: #202226;
    --strategix-light: #F1F1F1;
    --strategix-accent-light: #B0E3C6;
    --strategix-accent: #2AB464;
    --strategix-gray: #A7A7A7;
    
    
    --card-radius: min(24px, calc(1vw + var(--vh) * 1));
    --gap-grid: clamp(10px, 0.834vw, 20px);

    --section-width: 100%; /*Не 100vw, потому что важно учитваять вертикальный скролл, чтобы избежать горизонтального */
    --padding-section-x: 5vw;

    @media (--pc-width) {
      --padding-section-x: calc((var(--section-width) - 2560px) / 2);
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
      font-size: clamp(12px, 1.1675vw, 28px);
    }

    @media(--mobile-medium) {
      font-size: min(14px, calc(var(--vh) * 2.917));
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
