<script setup lang="ts">
  import IndexSectionTitle from '@/shared/ui/index-section-title/';
  import ServiceCard from './ServiceCard.vue';
  import {services} from "../model/config"
</script>

<template>
  <section class="services">
    <IndexSectionTitle>Услуги</IndexSectionTitle>

    <div class="services-grid">
      <ServiceCard 
        v-for="service in services" 
        :key="service.id"
        :service="service"
      />
    </div>
  </section>
</template>

<style scped>
.services {
    width: var(--section-width);
    height: 90vh;
    padding: 0 0 10vh 0;;

    padding-inline: var(--padding-section-x);
    background-color: var(--background-light);

    overflow: hidden;
}

.services-grid{
  width: 100%;
  height: calc(100% - 10vh);

  --gap-grid: clamp(10px, 0.834vw, 20px);
  gap: var(--gap-grid);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-template-rows: repeat(auto-fit, 1fr);
  /* grid-template-areas: 
    "reputation media"
    "branding production"
    "events ai-marketing"
    "ads questions"
  ; */

  @media(--tablet-width){
    grid-template-columns: calc(25% - var(--gap-grid)) calc(25% - var(--gap-grid)) calc(17% - var(--gap-grid)) 33%;
    grid-template-rows: calc(29% - var(--gap-grid)) calc(29% - var(--gap-grid)) 42%;
    grid-template-areas: 
        "reputation reputation reputation ai-marketing"
        "media branding branding ai-marketing"
        "media production events ads"
    ;

    .questions{
      display: none;
    }
  }

  @media(--mobile-medium){
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(180px, 1fr));
    grid-template-areas: 
      "reputation media branding production"
      "events ai-marketing ads questions"
    ;
  }
}
</style>
