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
  width: var(--section-width);
  height: auto;
  /* calc(var(--vh) * 30) */
  max-height: min(calc(var(--vh) * 100), 1600px);

  margin: 0;
  /* padding-block: min(calc(var(--vh) * 6), 72px); */
  padding-inline: 0;

  background-color: var(--strategix-light);

  img{
    width: 100%;
    height: auto;
    max-height: inherit;
    object-fit: cover;
  }

  @media(--tablet-width){
    /* height: calc(var(--vh) * 40); */
    /* padding-block: min(calc(var(--vh) * 7), 80px); */
  }

  @media(--mobile-medium){
    /* height: calc(var(--vh) * 70); */
    /* padding-block: min(calc(var(--vh) * 5), 56px); */
  }
}

</style>
