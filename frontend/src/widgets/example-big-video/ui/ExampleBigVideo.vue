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
      :src="data.srcMobile || data.src"
      :autoplay="data.autoplay"
    />
    <VideoPlayer
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

  :deep(.video-player){
    width: 100%;
    height: auto;
    max-height: inherit;

    &:first-child{ /* мобилка */
      display: block;
    }
    
    &:last-child{ /* пк */
      display: none;
    }

    @media(--tablet-width){
      &:first-child{ /* мобилка */
        display: none;
      }
      
      &:last-child{ /* пк */
        display: block;
      }
    }
  }

  :deep(.video-player__video){
    width: 100%;
    height: auto;
    min-height: 0;
    max-height: inherit;
    aspect-ratio: auto;
    object-fit: cover;
  }

  @media(--pc-width){
    padding-inline: var(--padding-section-x);
  }

  @media(--mobile-medium){
    padding-inline: 0;
  }
}
</style>
