<!-- <script setup lang="ts">

</script> -->

<template>
  <section class="market-response">
    <h3 class="market-title">
      Быстро отвечаем на вызовы международного рынка
    </h3>
    <p class="small-text market-description">
      Профессиональная команда в&nbsp;области репутационного маркетинга. Мы&nbsp;создаём бренды, поддерживаем хорошую репутацию клиентов в&nbsp;интернете, прогнозируем возможные риски, кризисы и&nbsp;профессионально устраняем&nbsp;их.
      <br>
      <br>
      Под разные ситуации находим решения, чтобы у&nbsp;вас была узнаваемость, доверие к&nbsp;вам, инвесторы потом к&nbsp;вам несли денег и&nbsp;доверяли. Мыслить нестандарнтно.
    </p>
  </section>
</template>

<style scped>
.market-response {
    width: 100vw;
    height: fit-content;
    padding: 4vh var(--padding-section-x) 2vh;
    box-sizing: border-box;

    background-color: var(--strategix-light);

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media(--tablet-width){
      padding: 8.5vh var(--padding-section-x) 4vh;
    }
}

.market-title{
    width: 100%;
    height: fit-content;

    margin: 0;

    font-family: "Liberty-MT", "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 400;      
    line-height: 120%;  
    letter-spacing: 0;
    text-align: left;
    text-transform: none;

    color: var(--strategix-dark);
    font-size: min(25px, 6.4vw);

    @media(--tablet-width){
      width: 50.4%;
      height: fit-content;
      font-size: clamp(25px, 2.166vw, 52px);
    }

    @media(--mobile-medium) {
      font-size: min(25px, 5vh);
    }
    
}

.market-description{
  width: 100%;
  height: fit-content;

  margin: 0.5vh 0 0;

  color: var(--strategix-dark);
  text-align: left;

  @media(--tablet-width){
    width: 49.6%;
    height: fit-content;
  }
}
</style>
