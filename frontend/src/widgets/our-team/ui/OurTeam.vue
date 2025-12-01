<script setup lang="ts">

import MemberCard from './MemberCard.vue';
import TeamInfoCard from './TeamInfoCard.vue';
import TeamCtaCard from './TeamCtaCard.vue';
</script>


<template>
  <section class="our-team">
    <div class="team">
      <TeamInfoCard />

      <MemberCard
        people-img="./images/savvateev.png"
        name="Алексей"
        lastname="Савватеев"
        position="Математик"
      />
      <MemberCard
        people-img="./images/boris.jpg"
        name="Борис"
        lastname="Бояршинов"
        position="Физик"
      />
      <MemberCard
        people-img="./images/savvateev.png"
        name="Алексей"
        lastname="Савватеев"
        position="Математик"
      />
      <MemberCard
        people-img="./images/artemey.jpg"
        name="Артемий"
        lastname="Лебедев"
        position="Дизайнер"
      />
      <MemberCard
        people-img="./images/artemey.jpg"
        name="Артемий"
        lastname="Лебедев"
        position="Дизайнер"
      />
      <MemberCard
        people-img="./images/sergey.jpg"
        name="Сергей"
        lastname="Кузнецов"
        position="Архитектор"
      />

      <TeamCtaCard />
    </div>
  </section>
</template>

<style scoped>
.our-team {
    width: calc(100vw - 2 * var(--padding-section-x));
    height: max(63vh, fit-content); /* 20.5vh + 8.5vh у MarketResponse и 63vh + 8vh тут. Итого ровно 100vh */

    padding: 0 var(--padding-section-x) 8vh;
    background-color: var(--strategix-light);
}

.team{
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-auto-rows: 190px;

  gap: var(--gap-grid);

  @media(--tablet-width){
    grid-template-columns: repeat(auto-fit, minmax(calc(25.175% - var(--gap-grid)), 1fr));
    grid-auto-rows: clamp(250px, 30.75vh, 600px);
  }

  @media(--mobile-medium){
    grid-template-columns: repeat(auto-fit, minmax(calc(25.175% - var(--gap-grid)), 1fr));
    grid-auto-rows: calc(51% - var(--gap-grid));
  }
  
}
</style>
