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
    width: 100vw;
    height: max(100vh, fit-content);
    padding: 0 var(--padding-section-x) 10vh;
    box-sizing: border-box;

    background-color: var(--strategix-light);

    overflow: hidden;
}

.services-grid{
  width: 100%;
  height: calc(100% - 10vh);

  gap: var(--gap-grid);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  /* grid-template-rows: repeat(2, 170px); */
  grid-auto-columns: 170px;
  grid-auto-rows: 170px;

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
    grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(40vh, 1fr));
    grid-auto-columns: 20vw;
    grid-auto-rows: 40vh;
    grid-template-areas: 
      "reputation media branding production"
      "events ai-marketing ads questions"
    ;
  }
}
</style>
