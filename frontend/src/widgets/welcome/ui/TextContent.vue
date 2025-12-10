<script setup lang="ts">
import ButtonWithIcon from '~/shared/ui/button-with-icon';
import index from '@/content/pages/index.json'

const props = defineProps<{ telegram: string; whatsapp: string }>();

const { locale } = useI18n()
const currentLocale = locale.value || 'ru'
const translations = index.translations[currentLocale as keyof typeof index.translations] || index.translations.ru

const title = translations.welcome.title
const subtitle = translations.welcome.subtitle
const button1Text = translations.welcome.button1.text
const button1Href = translations.welcome.button1.href
const button2Text = translations.welcome.button2.text
const button3Text = translations.welcome.button3.text
</script>

<template>
  <div class="text-content">
    <h1 class="upperscase-text title">
      {{ title }}
    </h1>
    <h2 class="base-text subtitle">
      {{ subtitle }}
    </h2>
    <div class="welcome-buttons">
      <ButtonWithIcon
        style-button="green"
        :href="button1Href"
      >
        {{ button1Text }}
      </ButtonWithIcon>
      <ButtonWithIcon
        class="desktop"
        style-button="green"
        :href="props.telegram"
        target="_blank"
      >
        {{ button2Text }}
      </ButtonWithIcon>
      <ButtonWithIcon
        class="desktop"
        style-button="green"
        :href="props.whatsapp"
        target="_blank"
      >
        {{ button3Text }}
      </ButtonWithIcon>
      <ButtonWithIcon
        class="mobile"
        :href="props.telegram"
        target="_blank"
      >
        {{ button2Text }}
      </ButtonWithIcon>
      <ButtonWithIcon
        class="mobile"
        :href="props.whatsapp"
        target="_blank"
      >
        {{ button3Text }}
      </ButtonWithIcon>
    </div>
  </div>
</template>

<style scoped>
.text-content{
  width: 100%;
  height: 100%;
  margin: 0;

  display: flex;
  flex-direction: column;
  z-index: 1;

  @media(--tablet-width){
    width: 65%;
    height: 100%;
  }

  @media(--laptop-width){
    width: 50%;
  }
}

.title{
  max-width: 100%;
  overflow: hidden;
  text-align: left;
  font-size: min(min(10vw, calc(var(--vh) * 4.5)), 42px);
  color: white;
  line-height: 120%;

  margin-top: var(--welcome-padding-top);
  margin-bottom: 0;

  @media(--mobile-width){
    margin-top: calc(var(--welcome-padding-top) + calc(var(--vh) * 10));
    font-size: clamp(min(min(4vw, calc(var(--vh) * 3)), 42px), calc(1.95vw + var(--vh) * 2.85), 100px);
  }

  @media (--mobile-width) and (max-aspect-ratio: 4/5){
      font-size: clamp(min(4vw, calc(var(--vh) * 3)), calc(1.325vw + var(--vh) * 2.2), 100px);
  }

  @media(--mobile-medium) {
    font-size: min(min(10vw, calc(var(--vh) * 5.5)), 42px);
  }
}

.subtitle{
  width: 100%;
  text-align: left;
  font-size: min(20px, 5.125vw);
  color: var(--strategix-accent);
  line-height: 120%;

  margin-top: 1.5%;
  margin-bottom: 0;

  @media(--tablet-width){
    width: 82%;
    font-size: clamp(20px, calc(1vw + var(--vh) * 1.25), 50px);
    margin-top: 3.5%;
  }

  

  @media(--mobile-medium) {
    font-size: min(14px, calc(var(--vh) * 3.75));
  }
  
}

.welcome-buttons{
  width: 100%;
  margin-top: auto;
  margin-bottom: var(--padding-section-x);
  gap: calc(var(--vh) * 1.2);

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media(--tablet-width){
    margin: auto 0 var(--welcome-padding-bottom);
    gap: clamp(7px, 0.2vw, 40px);
  }

  @media(--mobile-medium){
    padding-top: calc(var(--vh) * 5);
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
</style>
