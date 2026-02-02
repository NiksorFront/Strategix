<script setup lang="ts">
    import ExampleSectionTitle from '@/shared/ui/example-section-title';
    import CellWithResult from './CellWithResult.vue';
    import type { ExampleResultsData } from '../model/types';

    defineProps<{
      data: ExampleResultsData;
    }>();
</script>

<template>
  <section class="example-rusults">
    <ExampleSectionTitle>
      Результат
    </ExampleSectionTitle>
    <p class="description base-text">
      {{ data.description }}
    </p>
    <ul class="cells-list">
      <CellWithResult
        v-for="(item, index) in data.items"
        :key="`${item.title}-${index}`"
        :title="item.title"
        :result="item.result"
        :unit_measurement="item.unit_measurement"
      />
    </ul>
  </section>
</template>

<style scoped>
.example-rusults{
  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 4.5), 48px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 3.5), 48px);

  @media(--tablet-width){
    padding-block: min(calc(var(--vh) * 10), 80px);
    gap: min(calc(var(--vh) * 7), 70px);
  }

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 10.5), 42px);
    gap: min(calc(var(--vh) * 8), 30px);
  }
}

.description{
  margin: 0;
  display: flex;
  align-items: center;
  align-items: baseline;
  gap: min(4vw, 18px);

  font-size: min(18px, 4.615vw);
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0;
  text-align: left;

  @media(--tablet-width){
    font-size: clamp(18px, 2.5vw, 60px);
    gap: clamp(18px, 3.5vw, 84px);
    line-height: 150%;
  }

  @media(--mobile-medium){
    font-size: min(18px, calc(var(--vh) * 7));
    gap: min(4vw, 18px);
  }
}

.cells-list{
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(24px, 8vw, 180px);
  row-gap: min(calc(var(--vh) * 6), 64px);
  align-items: start;

  @media(--tablet-width){
    column-gap: clamp(40px, 9vw, 220px);
    row-gap: clamp(40px, calc(var(--vh) * 6), 120px);
  }

  @media(--mobile-medium){
    column-gap: min(10vw, 36px);
    row-gap: min(calc(var(--vh) * 5), 40px);
  }
}

</style>
