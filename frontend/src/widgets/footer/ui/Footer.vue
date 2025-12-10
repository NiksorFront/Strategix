<script setup lang="ts">
import xWhite from "@/assets/images/x-white.svg";
import telegramIcon from "@/assets/images/telegram-icon.svg";
import linkedinIcon from "@/assets/images/linkedin-icon.svg";
import index from '@/content/pages/index.json'

const { locale } = useI18n()
const currentLocale = locale.value || 'ru'
const translations = index.translations[currentLocale as keyof typeof index.translations] || index.translations.ru

const brand = translations.footer.brand
const rights = translations.footer.rights
const privacyPolicy = translations.footer.privacy_policy
const email = translations.footer.email
const icon1 = translations.footer.icon1
const icon2 = translations.footer.icon2
</script>

<template>
  <footer class="footer">
    <div class="footer__left">
      <NuxtImg
        :src="xWhite"
        class="logo"
      />

      <div class="info">
        <div class="base-text brand">
          {{ brand }}
        </div>
        <div class="base-text rights">
          {{ rights }}
        </div>
      </div>

      <a
        :href="privacyPolicy.href"
        class="base-text policy hover"
      >
        {{ privacyPolicy.text }}
      </a>
    </div>

    <div class="footer__right">
      <a
        :href="`mailto:${email}`"
        class="base-text email hover"
      >
        {{ email }}
      </a>

      <a
        :href="icon1.href"
        class="icon"
        target="_blank"
        rel="noopener"
      >
        <NuxtImg
          :src="telegramIcon"
          alt="telegram icon"
          class="telegram"
        />
      </a>

      <a
        :href="icon2.href"
        class="icon"
        target="_blank"
        rel="noopener"
      >
        <NuxtImg
          :src="linkedinIcon"
          alt="linkedin icon"
          class="linkedin"
        />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100vw;
  height: 10vh;
  padding: 0 var(--padding-section-x);
  box-sizing: border-box;
  background-color: var(--strategix-dark);

  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

/* Левая часть */
.footer__left {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media(--tablet-width){
    width: 55%;
  }

  @media(--laptop-width){
     width: clamp(350px, 45%, 1070px);
  }
}

.logo {
  width: 6.5%;
  height: auto;
  aspect-ratio: 7 / 6;

  @media(--mobile-medium){
    width: auto;
    height: 5vh;
  }
}

.info {
  display: flex;
  flex-direction: column;
}

.brand {
  font-size: min(10px, 2.4vw);
  font-weight: 400;
  line-height: 120%;
  text-align: left;
  text-transform: uppercase;

  @media(--tablet-width){
    font-size: clamp(10px, 0.675vw + 0.4vh, 26px);
  }

  @media(--mobile-medium){
    font-size: min(10px, 2.085vh);
  }
}

.rights {
  font-size: min(10px, 2.4vw);
  font-weight: 400;
  line-height: 120%;
  text-align: left;
  text-transform: uppercase;

  @media(--tablet-width){
    font-size: clamp(10px, 0.675vw + 0.4vh, 26px);
  }

  @media(--mobile-medium){
    font-size: min(10px, 2.085vh);
  }
}

/* Политика */
.policy {
  text-decoration: none;
  color: white;

  font-size: min(10px, 2.4vw);
  font-weight: 400;
  line-height: 120%;
  text-align: left;
  white-space: pre-line;
  text-transform: uppercase;

  @media(--tablet-width){
    font-size: clamp(10px, 0.675vw + 0.4vh, 26px);
  }

  @media(--mobile-medium){
    font-size: min(10px, 2.085vh);
  }
}

/* Правая часть */
.footer__right {
  display: none;
  align-items: center;
  justify-content: space-between;
  
  @media(--tablet-width){
    display: flex;
    width: 35%;
  }

  @media(--laptop-width){
    width: clamp(265px, 22.44%, 530px);
  }
}

.email {
  font-size: clamp(16px, 0.835vw + 0.5vh , 32px);
  font-weight: 400;
  text-decoration: none;
  color: white;
  margin:0 3% 0 0;

  @media(--mobile-medium){
    font-size: min(16px, 3.334vh);
  }
}


.icon{
  width: 9%;
  height: auto;
  aspect-ratio: 1 / 1;
  border: 1px solid white;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s;

  @media(--mobile-medium){
    width: auto;
    height: 4vh;
  }
}

.icon:hover{
  cursor: pointer;
  opacity: 0.8;
}

.telegram{
  width: auto;
  height: 50%;
  aspect-ratio: 1 / 1;
  margin-right: 5%;
}

.linkedin{
  width: auto;
  height: 65%;
  aspect-ratio: 1 / 1;
  margin-bottom: 10%;
}
</style>
