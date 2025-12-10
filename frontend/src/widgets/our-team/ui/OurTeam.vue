<script setup lang="ts">

import MemberCard from './MemberCard.vue';
import TeamInfoCard from './TeamInfoCard.vue';
import TeamCtaCard from './TeamCtaCard.vue';
import index from '@/content/pages/index.json'

const { locale } = useI18n()
const currentLocale = locale.value || 'ru'
const translations = index.translations[currentLocale as keyof typeof index.translations] || index.translations.ru

const members = translations.our_team.members
</script>


<template>
  <section
    id="our-team"
    class="our-team"
  >
    <div class="team">
      <TeamInfoCard />

      <MemberCard
        v-for="(member, index) in members"
        :key="index"
        :src="member.src"
        :name="member.name"
        :lastname="member.lastname"
        :position="member.position"
      />

      <TeamCtaCard />
    </div>
  </section>
</template>

<style scoped>
.our-team {
    width: 100vw;
    min-height: 70vh;
    height: fit-content; 
    padding: 0 var(--padding-section-x);
    box-sizing: border-box;

    background-color: var(--strategix-light);

    @media(--tablet-width){
      padding: 0 var(--padding-section-x) 8vh;
    }
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
