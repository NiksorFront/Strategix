<script setup lang="ts">

</script>

<template>
  <section class="example-grid">
    <div class="example-welcome">
      <h1 class="title">
        CSS
      </h1>
      <NuxtImg
        class="welcome-img"
        src="/images/css.jpg"
        alt="css"
        width="1200"
        height="572"
        loading="lazy"
      />
    </div>
    <p class="description base-text">
      CSS — лондонская компания, специализирующаяся на комплексных услугах для модных брендов. Дизайн, разработка образцов, производство, маркетинг, наставничество и индивидуальный пошив.
    </p>
    <div class="about-project">
      <div class="about-row">
        <p class="about-label base-text">
          Сектор
        </p>
        <p class="about-value base-text">
          Реклама
        </p>
      </div>
      <div class="about-row">
        <p class="about-label base-text">
          Клиент
        </p>
        <p class="about-value base-text">
          CSS
        </p>
      </div>
      <div class="about-row">
        <p class="about-label base-text">
          Страна
        </p>
        <p class="about-value base-text">
          Лондон
        </p>
      </div>
      <div class="about-row">
        <p class="about-label base-text">
          Аудитория
        </p>
        <p class="about-value base-text">
          Великобритания, США — запуск на англоязычную аудиторию
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.example-grid{
    width: var(--section-width);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "welcome"
      "about"
      "description";
    grid-auto-rows: auto;
    gap: min(calc(var(--vh) * 8.5), 54px);
    align-items: start;

    background-color: var(--strategix-light);

    @media(--tablet-width){
        grid-template-columns: minmax(0, 5fr) minmax(0, 4fr);
        grid-template-areas:
          "welcome welcome"
          "description about";
        column-gap: clamp(24px, 5vw, 72px);
        row-gap: clamp(36px, calc(var(--vh) * 10), 108px);
    }

    @media(--mobile-medium){
        grid-template-columns: minmax(0, 5fr) minmax(0, 4fr);
        grid-template-areas:
          "welcome welcome"
          "description about";
        /* column-gap: min(calc(var(--vh) * 5), 24px); */
        row-gap: min(calc(var(--vh) * 14), 64px);
    }
}

.example-welcome {
    grid-area: welcome;
    width: 100%;
    min-height: calc(var(--vh) * 40);
    height: auto;

    display: flex;
    flex-direction: column;

    @media(--mobile-width){
        min-height: calc(var(--vh) * 60);
    }

    @media(--tablet-width) {
        min-height: calc(var(--vh) * 60);
        height: auto;
        max-height: calc(var(--vh) * 120);
    }

    @media(min-aspect-ratio: 1/1){
        min-height: calc(var(--vh) * 90);
    }

    @media(--pc-width){
        min-height: 0;
        max-height: calc(var(--vh) * 50);
    }

    /* @media(--mobile-medium) {
      min-height: calc(var(--vh) * 90);
    } */
  }

.title {
    width: 100%;
    padding: calc(var(--vh) * 8.5) var(--padding-section-x);
    box-sizing: border-box;
    margin: auto 0;

    font-family: "Liberty-MT", "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: min(70px, 13vw);
    /* font-size: clamp(70px, calc((var(--vh) * 7) + 5.25vw), 264px); */
    font-weight: 400;
    color: var(--strategix-accent);

    @media(--tablet-width) {
      font-size: clamp(70px, calc((var(--vh) * 7) + 5.25vw), 264px);
      padding: calc(var(--vh) * 3) var(--padding-section-x);
    }

    @media(--mobile-medium) {
      font-size: min(70px, calc((var(--vh) * 7) + 5.25vw));
    }
}

.welcome-img{
    width: 100%;
    min-height: 50%;
    height: auto;
    max-height: 100%;

    aspect-ratio: 1200 / 572;
    object-fit: cover;
    object-position: top;
    display: block;

    @media(--tablet-width) {
      min-height: 65%;
    }

    @media(--pc-width) {
      padding-inline: var(--padding-section-x);
      box-sizing: border-box;
      max-height: 75%;
    }

    @media(--mobile-medium) {
      max-height: 75%;
    }
}

.description{
  grid-area: description;
  padding: 0 var(--padding-section-x) 0 var(--padding-section-x);
  margin: 0;

  text-align: left;
  font-size: min(18px, 4.6vw);
  font-weight: 400;
  line-height: 125%;

  @media(--tablet-width){
    padding: 0 0 0 var(--padding-section-x);
    font-size: clamp(30px, 2.5vw, 60px);
  }

  @media(--pc-width){
    min-width: 1370px;
    max-width: calc((var(--section-width) / 1.7));
    box-sizing: border-box;
    margin-left: auto;
  }

  @media(--mobile-medium) {
    padding: 0 0 0 var(--padding-section-x);
    font-size: min(24px, calc(var(--vh) * 4.5));
    line-height: 110%;
  }
}

.about-project{
  grid-area: about;
  padding: 0 var(--padding-section-x) 0 var(--padding-section-x);
  display: grid;
  gap: min(calc(var(--vh) * 1.9), 20px);

  @media(--tablet-width){
    padding: 0 var(--padding-section-x) 0 0;
    gap: min(calc(var(--vh) * 2), 40px);
  }

  @media(--mobile-medium) {
    padding: 0 var(--padding-section-x) 0 0;
    gap: min(calc(var(--vh) * 0.8), 7px);
  }
}

.about-row{
  width: 100%;
  min-height: calc(var(--vh) * 5);
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-columns: max-content minmax(0, 1fr); */
  column-gap: clamp(12px, 2.5vw, 28px);
  align-items: start;

  font-size: min(18px, 4.6vw);

  @media(--tablet-width){
    font-size: clamp(18px, 2vw, 50px);
    min-height: calc(var(--vh) * 3);
  }

  @media(--pc-width){
    min-width: 1100px;
    max-width: calc((var(--section-width) / 3));
  }

  @media(--mobile-medium) {
    width: 100%;
    font-size: min(18px, calc(var(--vh) * 3.75));
    min-height: calc(var(--vh) * 5);
  }
}

.about-label{
  text-align: left;
  font-weight: 400;
  color: var(--strategix-gray);

  margin: 0;
}

.about-value{
  text-align: left;
  font-weight: 400;

  margin: 0;
}
</style>
