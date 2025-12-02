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
        people-img="./images/savvateev.jpg"
        name="Алексей"
        lastname="Савватеев"
        position="Математик"
      />
      <MemberCard
        people-img="./images/boris.png"
        name="Борис"
        lastname="Бояршинов"
        position="Физик"
      />
      <MemberCard
        people-img="./images/savvateev.jpg"
        name="Алексей"
        lastname="Савватеев"
        position="Математик"
      />
      <MemberCard
        people-img="./images/lebedev.png"
        name="Артемий"
        lastname="Лебедев"
        position="Дизайнер"
      />
      <MemberCard
        people-img="./images/lebedev.png"
        name="Артемий"
        lastname="Лебедев"
        position="Дизайнер"
      />
      <MemberCard
        people-img="./images/kuznetsov.png"
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
    width: 100vw;
    height: max(70vh, fit-content); 
    padding: 0 var(--padding-section-x) 8vh;
    box-sizing: border-box;

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
