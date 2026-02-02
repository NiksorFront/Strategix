<script lang="ts" setup>
  defineProps<{
    title: string;
    result: string;
    unit_measurement?: string;
  }>();
</script>

<template>
  <li class="cell-with-result">
    <p class="title base-text">
      {{ title }}
    </p>
    <p class="result base-text">
      {{ result }}
      <span
        v-if="unit_measurement"
        class="unit-measurement"
      > {{ unit_measurement }}</span>
    </p>
  </li>
</template>

<style scoped>
.cell-with-result{
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 2.5), 20px);

  color: var(--strategix-accent);

  @media(--tablet-width){
    gap: clamp(16px, calc(var(--vh) * 2.5), 32px);
  }

  @media(--mobile-medium){
    gap: min(calc(var(--vh) * 2), 16px);
  }
}

.title{
  margin: 0;
  display: flex;
  align-items: center;
  gap: min(2.5vw, 14px);

  text-align: left;
  font-size: min(16px, 4.1vw);
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 0;

  @media(--tablet-width){
    font-size: clamp(16px, 1.6vw, 40px);
  }

  @media(--mobile-medium){
    font-size: min(16px, calc(var(--vh) * 3.25));
  }
}

.title::before{
  content: "";
  width: clamp(6px, 1vw, 12px);
  height: clamp(6px, 1vw, 12px);
  border-radius: 50%;
  background-color: var(--strategix-accent);
  flex-shrink: 0;
}

.title::after{
  content: "";
  flex: 1 1 auto;
  height: clamp(1px, 0.12vw, 2px);
  background-color: color-mix(in srgb, var(--strategix-accent) 55%, transparent);
}

.result{
  margin: 0;
  text-align: left;
  color: inherit;

  font-size: min(54px, 12vw);
  font-weight: 600;
  line-height: 90%;
  letter-spacing: -0.02em;

  @media(--tablet-width){
    font-size: clamp(72px, 8vw, 200px);
  }

  @media(--mobile-medium){
    font-size: min(58px, calc(var(--vh) * 13));
  }
}

.unit-measurement{
  display: block;
  margin-top: min(calc(var(--vh) * 1), 8px);

  font-size: min(15px, 3.8vw);
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 0;

  @media(--tablet-width){
    font-size: clamp(15px, 1.6vw, 40px);
  }

  @media(--mobile-medium){
    font-size: min(15px, calc(var(--vh) * 3));
  }
}
</style>
