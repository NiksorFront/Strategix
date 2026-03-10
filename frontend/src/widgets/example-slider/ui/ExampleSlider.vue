<script setup lang="ts">
import { computed } from 'vue';
import ExampleSectionTitle from '@/shared/ui/example-section-title';
import HorizontalSlider from '@/shared/ui/horizontal-slider';

type ExampleSliderSlide = {
  src: string;
  alt?: string;
  autoplay?: boolean;
};

type ExampleSliderData = {
  title?: string;
  slides?: ExampleSliderSlide[];
};

const { data } = defineProps<{
  data: ExampleSliderData;
}>();

const { app } = useRuntimeConfig();
const baseURL = app?.baseURL ?? '/';

const validSlides = computed(() => (data.slides ?? []).filter((slide) => Boolean(slide?.src?.trim())));
const hasTitle = computed(() => Boolean(data.title?.trim()));

const VIDEO_SRC_PATTERN = /\.(mp4|webm|ogg|mov)(?:$|[?#])/i;

const isVideoMedia = (src: string) => VIDEO_SRC_PATTERN.test(src.trim());

const normalizeBase = (base: string) => {
  if (!base || base === '/') return '';
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

const resolveMediaSrc = (src: string) => {
  const raw = src?.trim() ?? '';
  if (!raw) return '';

  if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('data:') || raw.startsWith('blob:')) {
    return raw;
  }

  const base = normalizeBase(baseURL);
  if (!base) {
    return raw.startsWith('/') ? raw : `/${raw}`;
  }

  if (raw === base || raw.startsWith(`${base}/`)) {
    return raw;
  }

  return raw.startsWith('/') ? `${base}${raw}` : `${base}/${raw}`;
};

const shouldAutoplay = (slide: ExampleSliderSlide) => slide.autoplay ?? true;
</script>

<template>
  <section
    v-if="validSlides.length"
    class="example-slider"
  >
    <ExampleSectionTitle
      v-if="hasTitle"
      class="example-slider__title"
    >
      {{ data.title }}
    </ExampleSectionTitle>

    <HorizontalSlider class="example-slider__track">
      <li
        v-for="(slide, index) in validSlides"
        :key="`example-slider-slide-${slide.src}-${index}`"
        class="example-slider__slide"
      >
        <video
          v-if="isVideoMedia(slide.src)"
          class="example-slider__media"
          :src="resolveMediaSrc(slide.src)"
          muted
          :autoplay="shouldAutoplay(slide)"
          loop
          playsinline
          preload="metadata"
          :aria-label="slide.alt ?? data.title ?? `Slide ${index + 1}`"
        />
        <NuxtImg
          v-else
          class="example-slider__media"
          :src="slide.src"
          :alt="slide.alt ?? data.title ?? `Slide ${index + 1}`"
          format="webp"
          :quality="80"
          width="800"
          height="1200"
          sizes="xs:50vw sm:50vw md:50vw lg:33vw xl:33vw xxl:33vw"
          loading="lazy"
          decoding="async"
        />
      </li>
    </HorizontalSlider>
  </section>
</template>

<style scoped>
.example-slider{
  --slider-gap: min(2vw, 14px);

  width: var(--section-width);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 3), 24px);

  background-color: var(--strategix-light);

  @media(--tablet-width){
    --slider-gap: min(1vw, 20px);
  }
}

.example-slider__track{
  --slider-item-snap-align: start;
  --slider-spacer-size: calc(var(--padding-section-x) - var(--slider-gap));
}

.example-slider__slide{
  margin: 0;
  width: calc(((100% - (2 * var(--padding-section-x))) - var(--slider-gap)) / 2);
  min-width: calc(((100% - (2 * var(--padding-section-x))) - var(--slider-gap)) / 2);
  aspect-ratio: 2 / 3;
  max-height: calc(var(--vh) * 90);
  border-radius: var(--card-radius);
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
}

@media(--tablet-width){
  .example-slider__slide{
    width: calc(((100% - (2 * var(--padding-section-x))) - (2 * var(--slider-gap))) / 3);
    min-width: calc(((100% - (2 * var(--padding-section-x))) - (2 * var(--slider-gap))) / 3);
  }
}

.example-slider__media{
  width: 100%;
  height: 100%;
  max-height: calc(var(--vh) * 90);
  display: block;
  object-fit: cover;
}

@media (hover: none), (pointer: coarse){
  .example-slider__track{
    --slider-hover-zone-display: none;
  }
}
</style>
