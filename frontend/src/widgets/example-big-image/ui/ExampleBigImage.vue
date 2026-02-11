<script setup lang="ts">
const {data} = defineProps<{
  data: {
    src: string;
    srcMobile?: string;
    alt: string;
  };
}>();
</script>

<template>
  <section
    class="example-big-image"
  >
    <NuxtImg
      :src="data.srcMobile || data.src"
      :alt="data.alt"
      quality="100"
      loading="lazy"
      decoding="async"
    />
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

    &:first-child{ /* мобилка */
       display: block;
    }
    
    &:last-child{ /* пк */
       display: none;
    }

    @media(--tablet-width){
      &:first-child{ /* мобилка */
        display: none;
      }
      
      &:last-child{ /* пк */
        display: block;
      }
    }
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
