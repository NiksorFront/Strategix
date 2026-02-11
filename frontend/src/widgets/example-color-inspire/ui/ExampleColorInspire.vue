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
      format="webp"
      :quality="80"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
      loading="lazy"
      decoding="async"
    />
  </section>
</template>

<style scoped>
.example-big-image{
  
}

</style>
