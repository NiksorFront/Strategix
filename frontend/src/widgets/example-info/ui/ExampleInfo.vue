<script setup lang="ts">

const {data} = defineProps<{
  data: {
    title: string;
    description: string[];
  };
}>();
</script>

<template>
  <section class="example-info">
    <h2 class="upperscase-text info-title">
      {{ data.title }}
    </h2>
    <div class="info-text">
      <p
        v-for="(paragraph, index) in data.description"
        :key="`paragraph-${index}`"
        class="base-text info-paragraph"
      >
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.example-info{
  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 6), 72px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  row-gap: min(calc(var(--vh) * 3.5), 32px);
  align-items: start;

  background-color: var(--strategix-light);

  @media(--tablet-width){
    padding-block: min(calc(var(--vh) * 7), 80px);
    grid-template-columns: minmax(0, 5fr) minmax(0, 4fr);
    column-gap: clamp(24px, 3vw, 120px);
    row-gap: 0;
  }

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 8), 56px);
    row-gap: min(calc(var(--vh) * 3), 24px);
  }
}

.info-title{
  margin: 0;
  color: var(--strategix-dark);
  text-align: left;
  font-size: min(28px, 7.2vw);
  line-height: 110%;
  letter-spacing: 0;

  @media(--tablet-width){
    font-size: clamp(28px, 2.6vw, 56px);
    max-width: 90%;
  }

  @media(--mobile-medium){
    font-size: min(26px, calc(var(--vh) * 6));
  }
}

.info-text{
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 3vw, 28px);
  width: 100%;

  @media(--tablet-width){
    max-width: clamp(280px, 40vw, 560px);
  }
}

.info-paragraph{
  margin: 0;
  color: var(--strategix-dark);
  font-weight: 500;
  text-align: left;
  text-transform: none;
  letter-spacing: 0;
  line-height: 150%;
  font-size: min(16px, 4.2vw);

  @media(--tablet-width){
    font-size: clamp(16px, 1.1vw, 22px);
  }

  @media(--mobile-medium){
    font-size: min(14px, calc(var(--vh) * 3.2));
  }
}

</style>
