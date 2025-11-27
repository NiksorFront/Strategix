<script setup lang="ts">
  import IndexSectionTitle from '@/shared/ui/index-section-title';
</script>

<template>
  <section class="our-projects">
    <IndexSectionTitle>Наши проекты</IndexSectionTitle>
  </section>
</template>

<style scped>
.our-projects {
    width: calc(100vw - 2 * var(--padding-section-x));
    height: 100vh;
    /* padding: 0 0 10vh 0;; */

    padding-inline: var(--padding-section-x);
    background-color: var(--background-dark);
}
</style>
