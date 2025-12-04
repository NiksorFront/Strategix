<script setup lang="ts">

import MemberCard from './MemberCard.vue';
import TeamInfoCard from './TeamInfoCard.vue';
import TeamCtaCard from './TeamCtaCard.vue';

import src1 from '@/assets/images/savvateev.jpg';
import src2 from '@/assets/images/boris.png';
import src3 from '@/assets/images/lebedev.png';
import src4 from '@/assets/images/kuznetsov.png';
</script>


<template>
  <section
    id="our-team"
    class="our-team"
  >
    <div class="team">
      <TeamInfoCard />

      <MemberCard
        src="./images/savvateev.jpg"
        name="Алексей"
        lastname="Савватеев"
        position="Математик"
      />
      <MemberCard
        src="./images/boris.png"
        name="Борис"
        lastname="Бояршинов"
        position="Физик"
      />
      <MemberCard
        src="./images/savvateev.jpg"
        name="Алексей"
        lastname="Савватеев"
        position="Математик"
      />
      <MemberCard
        src="./images/lebedev.png"
        name="Артемий"
        lastname="Лебедев"
        position="Дизайнер"
      />
      <MemberCard
        src="./images/lebedev.png"
        name="Артемий"
        lastname="Лебедев"
        position="Дизайнер"
      />
      <MemberCard
        src="./images/kuznetsov.png"
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
