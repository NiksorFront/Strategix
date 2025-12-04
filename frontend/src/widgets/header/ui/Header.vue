<script setup lang="ts">
  import ButtonWithIcon from "@/shared/ui/button-with-icon"
  import strategixLogo from "@/assets/images/strategix-white.svg";
  import lineMdArrowUp from '@/assets/images/line-md_arrow-up.svg';
  import LangSwitcher from './LangSwitcher.vue'
</script>

<template>
  <header class="header">
    <NuxtImg
      class="strategix-logo"
      :src="strategixLogo"
      alt="strategix logo"
    />
    
    <span class="space" />

    <nav class="navigation">
      <ul>
        <li>
          <NuxtLink class="small-text hover">
            Главная
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="small-text hover">
            О нас
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="small-text hover">
            Контакты
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="small-text hover">
            Проекты
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="small-text hover">
            Команда
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <LangSwitcher />

    <ButtonWithIcon
      class="fill-form-button"
      :src-icon="lineMdArrowUp"
      style-button="green"
    >
      ЗАПОЛНИТЕ АНКЕТУ
    </ButtonWithIcon>
  </header>
</template>

<style scoped>
  .header {
    width: 100vw;
    min-height: 10vh;
    padding: 6.75vh var(--padding-section-x) 0;
    box-sizing: border-box;

    background-color: var(--strategix-dark);

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    position: relative;
    z-index: 5;
  }

  .strategix-logo{
    width: min(172px, 44.1vw);
    height: auto;
    aspect-ratio: 4.77 / 1;

    @media(--tablet-width) {
      width: clamp(121px, 10.1vw, 245px);
    }

    @media(--mobile-small) {
      width: auto;
      height: 100%;
    }
  }

  .space{
    display: none;

    @media(--tablet-width){
      display: block;
      width: 0.5vw;
    }

    @media(--laptop-width){
      display: block;
      width: 2.5vw;
    }
  }

  .navigation{
    width: min(370px, 40vw);
    height: fit-content;

    @media(--laptop-width){
      width: clamp(370px, 31vw, 780px);
    }
  }

  .navigation ul{
    list-style: none;
    display: none;
    
    margin: 0;
    padding: 0;

    @media(--tablet-width) {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
    }
  }

  .navigation ul li{
    text-decoration: none;
    color: white;
    text-wrap: nowrap;
  }

  .fill-form-button{
    display: none;

    padding: max(0.5%, 10px) max(2.25%, 28px) max(0.5%, 10px) max(1%, 10px); 
    font-size: 10px;    
    
    @media(--tablet-width){
      display: flex;
      font-size: clamp(9px, 0.45vw + 0.45vh, 20px);
      margin-left: clamp(0px, 175px - 15vw, 25px); /*margin уменьшаеьтся по мере увеличения ширины*/
    }

    @media(--mobile-medium){
      padding: min(0.5%, 10px) min(2.25%, 28px) min(0.5%, 10px) min(1%, 10px);     
    }
  }
</style>  