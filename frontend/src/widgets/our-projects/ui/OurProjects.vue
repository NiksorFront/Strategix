<script setup lang="ts">
  import IndexSectionTitle from "@/shared/ui/index-section-title";
  import Filters from "./Filters.vue";
  import Slider from "./Slider.vue";
  import ProjectCard from "./ProjectCard.vue";
</script>

<template>
  <section class="our-projects">
    <IndexSectionTitle :is-white="true">
      Наши проекты
    </IndexSectionTitle>

    <Filters :categories="['Кейсы', 'Брендинг', 'Продакшн', 'Реклама', 'Построение репутации']" />
    <Slider>
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </Slider>
    <div />
  </section>
</template>

<style scoped>
.our-projects {
    width: calc(100vw - 2 * var(--padding-section-x));
    height: 80vh;
    /* height: calc(100vh - 2 * var(--padding-section-x)); */
    padding: 10vh 0;;

    padding-inline: var(--padding-section-x);
    background-color: var(--background-dark);
}
</style>
