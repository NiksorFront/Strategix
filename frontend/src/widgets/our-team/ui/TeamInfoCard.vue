<script setup lang="ts">
import index from '@/content/pages/index.json'

const { locale } = useI18n()
const currentLocale = locale.value || 'ru'
const translations = index.translations[currentLocale as keyof typeof index.translations] || index.translations.ru

const title = translations.our_team.firstcard.title
const description = translations.our_team.firstcard.description
</script>

<template>
  <article class="team-info-card">
    <h3 class="base-text team-info-card__title">
      {{ title }}
    </h3>

    <p class="base-text team-info-card__text">
      {{ description }}
    </p>
  </article>
</template>

<style scoped>
.team-info-card {
  width: 100%;
  height: 100%;
  padding: clamp(16px, 6%, 32px) clamp(10px, 7%, 40px);
  box-sizing: border-box;
  border-radius: var(--card-radius);
  background-color: white;

  display: none;
  flex-direction: column;
  justify-content: space-between;

  @media(--tablet-width){
    display: flex;
  }
}

.team-info-card__title {
  width: 80%;
  margin: 0;    

  font-size: clamp(20px, calc(1.5vw + 1vh), 56px);
  line-height: 115%;
  font-weight: 500;
  text-align: left;

  color: var(--strategix-accent);

  @media(--mobile-medium){
    font-size: min(20px, 4.175vh);
  }
}

.team-info-card__text {
  width: 80%;
  margin: 0;

  font-size: clamp(14px, calc(1vw + 0.35vh), 28px);
  line-height: 115%;
  font-weight: 400;
  text-align: left;

  color: var(--strategix-dark);

  @media(--mobile-medium){
    font-size: min(14px, 2.71vh);
  }
}

</style>
