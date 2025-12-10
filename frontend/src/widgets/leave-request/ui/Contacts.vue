<script setup lang="ts">
import telegramIcon from "@/assets/images/telegram-icon.svg";
import whatsappIcon from "@/assets/images/whatsapp-icon.svg";
import index from '@/content/pages/index.json'

const { locale } = useI18n()
const currentLocale = locale.value || 'ru'
const translations = index.translations[currentLocale as keyof typeof index.translations] || index.translations.ru

const title = translations.leave_request.contacts.title
const email = translations.leave_request.contacts.email
const phone = translations.leave_request.contacts.phone.replace(/\s/g, '') // убираем пробелы для tel:
const telegram = translations.leave_request.contacts.telegram
const whatsapp = translations.leave_request.contacts.whatsapp
</script>

<template>
  <div
    id="contacts"
    class="contacts"
  > 
    <h3 class="title">
      {{ title }}
    </h3>

    <div class="lr-contacts">
      <!-- Email -->
      <a
        class="contact-link email"
        :href="`mailto:${email}`"
      >
        <span class="base-text contact-text hover">{{ email }}</span>
      </a>

      <!-- Phone -->
      <a
        class="base-text contact-link contact-text hover"
        :href="`tel:${phone}`"
      >
        {{ translations.leave_request.contacts.phone }}
      </a>

      <!-- Telegram -->
      <a
        class="contact-link"
        :href="telegram.href"
        target="_blank"
        rel="noopener"
      >
        <NuxtImg
          class="contact-icon"
          :src="telegramIcon"
          alt="Telegram"
        />
        <span class="base-text contact-text hover">{{ telegram.text }}</span>
      </a>

      <!-- WhatsApp -->
      <a
        class="contact-link whatsapp"
        :href="whatsapp.href"
        target="_blank"
        rel="noopener"
      >
        <NuxtImg
          class="contact-icon"
          :src="whatsappIcon"
          alt="WhatsApp"
        />
        <span class="base-text contact-text hover">{{ whatsapp.text }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.contacts {
  width: 100%;
  height: 24%;
  background-color: var(--strategix-dark);

  @media (--tablet-width) {
    width: 50%;
    height: 100%;
  }
}

.lr-contacts {
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 4vh 4vh;

  @media (--tablet-width) {
    width: 93%;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
}

.title {
  margin: 3.75vh 0 1.25vh;

  font-family: "Liberty-MT", "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  text-align: left;
  color: white;
  font-size: min(28px, 4.2vw + 1.5vh);
  line-height: 110%;
  font-weight: 400;

  @media (--tablet-width) {
    width: 90%;
    font-size: clamp(28px, calc(2vw + 1.5vh), 72px);
    margin: 5.75vh 0;
  }

  @media(--mobile-medium){
    font-size: min(28px, 6vh);
  }
}

.contact-link {
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  width: min(7.5%, 14px);
  height: auto;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
}

.email-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 50%;
  border: 1px solid white;
  border-radius: 50%;
}

.contact-text {
  font-size: min(16px, 4.1vw);
  font-weight: 400;
  line-height: 115%;
  text-wrap: nowrap;

  @media (--tablet-width) {
    font-size: clamp(16px, calc(0.8vw + 0.6vh), 36px);
  }

  @media (--mobile-medium) {
    font-size: min(14px, 2.71vh);
  }
}

.whatsapp{
  display: flex;

  @media (--tablet-width) {
    display: none;
  }
}

</style>