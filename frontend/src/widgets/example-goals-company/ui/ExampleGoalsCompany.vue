<script setup lang="ts">
    import ExampleSectionTitle from '@/shared/ui/example-section-title';
    import ExampleList from '@/shared/ui/example-list';

    type ExampleGoalsCompanyData = {
      list: string[];
    };

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
  padding-block: min(calc(var(--vh) * 6), 72px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;
  background-color: var(--strategix-light);

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 2.5), 28px);

  @media(--tablet-width){
    padding-block: min(calc(var(--vh) * 7), 80px);
    gap: min(calc(var(--vh) * 4), 36px);
  }

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 8), 56px);
    gap: min(calc(var(--vh) * 4), 24px);
  }
}
</style>
