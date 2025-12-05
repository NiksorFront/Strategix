<script setup lang="ts">
  import ButtonWithIcon from "@/shared/ui/button-with-icon"
  import strategixLogo from "@/assets/images/strategix-white.svg";
  import LangSwitcher from './LangSwitcher.vue'
  import Navigation from "./Navigation.vue";
  import NavigationMenu from "./NavigationMenu.vue";

  const navData = {
    links: [
      { href: '#header', label: 'Главная' },
      { href: '#about-us', label: 'О нас' },
      { href: '#contacts', label: 'Контакты' },
      { href: '#our-projects', label: 'Проекты' },
      { href: '#market-response', label: 'Команда' }
    ]
  }
  const navData2 = {
    links: [
      { href: '#about-us', label: 'О нас' },
      {href: '#services', label: 'Услуги' },
      { href: '#our-projects', label: 'Проекты' },
      { href: '#contacts', label: 'Контакты' },
    ]
  }
</script>

<template>
  <header
    id="header"
    class="header"
  >
    <NuxtImg
      class="strategix-logo"
      :src="strategixLogo"
      alt="strategix logo"
    />
    
    <span class="space" />

    <Navigation :nav-data="navData" /> <!-- планшет - пк -->

    <LangSwitcher />

    <ButtonWithIcon
      class="fill-form-button"
      style-button="green"
      href="#contacts"
    >
      ЗАПОЛНИТЕ АНКЕТУ
    </ButtonWithIcon>

    <NavigationMenu :nav-data="navData2" /> <!-- мобилка -->
  </header>
</template>

<style scoped>
  .header {
    width: 100vw;
    max-height: 10vh;
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
    width: 0;

    @media(--tablet-width){
      display: block;
      width: 0.5vw;
    }

    @media(--laptop-width){
      display: block;
      width: 2.5vw;
    }
  }

  .fill-form-button{
    display: none;

    padding: max(0.5%, 10px) max(2.25%, 28px) max(0.5%, 10px) max(1%, 10px); 
    font-size: min(9px, 0.7vw + 1vh);  
    
    @media(--tablet-width){
      display: flex;
      font-size: clamp(9px, 0.45vw + 0.45vh, 20px);
      margin-left: clamp(0px, 175px - 15vw, 25px); /*margin уменьшаеьтся по мере увеличения ширины*/
    }

    @media(--mobile-medium){
      font-size: min(9px, 0.7vw + 1vh);   
      padding: min(0.5%, 10px) min(2.25%, 28px) min(0.5%, 10px) min(1%, 10px);     
    }
  }
</style>  