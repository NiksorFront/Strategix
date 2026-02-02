<script setup lang="ts">
  import ExampleSectionTitle from '@/shared/ui/example-section-title';
  import ExampleList from '@/shared/ui/example-list';
  import type { ExampleWhatDidData } from '../model/types';

  defineProps<{
    data: ExampleWhatDidData;
  }>();
</script>

<template>
  <section class="example-goals-company">
    <ExampleSectionTitle :is-white="true">
      Что сделали
    </ExampleSectionTitle>
    <p class="base-text description">
      {{ data.description }}
    </p>

    <ExampleList
      :list="data.list"
      :is-white="true"
    />
  </section>
</template>

<style scoped>
.example-goals-company{
  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 4.5), 48px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;
  background-color: var(--strategix-accent);

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
  color: var(--strategix-light);

  font-size: min(18px, 4.615vw);
  font-weight: 600;
  line-height: 137.5%;
  letter-spacing: 0;
  text-transform: uppercase;
  text-align: left;

  @media(--tablet-width){
    font-size: clamp(18px, 3vw, 72px);
    line-height: 110%;
  }

  @media(--mobile-medium){
    font-size: min(24px, calc(var(--vh) * 5.25));
    line-height: 120%;
  }
}

</style>
