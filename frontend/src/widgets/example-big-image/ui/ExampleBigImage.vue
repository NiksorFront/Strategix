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
      format="webp"
      :quality="80"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
      loading="lazy"
      decoding="async"
    />
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
  width: var(--section-width);
  height: auto;
  max-height: min(calc(var(--vh) * 100), 1600px);
  box-sizing: border-box;

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

  @media(--pc-width){
    padding-inline: var(--padding-section-x);
  }

  @media(--mobile-medium){
    padding-inline: 0;
  }
}

</style>
