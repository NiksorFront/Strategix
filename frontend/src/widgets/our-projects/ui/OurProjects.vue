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
    width: 100vw;
    height: 100vh;
    padding: 7.5vh var(--padding-section-x);
    box-sizing: border-box;

    background-color: var(--strategix-dark);
}
</style>
