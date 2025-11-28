<script setup lang="ts">
  import ButtonWithIcon from "@/shared/ui/button-with-icon"
</script>

<template>
  <header>
    <NuxtImg
      class="strategix-logo"
      src="/images/strategix-white.svg"
      alt="strategix logo"
    />

    <nav class="navigation">
      <ul>
        <li>
          <NuxtLink class="small-text">
            Главная
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="small-text">
            О нас
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="small-text">
            Контакты
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="small-text">
            Проекты
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="small-text">
            Команда
          </NuxtLink>
        </li>
      </ul>
    </nav>
  
    <ul class="lang-switcher">
      <li class="active">
        <NuxtLink
          class="small-text lang"
          href="#"
        >
          Rus
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="small-text lang"
          href="#"
        >
          Eng
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="small-text lang"
          href="#"
        >
          Der
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="small-text lang"
          href="#"
        >
          Esp
        </NuxtLink>
      </li>
    </ul>

    <ButtonWithIcon
      class="fill-form-button"
      src-icon="./images/line-md_arrow-up.svg"
      style-button="green"
    >
      ЗАПОЛНИТЕ АНКЕТУ
    </ButtonWithIcon>
  </header>
</template>

<style scoped>
  header {
    width: var(--section-width);
    height: min(35px, 4.2vh);

    padding: 5.4vh var(--padding-section-x);
    background-color: var(--background-dark);

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    @media (--tablet-width) {
      padding-top: 3.2vh;
      height: 31px;
    }
  }

  .strategix-logo{
    width: min(172px, 44.1%);
    height: auto;
    aspect-ratio: 4.77 / 1;

    @media(--tablet-width) {
      width: max(121px, 11%);
    }

    @media(--mobile-small) {
      width: auto;
      height: 100%;
    }
  }

  .navigation{
    width: fit-content;

  }

  .navigation ul{
    list-style: none;
    display: none;

    @media(--tablet-width) {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;

      width: 100%;
    }

    @media(--laptop-width) {
      width: auto;
      gap: 10.3%;
    }
  }

  .navigation ul li{
    text-decoration: none;
    color: white;
    text-wrap: nowrap;
  }

  .lang-switcher{
    list-style: none;

    display: none;
    @media(--laptop-width) {
      display: flex;
    }
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    gap: 28%;
    padding: 0 0 0 9%;
  }

  .lang{
    text-decoration: none;
    color: white;
  }

  .fill-form-button{
    display: none;

    padding: max(0.5%, 10px) max(2.25%, 28px) max(0.5%, 10px) max(1%, 10px); 
    font-size: 10px;    
    
    @media(--tablet-width){
      display: flex;
      font-size: clamp(9px, 0.45vw + 0.45vh, 20px);
    }

    @media(--mobile-medium){
      padding: min(0.5%, 10px) min(2.25%, 28px) min(0.5%, 10px) min(1%, 10px);     
    }
  }
</style>  