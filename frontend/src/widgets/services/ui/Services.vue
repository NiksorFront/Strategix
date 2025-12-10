<script setup lang="ts">
  import IndexSectionTitle from '@/shared/ui/index-section-title/';
  import ServiceCard from './ServiceCard.vue';
  import ServiceCtaCard from './ServiceCtaCard.vue';
  import ModalWindow from './ModalWindow.vue';
  import AboutService from './AboutService.vue';
  import { getServices } from "../model/config"

  const { locale } = useI18n()
  const services = computed(() => getServices(locale.value || 'ru'))
</script>

<template>
  <section
    id="services"
    class="services"
  >
    <IndexSectionTitle>Услуги</IndexSectionTitle>

    <div class="services-grid">
      <template
        v-for="service in services"
        :key="service.id"
      >
        <ServiceCard
          v-if="service.id !== 'questions'"
          :service="service"
          :onclick="`
            if ('replaceState' in history) {
              history.replaceState(null, document.title, location.pathname + location.search);
            } else {
              location.hash = '';
            }
            location.hash = 'services';
            document.getElementById('${service.id}-modal').showModal();
          `"
        />
        <ServiceCtaCard
          v-else
          :service="service"
        />
        <ModalWindow :id="`${service.id}-modal`">
          <AboutService
            :grid-area="service.gridArea"
            :about-service="service.aboutService"
          />
        </ModalWindow>
      </template>
    </div>
  </section>
</template>

<style scped>
.services {
    width: 100vw;
    min-height: 100vh;
    height: auto;
    padding: 0 var(--padding-section-x) 10vh;
    box-sizing: border-box;

    background-color: var(--strategix-light);

    overflow: hidden;

    @media (--laptop-width) and (min-aspect-ratio: 4/3){
      height: 100vh;
    }
}

.services-grid{
  width: 100%;
  height: 90%;

  gap: var(--gap-grid);
  display: grid;
  grid-template-columns: repeat(2, calc((100% - var(--gap-grid)) / 2));
  grid-auto-rows: max(25vh, 480px - 37vh);

  @media(--mobile-width ){
    grid-template-columns: repeat(3, calc((100% - var(--gap-grid)*2) / 3));
    grid-auto-rows: max(27.5vh, 575px - 70vh);
  }

  @media (--laptop-width) and (min-aspect-ratio: 4/3){
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
    grid-template-rows: repeat(2, minmax(40vh, max-content));
    grid-auto-columns: 20vw;
    grid-auto-rows: minmax(40vh, max-content);
    grid-template-areas: 
      "reputation media branding production"
      "events ai-marketing ads questions"
    ;

    .questions{
      display: flex;
    }
  }
}
</style>
