<script setup lang="ts">
import IndexSectionTitle from '@/shared/ui/index-section-title';

type ColorItem = {
  title: string;
  value: string;
};

type ColorPaletteData = {
  title: string;
  colors: ColorItem[];
};

defineProps<{
  data: ColorPaletteData;
}>();
</script>

<template>
  <section class="example-color-palette">
    <IndexSectionTitle>
      {{ data.title }}
    </IndexSectionTitle>

    <ul class="colors-list">
      <li
        v-for="(color, index) in data.colors"
        :key="`${color.title}-${index}`"
        class="color-card"
      >
        <div
          class="color-swatch"
          :style="{ backgroundColor: color.value }"
          aria-hidden="true"
        />
        <p
          class="upperscase-text color-title"
          :style="{ color: color.value }"
        >
          {{ color.title }}
        </p>
        <p
          class="upperscase-text color-value"
          :style="{ color: color.value }"
        >
          {{ color.value }}
        </p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.example-color-palette{
  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 6), 72px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 4.5), 56px);

  background-color: var(--strategix-light);

  @media(--tablet-width){
    padding-block: min(calc(var(--vh) * 7), 80px);
    gap: min(calc(var(--vh) * 5), 64px);
  }

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 8), 56px);
    gap: min(calc(var(--vh) * 4), 40px);
  }
}

.colors-list{
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: repeat(3, 25%);
  column-gap: 12.5%;
  /* column-gap: clamp(20px, 8vw, 96px); */
  row-gap: clamp(24px, calc(var(--vh) * 4), 56px);
  align-items: start;

  @media(--tablet-width){
    grid-template-columns: repeat(auto-fill, clamp(72px, 10vw, 140px));
    column-gap: clamp(20px, 8vw, 96px);
  }

  @media(--mobile-medium){
    grid-template-columns: 1fr;
  }
}

.color-card{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(12px, 2.5vw, 20px);
  /* text-align: left; */
}

.color-swatch{
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

.color-title{
  margin: 0;
  font-size: min(14px, 3.8vw);
  line-height: 120%;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  @media(--tablet-width){
    font-size: clamp(12px, 0.9vw, 18px);
  }

  @media(--mobile-medium){
    font-size: min(14px, calc(var(--vh) * 3.2));
  }
}

.color-value{
  margin: 0;
  margin-top: calc(var(--vh)*2);
  font-size: min(14px, 3.6vw);
  font-weight: 600;
  line-height: 120%;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  @media(--tablet-width){
    font-size: clamp(12px, 0.9vw, 18px);
  }

  @media(--mobile-medium){
    font-size: min(14px, calc(var(--vh) * 3.2));
  }
}
</style>
