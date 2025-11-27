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
}

.services-grid{
  width: 100%;
  height: calc(100% - 10vh);

  gap: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas: 
    "reputation media"
    "branding production"
    "events ai-marketing"
    "ads questions"
  ;

  @media(--tablet-width){
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(9, 1fr);
    grid-template-areas: 
        "reputation reputation reputation reputation reputation ai-marketing ai-marketing ai-marketing"
        "reputation reputation reputation reputation reputation ai-marketing ai-marketing ai-marketing"
        "reputation reputation reputation reputation reputation ai-marketing ai-marketing ai-marketing"
        "media media branding branding branding ai-marketing ai-marketing ai-marketing"
        "media media branding branding branding ai-marketing ai-marketing ai-marketing"
        "media media production production events ads ads ads"
        "media media production production events ads ads ads"
        "media media production production events ads ads ads"
        "media media production production events ads ads ads"
    ;

    .questions{
      display: none;
    }
  }

}
</style>
