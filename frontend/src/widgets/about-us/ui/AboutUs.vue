<script setup lang="ts">
  import IndexSectionTitle from '@/shared/ui/index-section-title/';
</script>

<template>
  <section
    class="about-us"
    aria-labelledby="about-title"
  >
    <div class="about-us-content">
      <IndexSectionTitle>О нас</IndexSectionTitle>
  
      <details class="about-item">
        <summary class="about-summary">
          <span class="base-text about-title">МИССИЯ</span>
          <span class="base-text about-subtitle">Репутация как стратегический актив</span>
          <span
            class="about-icon"
            aria-hidden="true"
          ><NuxtImg src="./images/plus-icon.svg" /></span>
        </summary>
        <p class="base-text about-answer">
          <span class="base-text about-subtitle-2">Репутация как стратегический актив</span><br>
          Мы создаём и внедряем комплексные решения, которые помогают компаниям управлять своим образом в медиа, усиливать влияние и укреплять позиции на рынке. Репутация становится не только отражением деятельности, но и мощным инструментом стратегического развития, открывающим новые возможности для роста и партнёрства.
        </p>
      </details>

      <details class="about-item">
        <summary class="about-summary">
          <span class="base-text about-title">ЦЕННОСТИ</span>
          <span class="base-text about-subtitle">Глубина анализа, конфиденциальность и работа на результат</span>
          <span
            class="about-icon"
            aria-hidden="true"
          ><NuxtImg src="./images/plus-icon.svg" /></span>
        </summary>
        <p class="base-text about-answer">
          <span class="base-text about-subtitle-2">Глубина анализа, конфиденциальность и работа на результат</span><br>
          тут нужно содержаение
        </p>
      </details>

      <details class="about-item">
        <summary class="about-summary">
          <span class="base-text about-title">НАШ ПОДХОД</span>
          <span class="base-text about-subtitle">Мы ценим долгосрочные отношения, прозрачность процессов</span>
          <span
            class="about-icon"
            aria-hidden="true"
          >
            <NuxtImg src="./images/plus-icon.svg" />
          </span>
        </summary>
        <p class="base-text about-answer">
          <span class="base-text about-subtitle-2">Мы ценим долгосрочные отношения, прозрачность процессов</span><br>
          тут нужно содержаение
        </p>
      </details>
    </div>
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
    align-items: center;
}

.about-us-content{
  width: 100%;
  height: auto;

  margin: auto 0 auto;
  display: flex;
  flex-direction: column;
}

.about-item {
  border-top: clamp(1px, 0.125vw, 4px) solid var(--strategix-dark);
  padding: min(23px, 2.5vh) 0;

  @media(--tablet-width){
    padding: 20.5px 0;
  }

  @media(--big-laptop-width){
    padding: clamp(23px, 3vh, 50px) 0;
  }

  @media(--mobile-medium){
    padding: min(23px, 2.5vh) 0;
    border-top: 1px solid var(--strategix-dark);
  }
}

.about-item:last-child {
  border-bottom: clamp(1px, 0.125vw, 4px) solid var(--strategix-dark);

  @media(--mobile-medium){
    border-bottom: 1px solid var(--strategix-dark);
  }
}

.about-summary {
  display: flex;
  transition: transform 0.5s ease;
  align-items: center;
  cursor: pointer;
  list-style: none;
}

.about-summary::-webkit-details-marker {
  display: none;
}

.about-title {
  width: 70vw;
  text-align: left;
  font-weight: 600;
  font-size: clamp(28px, 2.4vw, 56px);
   

  @media(--tablet-width){
    width: 30vw;
  }

  @media(--mobile-medium){
    font-size: min(28px, 5vh);
  }
}

.about-subtitle {
  width: 70vw;
  font-weight: 700;
  text-align: left;
  font-size: clamp(20px, 1.65vw, 40px);
  display: none;

  @media(--mobile-medium){
    font-size: min(20px, 3.6vh);
  }

  @media(--tablet-width){
    width: 55vw;
    display: block;
  }
 
}

.about-subtitle-2 {
  width: 90%;
  font-weight: 700;
  text-align: left;
  font-size: min(23px, 10vw);
  display: block;

  @media(--mobile-medium){
    font-size: min(23px, 4vh);
  }

  @media(--tablet-width){
    width: 55vw;
    display: none;
  }
 
}

.about-answer {
  width: 98%;
  /* стили текста оставляем */
  font-size: clamp(16px, 1.2vw, 32px);
  text-align: left;
  font-weight: 300;

  /* анимация раскрытия */
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  margin-top: 0;

  transition:
    max-height 0.4s ease,
    opacity 0.3s ease,
    margin-top 0.4s ease;

  @media (--mobile-medium) {
    font-size: min(16px, 2.8vh);
  }

  @media (--tablet-width) {
    margin-left: min(30vw, 875px);
    width: min(55vw, 1600px);
    display: block;
  }
}

/* состояние при открытом details */
details[open] .about-answer {
  opacity: 1;
  margin-top: min(13px, 1.5vh);
  max-height: 500px; /* значение с запасом под максимальную высоту текста */

  @media (--tablet-width) {
    margin-top: min(33px, 3.3vh);
  }
}



.about-icon {
  width: auto;
  height: min(40px, 6vh);
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;
  margin-left: auto;
  background-color: white;
  border-radius: 50%;

  @media(--big-laptop-width){
    height: clamp(40px, 6vh, 80px);
  }

  @media (--mobile-medium) {
    height: min(40px, 6vh);
  }
}

.about-icon img{
  width: 50%;
  height: 50%;
}

details[open] .about-icon {
  transform: rotate(45deg);
  background-color: var(--strategix-accent);
}

details[open] .about-icon img {
  filter: invert(1);
}

</style>
