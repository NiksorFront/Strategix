<script setup lang="ts">
import IndexSectionTitle from '@/shared/ui/index-section-title';
import MemberCard from './MemberCard.vue';

</script>


<template>
  <section class="our-team">
    <!-- <IndexSectionTitle>
      Наша команда
    </IndexSectionTitle> -->
    <div class="team">
      <MemberCard
        people-img="./images/savvateev.png"
        name="Алексей"
        lastname="Савватеев"
        position="математик"
      />
      <MemberCard
        people-img="./images/savvateev.png"
        name="Алексей"
        lastname="Савватеев"
        position="математик"
      />
      <MemberCard
        people-img="./images/boris.jpg"
        name="Борис"
        lastname="Бояршинов"
        position="физик"
      />
      <MemberCard
        people-img="./images/savvateev.png"
        name="Алексей"
        lastname="Савватеев"
        position="математик"
      />
      <MemberCard
        people-img="./images/artemey.jpg"
        name="Артемий"
        lastname="Лебедев"
        position="математик"
      />
      <MemberCard
        people-img="./images/artemey.jpg"
        name="Артемий"
        lastname="Лебедев"
        position="математик"
      />
      <MemberCard
        people-img="./images/sergey.jpg"
        name="Сергей"
        lastname="Кузнецов"
        position="архитектор"
      />
    </div>
  </section>
</template>

<style scoped>
.our-team {
    width: calc(100vw - 2 * var(--padding-section-x));
    height: max(62vh, fit-content);

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
    grid-auto-rows: clamp(250px, 29vh, 600px);
  }

  @media(--mobile-medium){
    grid-template-columns: repeat(auto-fit, minmax(calc(25.175% - var(--gap-grid)), 1fr));
    grid-auto-rows: calc(51% - var(--gap-grid));
  }
  
}
</style>
