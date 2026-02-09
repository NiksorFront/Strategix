<script setup lang="ts">
const {data} = defineProps<{
  data: {
    src: string;
    alt: string;
  };
}>();
</script>

<template>
  <section
    class="example-big-image"
  >
    <NuxtImg
      :src="data.src"
      :alt="data.alt"
      quality="100"
      loading="lazy"
      decoding="async"
    />
  </section>
</template>

<style scoped>
.example-big-image{
  
}

</style>
