<script setup lang="ts">
  import TextContent from './TextContent.vue';
  import Histogram from './Histogram.vue';

  const telegram = 'https://t.me/strategix'   // ← замени на свой настоящий ник/ссылку
  const whatsapp = 'https://wa.me/595955084893' // ← номер без +, пробелов и скобок
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
    --welcome-padding-top: 5vh;
    --welcome-padding-bottom: 15vh;
  }
</style>

<style scoped>
.welcome {
    width: 100vw;
    height: 90vh;
    padding-inline: var(--padding-section-x);
    box-sizing: border-box;

    background-color: var(--strategix-dark);

    display: flex;
    flex-direction: row;
}
</style>