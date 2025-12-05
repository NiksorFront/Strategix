<script setup lang="ts">
  import IndexSectionTitle from '@/shared/ui/index-section-title/';
  import AboutItem from './AboutItem.vue';
</script>

<template>
  <section
    id="about-us"
    class="about-us"
    aria-labelledby="about-title"
  >
    <IndexSectionTitle>О нас</IndexSectionTitle>
  
    <AboutItem
      title="МИССИЯ"
      subtitle="Репутация как стратегический актив"
      content=" Мы создаём и внедряем комплексные решения, которые помогают компаниям управлять своим образом в медиа, усиливать влияние и укреплять позиции на рынке. Репутация становится не только отражением деятельности, но и мощным инструментом стратегического развития, открывающим новые возможности для роста и партнёрства."
    />

    <AboutItem
      title="ЦЕННОСТИ"
      subtitle="Глубина анализа, конфиденциальность и работа на результат"
      content="тут нужно содержаение"
    />

    <AboutItem
      title="НАШ ПОДХОД"
      subtitle="Мы ценим долгосрочные отношения, прозрачность процессов"
      content="тут нужно содержаение"
    />
  </section>
</template>

<style scoped>
.about-us{
    width: 100vw;
    height: fit-content;
    padding: 10vh var(--padding-section-x);
    box-sizing: border-box;

    background-color: var(--strategix-light);

    display: flex;
    flex-direction: column;
    /* align-items: center; */
}

</style>
