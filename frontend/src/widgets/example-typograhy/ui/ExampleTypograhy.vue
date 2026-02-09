<script setup lang="ts">
import { computed } from 'vue';
import IndexSectionTitle from '@/shared/ui/index-section-title';

type TypographyFont = {
  title: string;
  description?: string;
};

type TypographyData = {
  title: string;
  fonts?: TypographyFont[];
  primary?: TypographyFont[];
  secondary?: TypographyFont[];
};

const {data} = defineProps<{
  data: TypographyData;
}>();

const fonts = computed(() => {
  if (data.fonts?.length) return data.fonts;
  return [
    ...(data.primary ?? []),
    ...(data.secondary ?? []),
  ];
});

const getSample = (fontTitle: string, index: number) => {
  const trimmed = fontTitle.trim();
  if (!trimmed) return '';
  const upper = trimmed.charAt(0).toUpperCase();
  return index === 0 ? upper : `${upper}${upper.toLowerCase()}`;
};

</script>

<template>
  <section class="example-typography">
    <IndexSectionTitle>
      {{ data.title }}
    </IndexSectionTitle>

    <div class="fonts-list">
      <article
        v-for="(font, index) in fonts"
        :key="`${font.title}-${index}`"
        class="font-row"
      >
        <div class="font-sample">
          <span
            class="sample-text"
          >
            Aa
          </span>
        </div>
        <div class="font-info">
          <div class="font-name-row">
            <span
              class="font-line"
              aria-hidden="true"
            />
            <span class="font-name upperscase-text">
              {{ font.title }}
            </span>
          </div>
          <p
            v-if="font.description"
            class="font-description base-text"
          >
            {{ font.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.example-typography{
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
    padding-block: min(calc(var(--vh) * 8), 46px);
    gap: min(calc(var(--vh) * 4), 40px);
  }
}

.fonts-list{
  display: flex;
  flex-direction: column;
  gap: 0;
}

.font-row{
  display: grid;
  grid-template-rows: 1fr 1fr;
  column-gap: clamp(20px, 6vw, 96px);
  gap: var(--vh);
  align-items: start;

  @media(--tablet-width){
    column-gap: clamp(24px, 6vw, 120px);
  }

  @media(--mobile-medium){
    grid-template-columns: 1fr;
    row-gap: min(calc(var(--vh) * 2.5), 24px);
  }
}

.font-sample{
  display: flex;
  align-items: flex-start;
}

.sample-text{
  display: block;
  margin: 0;
  color: var(--strategix-dark);
  font-size: clamp(80px, 10vw, 170px);
  line-height: 0.85;
  letter-spacing: -0.02em;
}


.font-info{
  display: flex;
  flex-direction: row;
  /* gap: clamp(10px, 10vw, 200px); */
}

.font-name-row{
  display: flex;
  align-items: center;
  gap: clamp(10px, 2vw, 24px);
}

.font-line{
  display: inline-block;
  width: clamp(32px, 10vw, 96px);
  height: 1px;
  background-color: var(--strategix-gray);
  opacity: 0.7;
}

.font-name{
  margin: 0;
  color: var(--strategix-dark);
  font-size: min(16px, 4.2vw);
  line-height: 120%;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  text-align: left;

  @media(--tablet-width){
    font-size: clamp(14px, 1.1vw, 22px);
  }

  @media(--mobile-medium){
    font-size: min(14px, calc(var(--vh) * 3.2));
  }
}

.font-description{
  width: 100%;
  max-width: clamp(240px, 50vw, 560px);

  margin: 0 clamp(10px, 10vw, 200px) 0 auto;
  color: var(--strategix-dark);
  font-weight: 500;
  font-size: min(14px, 3.8vw);
  line-height: 145%;
  text-align: left;
  text-transform: none;

  display: none;

  @media(--tablet-width){
    font-size: clamp(14px, 1vw, 20px);
    display: block;
  }

  @media(--mobile-medium){
    font-size: min(14px, calc(var(--vh) * 3.2));
    display: block;
  }
}
</style>
