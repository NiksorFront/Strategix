<script setup lang="ts">
    import ExampleWelcome from '@/widgets/example-welcome';

</script>

<template>
  <ExampleWelcome />
  <section class="vremenno">
    Чуть позже здесь будет вёрста для подставления данных из JSON
  </section>
</template>

<style scoped>
.vremenno{
  width: var(--section-width);
  height: 300vh;
}
</style>