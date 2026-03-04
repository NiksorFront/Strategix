<script setup lang="ts">
import VideoPlayer from '@/shared/ui/video-player';

const {data} = defineProps<{
  data: {
    src: string;
    srcMobile?: string;
    alt?: string;
    autoplay?: boolean;
  };
}>();
</script>

<template>
  <section
    class="example-big-video"
  >
    <VideoPlayer
      class="example-big-video__player example-big-video__player--mobile"
      :src="data.srcMobile || data.src"
      :autoplay="data.autoplay"
    />
    <VideoPlayer
      class="example-big-video__player example-big-video__player--desktop"
      :src="data.src"
      :autoplay="data.autoplay"
    />
  </section>
</template>

<style scoped>
.example-big-video{
  width: var(--section-width);
  height: auto;
  max-height: min(calc(var(--vh) * 100), 1600px);
  box-sizing: border-box;

  margin: 0;
  /* padding-block: min(calc(var(--vh) * 6), 72px); */
  padding-inline: 0;

  background-color: var(--strategix-light);
}

.example-big-video__player{
  width: 100%;
  height: auto;
  max-height: inherit;
}

.example-big-video__player--desktop{
  display: none;
}

@media(--tablet-width){
  .example-big-video__player--mobile{
    display: none;
  }

  .example-big-video__player--desktop{
    display: block;
  }
}

.example-big-video :deep(.video-player__video){
  width: 100%;
  height: auto;
  min-height: 0;
  max-height: inherit;
  aspect-ratio: auto;
  object-fit: cover;
}

@media(--pc-width){
  .example-big-video{
    padding-inline: var(--padding-section-x);
  }
}

@media(--mobile-medium){
  .example-big-video{
    padding-inline: 0;
  }
}
</style>
