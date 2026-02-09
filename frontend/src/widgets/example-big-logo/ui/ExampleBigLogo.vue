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
      />
    </div>
  </section>
</template>

<style scoped>
.example-big-logo{
  width: var(--section-width);
  max-width: var(--section-width);
  overflow: hidden;
  height: calc(var(--vh) * 20);
  max-height: max(calc(var(--vh) * 40), 800px);

  margin: 0;
  /* padding-block: min(calc(var(--vh) * 6), 72px); */
  padding-inline: 0;

  background-color: var(--strategix-light);

  @media(--tablet-width){
    height: calc(var(--vh) * 40);
    /* padding-block: min(calc(var(--vh) * 7), 80px); */
  }

  @media(--mobile-medium){
    height: calc(var(--vh) * 70);
    /* padding-block: min(calc(var(--vh) * 5), 56px); */
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
    height: 80%;
    margin: auto;
    display: block;
    object-fit: cover;
  }
}
</style>
