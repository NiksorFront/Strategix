<script setup lang="ts">
  import IndexSectionTitle from '@/shared/ui/index-section-title/IndexSectionTitle.vue';

</script>

<template>
  <section class="example-goals-company">
    <h2 class="upperscase-text title">
      Что сделали
    </h2>
    <p class="base-text description">
      В период с 30 марта по 30 июня 2025 года были запущены 3 рекламные кампании с разными целями
    </p>

    <ul class="goals-list">
      <li class="goal-row base-text">
        <span class="goal-number">1</span> Вовлеченность в Instagram — на получение заявок.
      </li>
      <li class="goal-row base-text">
        <span class="goal-number">2</span> Трафик в Instagram — для прогрева аудитории и привлечения новых подписчиков, а также получения заявок.
      </li>
      <li class="goal-row base-text">
        <span class="goal-number">3</span> Трафик WhatsApp — для получения прямых запросов от потенциальных клиентов. 
      </li>
      <li class="goal-row base-text">
        <span class="goal-number">4</span> В рекламе использовались баннеры и короткие видео в фирменном стиле, адаптированные под визуальный язык fashion-индустрии.
      </li>
    </ul>
  </section>
</template>

<style scoped>
.example-goals-company{
  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 4.5), 48px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;
  background-color: var(--strategix-accent);

  @media(--tablet-width){
    padding-block: min(calc(var(--vh) * 8), 80px);
  }

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 6), 60px);
  }
}

.title{
  margin: 0;
  color: var(--strategix-light);

  font-size: min(32px, 8.2vw);
  font-weight: 600;
  line-height: 110%;
  letter-spacing: 0;
  text-align: left;

  @media(--tablet-width){
    font-size: clamp(24px, 4.1675vw, 100px);
  }

  @media(--mobile-medium){
    font-size: min(24px, calc(var(--vh) * 3.75));
    margin-bottom: min(calc(var(--vh) * 2), 24px);
  }
}

.description{
  margin: min(calc(var(--vh) * 3), 48px) 0 0;
  color: var(--strategix-light);

  font-size: min(18px, 4.615vw);
  font-weight: 600;
  line-height: 125%;
  letter-spacing: 0;
  text-transform: uppercase;
  text-align: left;

  @media(--tablet-width){
    font-size: clamp(18px, 3vw, 72px);
    margin: min(calc(var(--vh) * 7), 70px) 0 0;
    line-height: 110%;
  }

  @media(--mobile-medium){
    font-size: min(18px, calc(var(--vh) * 3));
    margin: min(calc(var(--vh) * 3), 48px) 0 0;
  }
}

.goals-list{
  list-style: none;
  padding: min(calc(var(--vh) * 2.5), 25px) 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 1), 10px);

  @media(--tablet-width){
    padding: min(calc(var(--vh) * 6), 120px) 0;
    gap: min(calc(var(--vh) * 2), 40px);
  }

  @media(--mobile-medium){
    padding: min(calc(var(--vh) * 1), 10px) 0;
    gap: min(calc(var(--vh) * 1), 10px);
  }
}

.goal-row{
  margin: 0;
  display: flex;
  align-items: center;
  align-items: baseline;
  gap: min(4vw, 18px);

  font-size: min(18px, 4.615vw);
  font-weight: 400;
  line-height: 110%;
  letter-spacing: 0;
  text-align: left;

  color: var(--strategix-light);

  @media(--tablet-width){
    font-size: clamp(18px, 2.5vw, 60px);
    gap: min(calc(var(--vh) * 4), 96px);
  }

  @media(--mobile-medium){
    font-size: min(18px, calc(var(--vh) * 3));
  }
}

.goal-number{
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: min(calc(var(--vh) * 3), 36px);
  height: min(calc(var(--vh) * 3), 36px);
  aspect-ratio: 1 / 1;

  color: var(--strategix-accent);
  background-color: transparent;
  border-radius: 50%;

  text-align: center;
  background-color: var(--strategix-light);

  @media(--tablet-width){
    width: clamp(32px, 4vw, 96px);
    height: clamp(32px, 4vw, 96px);
  }

  @media(--mobile-medium){
    width: min(calc(var(--vh) * 4), 40px);
    height: min(calc(var(--vh) * 4), 40px);
  }
}
</style>