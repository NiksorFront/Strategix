<script setup lang="ts">
  import ButtonWithIcon from "@/shared/ui/button-with-icon"
  import strategixLogo from "@/assets/images/strategix-white.svg";
  import LangSwitcher from './LangSwitcher.vue'
  import NavigationMenu from "./NavigationMenu.vue";
  import NavigationMenuMobile from "./NavigationMenuMobile.vue";
  import index from '@/content/pages/index.json'

  const { locale } = useI18n()
  const currentLocale = locale.value || 'ru'
  const translations = index.translations[currentLocale as keyof typeof index.translations] || index.translations.ru

  const navData = {
    links: translations.header.navigation_desktop.map(item => ({
      href: item.href,
      label: item.text
    }))
  }
  const navData2 = {
    links: translations.header.mobile_menu.navigation_mobile.map(item => ({
      href: item.href,
      label: item.text
    }))
  }
  const buttonText = translations.header.button.text
  const buttonHref = translations.header.button.href
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

    <NavigationMenu :nav-data="navData" /> <!-- планшет - пк -->

    <LangSwitcher />

    <ButtonWithIcon
      class="fill-form-button"
      style-button="green"
      :href="buttonHref"
    >
      {{ buttonText }}
    </ButtonWithIcon>

    <NavigationMenuMobile :nav-data="navData2" /> <!-- мобилка -->
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

    @media(--mobile-medium) {
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

    padding: max(0.7%, 10px) max(2%, 28px) max(0.5%, 9px) max(1%, 10px); 
    font-size: clamp(9px, 0.6vw + 0.25vh, 20px);
    margin-left: clamp(0px, 175px - 15vw, 25px); /*margin уменьшаеьтся по мере увеличения ширины*/
    
    @media(--tablet-width){
      display: flex;
    }


    @media(--mobile-medium){
      font-size: min(9px, 0.7vw + 1vh);   
      padding: min(0.5%, 10px) min(2.25%, 28px) min(0.5%, 10px) min(1%, 10px);     
    }
  }
</style>  