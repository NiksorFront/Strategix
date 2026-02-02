<script setup lang="ts">
    import ExampleSectionTitle from '@/shared/ui/example-section-title';
    import ExampleList from '@/shared/ui/example-list';
    import type { ExampleGoalsCompanyData } from '../model/types';

    defineProps<{
      data: ExampleGoalsCompanyData;
    }>();
</script>

<template>
  <section class="example-goals-company">
    <ExampleSectionTitle>
      Цели компании
    </ExampleSectionTitle>
    <ExampleList :list="data.list" />
  </section>
</template>

<style scoped>
.example-goals-company{
  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 8), 80px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;
  background-color: var(--strategix-light);

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 3), 20px);

  @media(--tablet-width){
    padding-block: min(calc(var(--vh) * 10), 80px);
    gap: min(calc(var(--vh) * 7), 55px);
  }

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 15), 60px);
    gap: min(calc(var(--vh) * 8), 30px);
  }
}
</style>
