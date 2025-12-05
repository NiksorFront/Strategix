<script setup lang="ts">
  import ButtonWithIcon from '~/shared/ui/button-with-icon';
</script>

<template>
  <section
    id="welcome"
    class="welcome"
  >
    <div class="text-content">
      <h1 class="upperscase-text title">
        МЫ&nbsp;СТРОИМ РЕПУТАЦИЮ И&nbsp;ОТКРЫВАЕМ ДВЕРИ&nbsp;НА МЕЖДУНАРОДНЫЕ РЫНКИ
      </h1>
      <h2 class="base-text subtitle">
        Международное позиционирование через медиа, ивенты и&nbsp;доверие профессионального сообщества.
      </h2>
      <div class="welcome-buttons">
        <ButtonWithIcon
          style-button="green"
        >
          ЗАПОЛНИТЕ АНКЕТУ
        </ButtonWithIcon>
        <ButtonWithIcon
          class="desktop"
        >
          TELEGRAM
        </ButtonWithIcon>
        <ButtonWithIcon
          class="desktop"
        >
          WHATSAPP
        </ButtonWithIcon>
        <ButtonWithIcon
          class="mobile"
        >
          TELEGRAM
        </ButtonWithIcon>
        <ButtonWithIcon
          class="mobile"
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
    width: 100vw;
    height: 90vh;
    padding-inline: var(--padding-section-x);
    box-sizing: border-box;

    background-color: var(--strategix-dark);

    display: flex;
    flex-direction: row;
}

.text-content{
  width: 100%;
  height: 100%;
  margin: 0;

  display: flex;
  flex-direction: column;
  z-index: 1;

  @media(--tablet-width){
    width: 65%;
    height: fit-content;
    margin: 10vh 0 auto;
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
    font-size: min(min(10vw, 5.5vh), 42px);
  }
}

.subtitle{
  width: 100%;
  text-align: left;
  font-size: min(20px, 2.3vw);
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
    font-size: min(14px, 3.75vh);
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
    margin-top: 5vh;
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