<script setup lang="ts">
  import IndexSectionTitle from "@/shared/ui/index-section-title";
  import Filters from "./Filters.vue";
  import Slider from "./Slider.vue";
  import ProjectCard from "./ProjectCard.vue";
  import index from '@/content/pages/index.json'

  const { locale } = useI18n()
  const currentLocale = locale.value || 'ru'
  const translations = index.translations[currentLocale as keyof typeof index.translations] || index.translations.ru

  const sectionTitle = translations.our_projects.section_title
  const filters = translations.our_projects.filters
  const projects = translations.our_projects.projects
</script>

<template>
  <section
    id="our-projects"
    class="our-projects"
  >
    <IndexSectionTitle :is-white="true">
      {{ sectionTitle }}
    </IndexSectionTitle>

    <Filters :categories="filters" />
    <Slider>
      <ProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :src="project.src"
        :title="project.title"
        :description="project.description"
      />
    </Slider>
    <div />
  </section>
</template>

<style scoped>
.our-projects {
    width: 100vw;
    height: 100vh;
    padding: 7.5vh var(--padding-section-x);
    box-sizing: border-box;

    background-color: var(--strategix-dark);

    @media(--laptop-width){
      height: 105vh;
    }

    @media(--tablet-width) and (max-aspect-ratio: 4/3){
      height: 75vh;
    }

    @media(--mobile-medium){
      height: 105vh;
    }
}
</style>
