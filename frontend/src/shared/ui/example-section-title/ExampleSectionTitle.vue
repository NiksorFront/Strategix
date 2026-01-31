<script setup lang="ts">
  const {isWhite} = defineProps<{'isWhite'?: boolean}>()
</script>

<template>
  <h2
    class="upperscase-text h2-text"
    :class="isWhite && 'color-white'"
  >
    <slot />
  </h2>
</template>

<style scoped>
  .h2-text {
    margin: 0;
    color: var(--strategix-accent);

    font-size: min(32px, 8.2vw);
    font-weight: 600;
    line-height: 110%;
    letter-spacing: 0;
    text-align: left;

    @media(--tablet-width){
      font-size: clamp(24px, 4.1675vw, 100px);
    }

    @media(--mobile-medium){
      font-size: min(36px, calc(var(--vh) * 7.25));
    }
  }

  .color-white{
    color: white;
  }
</style>