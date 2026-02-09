<script setup lang="ts">
type ExampleWelcomeAboutItem = {
  label: string;
  value: string;
};

type ExampleWelcomeData = {
  sphere: string;
  name: string;
  img: string;
  description: string[];
  about: ExampleWelcomeAboutItem[];
};

const {data} = defineProps<{
  data: ExampleWelcomeData;
}>();
</script>

<template>
  <section class="example-grid">
    <div class="example-welcome">
      <h1 class="upperscase-text title">
        {{ data.name }}
      </h1>
      <NuxtImg
        class="welcome-img"
        :src="data.img"
        :alt="data.name"
        format="webp"
        width="1200"
        height="572"
        loading="lazy"
      />
    </div>
    <p class="base-text description">
      {{ data.description.join(' ') }}
    </p>
    <div class="about-case">
      <div
        v-for="(item, index) in data.about"
        :key="`${item.label}-${index}`"
        class="about-row"
      >
        <p class="base-text about-label">
          {{ item.label }}
        </p>
        <p class="base-text about-value">
          {{ item.value }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.example-grid{
    width: var(--section-width);

    padding-bottom: min(calc(var(--vh) * 6), 72px);
    
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
        padding-bottom: min(calc(var(--vh) * 7), 80px);

        grid-template-columns: minmax(0, 5fr) minmax(0, 4fr);
        grid-template-areas:
          "welcome welcome"
          "description about";
        column-gap: clamp(24px, 5vw, 72px);
        row-gap: clamp(36px, calc(var(--vh) * 10), 108px);
    }

    @media(--mobile-medium){
        padding-bottom: min(calc(var(--vh) * 5), 56px);

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
    padding: 0 var(--padding-section-x);
    box-sizing: border-box;
    margin: auto 0;
    text-align: left;

    font-size: min(min(10vw, calc(var(--vh) * 5.25)), 42px);
    color: var(--strategix-accent);

    @media(--mobile-width){
      font-size: clamp(min(min(4vw, var(--vh) * 3), 42px), 1.95vw + var(--vh) * 2.85, 100px);
    }

    @media (--mobile-width) and (max-aspect-ratio: 4/5){
      font-size: clamp(min(4vw, var(--vh) * 3), min(10vw, calc(var(--vh) * 5.25)), 100px);
   }

    @media(--tablet-width) {
      font-size: clamp(70px, calc((var(--vh) * 4) + 3.25vw), 140px);
      padding: calc(var(--vh) * 3) var(--padding-section-x);
    }

    @media(--mobile-medium) {
       font-size: min(min(10vw, calc(var(--vh) * 5.5)), 42px);
    }
}

.welcome-img{
    width: 100%;
    min-height: 50%;
    height: auto;
    max-height: 100%;

    aspect-ratio: 1200 / 400;

    object-fit: cover;
    object-position: top;
    display: block;

    @media(--tablet-width) {
      min-height: 65%;
    }

    @media(min-aspect-ratio: 3/5){
      aspect-ratio: 1200 / 400;
    }

    @media(max-aspect-ratio: 5/3){
      aspect-ratio: 1200 / 572;
    }

    @media(--pc-width) {
      padding-inline: var(--padding-section-x);
      box-sizing: border-box;
      max-height: 75%;
      aspect-ratio: 1200 / 572;
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
  font-weight: 600;
  line-height: 125%;
  color: var(--strategix-dark);

  @media(--tablet-width){
    padding: 0 0 0 var(--padding-section-x);
    font-size: clamp(18px, calc(1vw + var(--vh) * 1.25), 36px);
  }

  @media(--pc-width){
    min-width: 1370px;
    max-width: calc((var(--section-width) / 1.7));
    box-sizing: border-box;
    margin-left: auto;
  }

  @media(--mobile-medium) {
    padding: 0 0 0 var(--padding-section-x);
    font-size: min(25px, calc(var(--vh) * 3.75));
  }
}

.about-case{
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
    font-size: clamp(18px, 1vw, 32px);
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
