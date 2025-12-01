
<script setup lang="ts">
import type { ServiceItem } from "../model/config";

const {service} = defineProps<{service: ServiceItem;}>();
</script>

<template>
  <article
    class="service-card"
    :class="service.gridArea"
  >
    <div class="base-text service-card__decor">
      <component
        :is="service.Decor"
      />
    </div>

    <h3 class="base-text service-card__title">
      {{ service.title }}
    </h3>

    <p class="small-text service-card__description">
      {{ service.description }}
    </p>
  </article>
</template>

<style scoped>
.service-card {
  width: auto;
  height: auto;
  border-radius: max(2vw, 19px);
  background: white;
  padding: max(1.666vw, 20px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.service-card__decor {
  width: calc(1.5vw + 1.5vh);
  height: auto;
  aspect-ratio: 1 / 1;
  margin: 0;
}

.service-card__title {
  margin: 0;
  text-align: left;

  text-transform: uppercase;
  font-size: clamp(16px, 1.5vw, 36px);

  @media(--mobile-medium){
    font-size: min(16px, 3.35vh);
  }
}

.service-card__description {
  margin: 0;
  font-weight: 400;   
  color: var(--strategix-gray);
  text-align: left;

  font-size: clamp(12px, 1vw, 32px);

  @media(--mobile-medium) {
      font-size: min(12px, 3vh);
  }
}

@media(--tablet-width){

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
}
</style>
