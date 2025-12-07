
<script setup lang="ts">
import ServiceCtaCard from "./ServiceCtaCard.vue";
import type { ServiceItem } from "../model/config";

const {service} = defineProps<{service: ServiceItem;}>();
</script>

<template>
  <article
    class="service-card"
    :class="service.gridArea"
  >
    <div class="base-text service-card__decor">
      <component
        :is="service.Decor"
      />
    </div>

    <h3 class="base-text service-card__title">
      {{ service.title }}
    </h3>

    <p class="small-text service-card__description">
      {{ service.description }}
    </p>
  </article>
</template>

<style>
.service-card {
  width: 100%;
  height: 100%;
  max-height: 100%;
  box-sizing: border-box;
  border-radius: var(--card-radius);
  background: white;
  padding: clamp(12px, 0.666vw + 1.5vh, 40px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  transition: all 0.3s ease-in-out;
}

.service-card__title {
  padding-top: 5px;
  margin: auto 0 auto;
  text-align: left;

  text-transform: uppercase;
  font-size: min(16px, 3.75vw);

  transition: all 0.3s ease-in-out;

  @media(--tablet-width){
    font-size: clamp(16px, calc(0.525vw + 1.75vh), 40px);
  }

  @media(--mobile-medium){
    font-size: min(16px, 3.35vh);
  }
}

.service-card__decor{
  width: calc(1.5vw + 1.5vh);
  height: auto;
  margin: 0;

  transition: all 0.3s ease-in-out;
}

.service-card__description {
  width: 100%;

  margin: 0;
  font-weight: 400;   
  color: var(--strategix-gray);
  text-align: left;

  font-size: clamp(12px, calc(0.446vw + 1.14vh), 32px);
  /* line-height: 100%; */
  transition: all 0.3s ease-in-out;

  @media(--tablet-width){
    width: 85%;
  }


  @media(--mobile-medium) {
      font-size: min(12px, 2vh);
  }
}

@media(--tablet-width){
  .service-card:hover{
    /* padding: calc(clamp(12px, 0.666vw + 1.5vh, 40px) / 2) clamp(12px, 0.666vw + 1.5vh, 40px); */
    padding: clamp(12px, 0.666vw + 1.5vh, 40px) clamp(12px, 0.666vw + 1.5vh, 40px) calc(clamp(12px, 0.666vw + 1.5vh, 40px) / 2);
    background-color: var(--strategix-accent);
    cursor: pointer;
  }

  .service-card:hover .service-card__title{
    padding-top: 15px;
    
    color: var(--strategix-light);

    font-size: clamp(20px, calc(0.675vw + 2.1vh), 44px);

    @media(--mobile-medium){
      font-size: min(20px, 4.6vh);
    }
  }

  .service-card:hover .service-card__description {
    width: 97%;

    color: var(--strategix-light);

    font-size: clamp(14px, calc(0.4vw + 1.5vh), 34px);
    transition: all 0.3s;

    @media(--mobile-medium) {
        font-size: min(14px, 3.325vh);
    }
  }



  /*При hover каждая из икнок по размеру становиться в 1.3 раза больше оригинала*/
  .reputation{
      grid-area: reputation;
  }

  .reputation .service-card__decor {
    width: 4.075%;
    height: auto;
  }

  .reputation:hover .service-card__decor{
    /* width: 5.35%; */
    transform: scale(1.3) translateX(15%) translateY(10%);
  }

  .reputation:hover .service-card__decor .reputation__decor .reputation__decor__column{
    animation: reputation-anim 2s infinite ease-in-out;
  }




  .media{
      grid-area: media;
  }

  .media .service-card__decor {
    width: 15.8%;
    height: auto;
  }

  .media:hover .service-card__decor{
    transform: scale(1.3) translateX(15%) translateY(15%);
  }

  .media:hover .service-card__decor .media__decor .media__decor__dot{
    background-color: var(--strategix-accent-light);
    animation: media-anim 2s infinite ease-in-out;
  }




  .branding{
      grid-area: branding;
  }

  .branding .service-card__decor {
    width: 6.04%;
    height: auto;
  }

  .branding:hover .service-card__decor{
    transform: scale(1.3) translateX(15%) translateY(15%);
  }

  .branding:hover .service-card__decor .branding__decor .branding__decor__square{
    animation: square-anim 3s infinite linear;
  }



  .production{
    grid-area: production;
  }

  .production .service-card__decor {
    width: 15.85%;
    height: auto;
  }

  .production:hover .service-card__decor{
    transform: scale(1.3) translateX(15%) translateY(15%);
  }

  .production:hover .service-card__decor .production__decor .production__decor__quarter-circle{
    background-color: var(--strategix-accent);
    animation: production-anim 2s infinite linear;
  }



  .events{
    grid-area: events;
  }

  .events .service-card__decor {
    width: 26.54%;
    height: auto;
  }

  .events:hover .service-card__decor{
    transform: scale(1.3) translateX(15%) translateY(15%);
  }

  .events:hover .service-card__decor .events__decor .events__decor__quarter-square{
    background-color: var(--strategix-accent);
    animation: events-anim 2s infinite linear;
  }




  .ai-marketing{
      grid-area: ai-marketing;
  }

  .ai-marketing .service-card__decor {
    width: calc(1.5vw + 1.5vh);
    height: auto;
    aspect-ratio: 1 / 1;
    margin: 0;
  }

  .ads{
      grid-area: ads;
  }
  
  .ads .service-card__decor {
    width: calc(1.5vw + 1.5vh);
    height: auto;
    aspect-ratio: 1 / 1;
    margin: 0;
  }

  .questions{
      grid-area: questions;
  }
}
</style>
