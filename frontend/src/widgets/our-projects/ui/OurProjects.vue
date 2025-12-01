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
      <ProjectCard
        img="./images/toba.jpg"
        title="toba"
        description="Как мы сделали ньюсмейкером российского разработчика ПО для резервного копирования"
      />
      <ProjectCard
        img="./images/touch.jpg"
        title="touch"
        description="Как мы сделали ньюсмейкером российского разработчика ПО для резервного копирования"
      />
      <ProjectCard
        img="./images/PTI vehicle inspection.jpg"
        title="PTI vehicle inspection"
        description="Как мы сделали ньюсмейкером российского разработчика ПО для резервного копирования"
      />
    </Slider>
    <div />
  </section>
</template>

<style scoped>
.our-projects {
    width: calc(100vw - 2 * var(--padding-section-x));
    /* height: max(85vh, max-content); */
    height: 85vh;
    padding: 7.5vh 0;;

    padding-inline: var(--padding-section-x);
    background-color: var(--background-dark);
}
</style>
