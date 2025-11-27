
<script setup lang="ts">
import type { ServiceItem } from "../model/config";

const {service} = defineProps<{service: ServiceItem;}>();
</script>

<template>
  <article
    class="service-card"
    :class="service.gridArea"
  >
    <component
      :is="service.Decor"
      class="base-text service-card__decor"
    />

    <h3 class="base-text service-card__title">
      {{ service.title }}
    </h3>

    <p class="base-text service-card__description">
      {{ service.description }}
    </p>
  </article>
</template>

<style scoped>
.service-card {
  width: auto;
  height: auto;
  /* aspect-ratio: 1 / 1; */
  border-radius: max(2vw, 19px);
  background: white;
  padding: max(1.666vw, 20px);
  /* box-shadow: 0 8px 32px rgba(15, 23, 42, 0.06); */
  display: flex;
  flex-direction: column;
  gap: 16px;

  overflow: hidden;
}

.service-card__decor {
  height: 24px;
  display: flex;
  align-items: center;
}

.service-card__title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.service-card__description {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
}

.reputation{
    grid-area: reputation;
}

.media{
    grid-area: media;
}

.branding{
    grid-area: branding;
}

.production{
    grid-area: production;
}

.events{
    grid-area: events;
}

.ai-marketing{
    grid-area: ai-marketing;
}

.ads{
    grid-area: ads;
}

.questions{
    grid-area: questions;
}
</style>
