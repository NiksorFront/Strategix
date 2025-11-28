<script setup lang="ts">
  const {isWhite} = defineProps<{'isWhite'?: boolean}>()
</script>

<template>
  <h2
    id="about-title"
    class="base-text h2-text"
    :class="isWhite && 'color-white'"
  >
    <slot />
  </h2>
</template>

<style scoped>
  .color-white{
    color: white;
  }
</style>