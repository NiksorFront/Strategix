<script setup lang="ts">
  import IndexSectionTitle from "@/shared/ui/index-section-title";
  import Filters from "./Filters.vue";
  import Slider from "./Slider.vue";
  import ProjectCard from "./ProjectCard.vue";

  // import src1 from '@/assets/images/toba.jpg';
  // import src2 from '@/assets/images/touch.jpg';
  // import src3 from '@/assets/images/PTI.jpg';
</script>

<template>
  <section class="our-projects">
    <IndexSectionTitle :is-white="true">
      Наши проекты
    </IndexSectionTitle>

    <Filters :categories="['Кейсы', 'Брендинг', 'Продакшн', 'Реклама', 'Построение репутации']" />
    <Slider>
      <ProjectCard
        src="./images/toba.jpg"
        title="toba"
        description="Как мы сделали ньюсмейкером российского разработчика ПО для резервного копирования"
      />
      <ProjectCard
        src="./images/touch.jpg"
        title="touch"
        description="Как мы сделали ньюсмейкером российского разработчика ПО для резервного копирования"
      />
      <ProjectCard
        src="./images/PTI.jpg"
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
