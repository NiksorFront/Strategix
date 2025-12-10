<script setup lang="ts">
  import TextContent from './TextContent.vue';
  import Histogram from './Histogram.vue';
  import index from '@/content/pages/index.json'

  const { locale } = useI18n()
  const currentLocale = locale.value || 'ru'
  const translations = index.translations[currentLocale as keyof typeof index.translations] || index.translations.ru

  const telegram = translations.welcome.button2.href
  const whatsapp = translations.welcome.button3.href
</script>

<template>
  <section
    id="welcome"
    class="welcome"
  >
    <TextContent
      :telegram="telegram"
      :whatsapp="whatsapp"
    />
    <Histogram />
  </section>
</template>

<style>
  :root{
    --welcome-padding-top: calc(var(--vh) * 5);
    --welcome-padding-bottom: calc(var(--vh) * 15);
  }
</style>

<style scoped>
.welcome {
    width: 100vw;
    height: calc(calc(var(--vh) * 90) + 1px);
    padding-inline: var(--padding-section-x);
    box-sizing: border-box;

    background-color: var(--strategix-dark);

    display: flex;
    flex-direction: row;

    transform: translateY(-1px); /* мини косытль, т.к. иногда может просвечиватся белая полоса между Header и Welcome */

    @media (max-aspect-ratio: 4/5){
      --welcome-padding-top: calc(var(--vh) * 10);
      --welcome-padding-bottom: calc(var(--vh) * 25);
    }
}
</style>