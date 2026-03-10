<script setup lang="ts">

const {data} = defineProps<{
  data: {
    src: string;
    alt: string;
    backgroundColor?: string;
  };
}>();
</script>

<template>
  <section
    class="example-big-logo"
  >
    <div
      class="wrapper-logo"
      :style="data.backgroundColor ? { backgroundColor: data.backgroundColor } : {}"
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
    </div>
  </section>
</template>

<style scoped>
.example-big-logo{
  width: var(--section-width);
  max-width: var(--section-width);
  overflow: hidden;
  height: calc(var(--vh) * 17.5);
  max-height: max(calc(var(--vh) * 35), 700px);
  box-sizing: border-box;

  margin: 0;
  padding-inline: 0;

  background-color: var(--strategix-light);

  @media(--pc-width){
    padding-inline: var(--padding-section-x);
  }

  @media(--tablet-width){
    height: calc(var(--vh) * 35);
  }

  @media(--mobile-medium){
    height: calc(var(--vh) * 70);
    padding-inline: 0;
  }
}

.wrapper-logo{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    width: auto;
    height: 90%;
    margin: auto;
    display: block;
    object-fit: cover;
  }
}
</style>
