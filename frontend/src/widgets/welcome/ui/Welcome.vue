<script setup lang="ts">
  import ButtonWithIcon from '~/shared/ui/button-with-icon';
</script>

<template>
  <section class="welcome">
    <div class="text-content">
      <h1 class="upperscase-text title">
        МЫ&nbsp;СТРОИМ РЕПУТАЦИЮ И&nbsp;ОТКРЫВАЕМ ДВЕРИ&nbsp;НА МЕЖДУНАРОДНЫЕ РЫНКИ
      </h1>
      <h2 class="base-text subtitle">
        Международное позиционирование через медиа, ивенты и&nbsp;доверие профессионального сообщества.
      </h2>
      <div class="welcome-buttons">
        <ButtonWithIcon
          src-icon="./images/line-md_arrow-up.svg"
          style-button="green"
        >
          ЗАПОЛНИТЕ АНКЕТУ
        </ButtonWithIcon>
        <ButtonWithIcon
          class="desktop"
          src-icon="./images/line-md_arrow-up.svg"
          style-button="green"
        >
          TELEGRAM
        </ButtonWithIcon>
        <ButtonWithIcon
          class="desktop"
          src-icon="./images/line-md_arrow-up.svg"
          style-button="green"
        >
          WHATSAPP
        </ButtonWithIcon>
        <ButtonWithIcon
          class="mobile"
          src-icon="./images/arrow-forward.svg"
          style-button="white"
        >
          TELEGRAM
        </ButtonWithIcon>
        <ButtonWithIcon
          class="mobile"
          src-icon="./images/arrow-forward.svg"
          style-button="white"
        >
          WHATSAPP
        </ButtonWithIcon>
      </div>
    </div>
    <div class="diagrams">
      <p>тут будет диограмма</p>
    </div>
  </section>
</template>

<style scoped>
.welcome {
    width: var(--section-width);
    height: calc(89.2vh - min(35px, 4.2vh)); /* высота экрана минус паддинги(5.4vh и 5.4vh) хедера и минус высота хедера */
    
    padding-inline: var(--padding-section-x);
    background-color: var(--background-dark);

    @media (--tablet-width) {
      height: calc(91.4vh - 31px); /* высота экрана минус паддинги(3.4 и 5.2) хедера и минус высота хедера */
    }

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.text-content{
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  z-index: 1;

  @media(--tablet-width){
    width: 65%;
  }

  @media(--laptop-width){
    width: 50%;
  }
}

.title{
  text-align: left;
  font-size: min(min(10vw, 5.5vh), 42px);
  color: white;
  line-height: 120%;

  margin-top: 4%;
  margin-bottom: 0;

  @media(--mobile-width){
    font-size: clamp(min(min(10vw, 5.5vh), 42px), 3.5vw, 100px);
  }

  @media(--mobile-medium) {
    font-size: 8vh;
  }
}

.subtitle{
  width: 100%;
  text-align: left;
  font-size: min(20px, 2.3vh);
  color: var(--strategix-accent);
  line-height: 120%;

  margin-top: 1.5%;
  margin-bottom: 0;

  @media(--tablet-width){
    width: 82%;
    font-size: clamp(20px, 2vw, 50px);
    margin-top: 3.5%;
  }

  @media(--mobile-medium) {
    font-size: min(24px, 5vh);
  }
  
}

.welcome-buttons{
  width: 100%;
  margin-top: auto;
  margin-bottom: 8%;
  gap: 1.2vh;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media(--tablet-width){
    margin-top: 9%;
    gap: clamp(7px, 0.2vw, 40px);
  }

  @media(--mobile-medium){
    margin: auto;
  }
}

.desktop{
  display: flex;

  @media(--tablet-width){
    display: none;
  }
}

.mobile{
  display: none;

  @media(--tablet-width){
    display: flex;
  }
}

.diagrams {
  width: 35%;
  height: 100%;
  color: white;
  background-color: var(--strategix-accent);
  opacity: 0.05;

  display: none;

  @media(--tablet-width){
    width: 50%;
    display: flex;
  }

  @media(--laptop-width){
    width: 50%;
  }
}
</style>