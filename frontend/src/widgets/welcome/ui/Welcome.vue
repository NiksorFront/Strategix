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
          class="fill-form-button"
          src-icon="./images/line-md_arrow-up.svg"
          style-button="green"
        >
          ЗАПОЛНИТЕ АНКЕТУ
        </ButtonWithIcon>
        <ButtonWithIcon
          class="fill-form-button desktop"
          src-icon="./images/line-md_arrow-up.svg"
          style-button="green"
        >
          TELEGRAM
        </ButtonWithIcon>
        <ButtonWithIcon
          class="fill-form-button desktop"
          src-icon="./images/line-md_arrow-up.svg"
          style-button="green"
        >
          WHATSAPP
        </ButtonWithIcon>
        <ButtonWithIcon
          class="fill-form-button mobile"
          src-icon="./images/arrow-forward.svg"
          style-button="white"
        >
          TELEGRAM
        </ButtonWithIcon>
        <ButtonWithIcon
          class="fill-form-button mobile"
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
    width: calc(100vw - 2 * var(--padding-section-x));
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
  height: max-content;
  margin-top: auto;
  margin-bottom: 8%;

  display: flex;
  flex-wrap: wrap;

  @media(--tablet-width){
    height: 39px;
    margin-top: 6.5%;
  }

  @media(--big-laptop-width){
    height: 4%;
  }

  @media(--mobile-medium){
    margin: auto;
  }
}

.fill-form-button{
    width: 100%;
    height: min(60px, 8vh);

    padding: 0 9% 0 0;
    font-size: 20px;
    border-width: 2px;

    margin-top: 3%;

    @media(--tablet-width){
      width: max(185px, 26.25%);
      height: auto;
      aspect-ratio: 4.74 / 1;

      margin-right: 4%;
      font-size: max(12.5px, 0.85vw);
      border-width: 1px;
      padding: max(0.5%, 10px) max(2.25%, 28px) max(0.5%, 10px) max(1%, 10px);
      margin-top: 0;
    }

    @media(--mobile-medium) {
      width: auto;
      height: min(60px, 8vh);

      border-width: 1px;
      font-size: min(12.5px, 3.5vh);

      padding: min(0.5%, 10px) min(6%, 28px) min(0.5%, 10px) min(2.5%, 10px);
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
    width: max(100px, 14%);
    padding: 0 6% 0 0;
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
    width: 35%;
    display: flex;
  }

  @media(--laptop-width){
    width: 50%;
  }
}
</style>