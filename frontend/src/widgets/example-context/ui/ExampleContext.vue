<script setup lang="ts">
import { computed } from 'vue';
import ExampleSectionTitle from '@/shared/ui/example-section-title';

type ExampleContextBulletBlock = {
  bullets: string[];
};

type ExampleContextDescriptionItem = string | ExampleContextBulletBlock;

type ExampleContextContentItem = {
  src: string;
  alt?: string;
  autoplay?: boolean;
};

type ExampleContextData = {
  title?: string;
  description: ExampleContextDescriptionItem[];
  content?: ExampleContextContentItem[];
};

const { data } = defineProps<{
  data: ExampleContextData;
}>();

const { app } = useRuntimeConfig();
const baseURL = app?.baseURL ?? '/';

const contextContent = computed(() => data.content ?? []);
const validContent = computed(() => contextContent.value.filter((item) => Boolean(item.src?.trim())));

const desktopContent = computed(() => validContent.value.slice(0, 3));
const mobileContent = computed(() => {
  if (validContent.value.length >= 3) {
    return [validContent.value[2], validContent.value[1]];
  }

  if (validContent.value.length === 2) {
    return [validContent.value[1], validContent.value[0]];
  }

  return validContent.value.slice(0, 1);
});

const isBulletsBlock = (item: ExampleContextDescriptionItem): item is ExampleContextBulletBlock => {
  return typeof item === 'object' && item !== null && Array.isArray(item.bullets);
};

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
</script>

<template>
  <section class="example-context">
    <div class="context-intro">
      <ExampleSectionTitle>
        {{ data.title ?? '' }}
      </ExampleSectionTitle>

      <div class="context-content">
        <template
          v-for="(item, index) in data.description"
          :key="`context-item-${index}`"
        >
          <p
            v-if="typeof item === 'string'"
            class="small-text context-paragraph"
          >
            {{ item }}
          </p>

          <ul
            v-else-if="isBulletsBlock(item)"
            class="context-bullets"
          >
            <li
              v-for="(bullet, bulletIndex) in item.bullets"
              :key="`context-bullet-${index}-${bulletIndex}`"
              class="context-bullet"
            >
              <span
                class="context-bullet-dot"
                aria-hidden="true"
              />
              <p class="small-text context-bullet-text">
                {{ bullet }}
              </p>
            </li>
          </ul>
        </template>
      </div>
    </div>

    <div class="context-gallery context-gallery--mobile">
      <article
        v-for="(item, index) in mobileContent"
        :key="`context-mobile-${item.src}-${index}`"
        class="context-gallery-card"
      >
        <video
          v-if="isVideoMedia(item.src)"
          class="context-gallery-media"
          :src="resolveMediaSrc(item.src)"
          muted
          autoplay
          loop
          playsinline
          preload="metadata"
          :aria-label="item.alt ?? data.title ?? 'Context media'"
        />
        <NuxtImg
          v-else
          class="context-gallery-media"
          :src="item.src"
          :alt="item.alt ?? data.title ?? 'Context image'"
          format="webp"
          :quality="80"
          width="800"
          height="1200"
          sizes="xs:50vw sm:50vw md:50vw lg:50vw xl:50vw xxl:50vw"
          loading="lazy"
          decoding="async"
        />
      </article>
    </div>

    <div class="context-gallery context-gallery--desktop">
      <article
        v-for="(item, index) in desktopContent"
        :key="`context-desktop-${item.src}-${index}`"
        class="context-gallery-card"
      >
        <video
          v-if="isVideoMedia(item.src)"
          class="context-gallery-media"
          :src="resolveMediaSrc(item.src)"
          muted
          autoplay
          loop
          playsinline
          preload="metadata"
          :aria-label="item.alt ?? data.title ?? 'Context media'"
        />
        <NuxtImg
          v-else
          class="context-gallery-media"
          :src="item.src"
          :alt="item.alt ?? data.title ?? 'Context image'"
          format="webp"
          :quality="80"
          width="800"
          height="1200"
          sizes="xs:33vw sm:33vw md:33vw lg:33vw xl:33vw xxl:33vw"
          loading="lazy"
          decoding="async"
        />
      </article>
    </div>
  </section>
</template>

<style scoped>
.example-context{
  --context-section-gap: min(calc(var(--vh) * 5), 56px);
  --context-gallery-gap: min(2vw, 14px);

  width: var(--section-width);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: var(--context-section-gap);

  background-color: var(--strategix-light);
  font-synthesis: none;

  @media(--tablet-width){
    --context-section-gap: min(calc(var(--vh) * 8), 80px);
    --context-gallery-gap: min(1vw, 20px);
  }

  @media(--mobile-medium){
    --context-section-gap: min(calc(var(--vh) * 4), 28px);
  }
}

.context-intro{
  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 3), 24px);

  @media(--tablet-width){
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
    column-gap: clamp(28px, 3.6vw, 96px);
    align-items: start;
  }
}

.context-content{
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2vw, 24px);
}

.context-paragraph{
  margin: 0;
  color: var(--strategix-dark);
  text-align: left;
  text-transform: none;
  letter-spacing: 0;
  line-height: 130%;
  font-size: min(16px, 4.2vw);
  font-weight: 400;

  @media(--tablet-width){
    font-size: clamp(14px, 1.2vw, 28px);
  }

  @media(--mobile-medium){
    font-size: min(14px, calc(var(--vh) * 2.917));
  }
}

.context-bullets{
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.6vw, 20px);
}

.context-bullet{
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  column-gap: clamp(12px, 1.2vw, 18px);
}

.context-bullet-dot{
  margin-top: clamp(4px, 0.5vw, 8px);
  width: clamp(8px, 0.72vw, 12px);
  height: clamp(8px, 0.72vw, 12px);
  border-radius: 50%;
  background-color: var(--strategix-accent);
}

.context-bullet-text{
  margin: 0;
  color: var(--strategix-dark);
  text-align: left;
  text-transform: none;
  letter-spacing: 0;
  line-height: 130%;
  font-size: min(16px, 4.2vw);
  font-weight: 400;

  @media(--tablet-width){
    font-size: clamp(14px, 1.2vw, 28px);
  }

  @media(--mobile-medium){
    font-size: min(14px, calc(var(--vh) * 2.917));
  }
}

.context-gallery{
  list-style: none;
  margin: 0;
  padding: 0;
}

.context-gallery--mobile{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--context-gallery-gap);
}

.context-gallery--desktop{
  display: none;
}

@media(--tablet-width){
  .context-gallery--mobile{
    display: none;
  }

  .context-gallery--desktop{
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--context-gallery-gap);
  }
}

.context-gallery-card{
  margin: 0;
  width: 100%;
  aspect-ratio: 2 / 3;
  max-height: calc(var(--vh) * 90);
  border-radius: var(--card-radius);
  overflow: hidden;
  position: relative;
}

.context-gallery-media{
  width: 100%;
  height: 100%;
  max-height: calc(var(--vh) * 90);
  object-fit: cover;
  display: block;
}
</style>
