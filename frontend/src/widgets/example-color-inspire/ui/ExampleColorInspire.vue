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
    <img
      :src="data.src"
      :alt="data.alt"
    >
  </section>
</template>

<style scoped>
.example-big-image{
  
}

</style>
