<script setup lang="ts">
import ExampleSectionTitle from '@/shared/ui/example-section-title';

type ExampleStrategiesItem = {
  title: string;
  bullets: string[];
  src?: string;
  location?: string;
  background?: string;
  border?: boolean;
};

type ExampleStrategiesData = {
  title?: string;
  subtitle?: string;
  lists: ExampleStrategiesItem[];
};

const { data } = defineProps<{
  data: ExampleStrategiesData;
}>();

const hasImage = (src?: string) => Boolean(src?.trim());

const resolveLocation = (location?: string) => {
  return location?.trim().toLowerCase() === 'left' ? 'left' : 'right';
};

const getBackgroundColor = (background?: string) => {
  const normalized = background?.trim();
  return normalized || 'var(--strategix-light)';
};

const isAccentBackground = (background?: string) => {
  const normalized = background?.trim().toLowerCase() ?? '';

  return (
    normalized === '#2ab464' ||
    normalized === 'var(--strategix-accent)' ||
    normalized === 'rgb(42, 180, 100)' ||
    normalized === 'rgb(42,180,100)'
  );
};

const getRowClass = (item: ExampleStrategiesItem) => {
  if (!hasImage(item.src)) {
    return 'strategy-row--no-image';
  }

  return `strategy-row--image-${resolveLocation(item.location)}`;
};
</script>

<template>
  <section class="example-strategies">
    <div
      v-if="data.title?.trim() || data.subtitle?.trim()"
      class="strategies-intro"
    >
      <ExampleSectionTitle v-if="data.title?.trim()">
        {{ data.title }}
      </ExampleSectionTitle>

      <p
        v-if="data.subtitle?.trim()"
        class="strategies-subtitle"
      >
        {{ data.subtitle }}
      </p>
    </div>

    <ul class="strategies-list">
      <li
        v-for="(item, index) in data.lists"
        :key="`${item.title}-${index}`"
        class="strategy-row"
        :class="getRowClass(item)"
      >
        <article
          class="strategy-card strategy-text-card"
          :class="{ 'strategy-text-card--accent': isAccentBackground(item.background) }"
          :style="{
            backgroundColor: getBackgroundColor(item.background),
            border: item.border ? '1px solid var(--strategix-dark)' : 'none',
          }"
        >
          <h3 class="strategy-title">
            {{ item.title }}
          </h3>

          <ul class="strategy-bullets">
            <li
              v-for="(bullet, bulletIndex) in item.bullets"
              :key="`${item.title}-${bulletIndex}`"
              class="strategy-bullet"
            >
              <span
                class="strategy-bullet-dot"
                aria-hidden="true"
              />
              <p class="strategy-bullet-text">
                {{ bullet }}
              </p>
            </li>
          </ul>
        </article>

        <article
          v-if="hasImage(item.src)"
          class="strategy-card strategy-media"
        >
          <NuxtImg
            class="strategy-image"
            :src="item.src"
            :alt="item.title"
            format="webp"
            :quality="80"
            width="1280"
            height="960"
            sizes="xs:100vw sm:100vw md:100vw lg:44vw xl:44vw xxl:44vw"
            loading="lazy"
            decoding="async"
          />
        </article>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.example-strategies{
  --strategies-gap: min(2.8vw, 14px);

  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 6), 72px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 4), 48px);

  background-color: var(--strategix-light);

  @media(--tablet-width){
    --strategies-gap: min(1vw, 20px);

    padding-block: min(calc(var(--vh) * 7), 80px);
    gap: min(calc(var(--vh) * 5), 64px);
  }

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 8), 56px);
    gap: min(calc(var(--vh) * 3), 24px);
  }
}

.strategies-intro{
  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 3), 24px);
}

.strategies-subtitle{
  margin: 0;
  color: var(--strategix-dark);
  font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: min(16px, 4.6vw);
  font-weight: 500;
  line-height: 122%;
  letter-spacing: 0;
  text-align: left;

  @media(--tablet-width){
    margin-left: calc(((100% - var(--strategies-gap)) / 2) - (((100% - var(--strategies-gap)) / 2) / 2));
    max-width: clamp(420px, 62vw, 980px);
    font-size: clamp(18px, 1.95vw, 34px);
    font-weight: 600;
    line-height: 115%;
    text-transform: uppercase;
  }

  @media(--mobile-medium){
    font-size: min(16px, calc(var(--vh) * 3.6));
    line-height: 125%;
    text-transform: none;
  }
}

.strategies-list{
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: var(--strategies-gap);
}

.strategy-row{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--strategies-gap);

  @media(--tablet-width){
    display: grid;
    align-items: stretch;
  }
}

.strategy-row--no-image{
  @media(--tablet-width){
    grid-template-columns: minmax(0, 1fr);
  }
}

.strategy-row--image-right{
  @media(--tablet-width){
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  }
}

.strategy-row--image-left{
  @media(--tablet-width){
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  }
}

.strategy-row--image-left .strategy-media{
  order: 1;

  @media(--tablet-width){
    display: block;
    height: 100%;
    min-height: 0;
    aspect-ratio: auto;
  }
}

.strategy-row--image-left .strategy-text-card{
  order: 2;
}

.strategy-row--image-right .strategy-media{
  display: none;

  @media(--tablet-width){
    display: block;
    height: 100%;
    min-height: 0;
    aspect-ratio: auto;
    order: 2;
  }
}

.strategy-row--image-right .strategy-text-card{
  @media(--tablet-width){
    order: 1;
  }
}

.strategy-card{
  width: 100%;
  border-radius: var(--card-radius);
  overflow: hidden;
  box-sizing: border-box;
}

.strategy-text-card{
  padding: clamp(18px, 4.4vw, 30px);

  display: flex;
  flex-direction: column;
  gap: clamp(18px, 4.6vw, 30px);

  @media(--tablet-width){
    padding: clamp(20px, 1.6vw, 34px);
    gap: clamp(16px, 1.8vw, 28px);
  }
}

.strategy-title{
  margin: 0;
  color: var(--strategix-dark);
  font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: min(48px, 9.4vw);
  font-weight: 700;
  line-height: 102%;
  letter-spacing: -0.01em;
  text-align: left;
  text-transform: uppercase;

  @media(--tablet-width){
    font-size: clamp(36px, 2vw, 40px);
    line-height: 108%;
  }

  @media(--mobile-medium){
    font-size: min(48px, calc(var(--vh) * 10));
  }
}

.strategy-bullets{
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: clamp(16px, 4vw, 24px);

  @media(--tablet-width){
    gap: clamp(16px, 1.5vw, 24px);
  }
}

.strategy-bullet{
  margin: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  column-gap: clamp(10px, 2.8vw, 16px);
}

.strategy-bullet-dot{
  width: clamp(7px, 2vw, 10px);
  height: clamp(7px, 2vw, 10px);
  border-radius: 50%;
  margin-top: clamp(5px, 1.5vw, 8px);
  background-color: var(--strategix-accent);
}

.strategy-bullet-text{
  margin: 0;
  color: var(--strategix-dark);
  font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: min(14px, 4.4vw);
  font-weight: 500;
  line-height: 125%;
  letter-spacing: 0;
  text-align: left;
  text-transform: none;

  @media(--tablet-width){
    font-size: clamp(16px, 1.08vw, 20px);
    line-height: 132%;
  }

  @media(--mobile-medium){
    font-size: min(14px, calc(var(--vh) * 3));
  }
}

.strategy-text-card--accent .strategy-title,
.strategy-text-card--accent .strategy-bullet-text{
  color: var(--strategix-light);
}

.strategy-text-card--accent .strategy-bullet-dot{
  background-color: var(--strategix-light);
}

.strategy-media{
  position: relative;
  aspect-ratio: 16 / 10;
}

.strategy-image{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top;
}
</style>
