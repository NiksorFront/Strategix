<script setup lang="ts">
import { computed } from 'vue';
import type { AboutServiceForModal } from "../model/config";

const props = defineProps<{ aboutService: AboutServiceForModal }>();

const formattedText = computed(() => {
  // preserve paragraph breaks from the source text
  return props.aboutService.text
    .split('\n\n')
    .map(p => `<p>${p}</p>`)
    .join('');
});
</script>

<template>
  <div class="about-service">
    <div class="about-service__inner">
      <aside class="about-service__card">
        <div class="about-service__card-top">
          <form method="dialog">
            <button
              type="submit"
              class="about-service__corner"
              aria-label="Закрыть модальное окно"
            />
          </form>
        </div>

        <h3 class="base-text about-service__title">
          {{ props.aboutService.title }}
        </h3>

        <p class="small-text about-service__lead">
          {{ props.aboutService.lead }}
        </p>

        <ul class="about-service__bullets">
          <li
            v-for="(b, i) in props.aboutService.bullets"
            :key="i"
          >
            <span class="about-service__dot" />
            <span class="about-service__bullet-text">{{ b }}</span>
          </li>
        </ul>
      </aside>

      <div class="about-service__content">
        <p class="about-service__content-lead">
          {{ props.aboutService.lead }}
        </p>

        <div
          class="about-service__text"
          v-html="formattedText"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {}

.about-service {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
}

.about-service__inner{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vw, 28px);
  height: 100%;
}

/* Left green card */
.about-service__card{
  background: var(--strategix-accent);
  border-radius: var(--card-radius);
  padding: clamp(18px, 2.2vh, 32px);
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.2vh, 18px);
}

.about-service__card-top{
  display: flex;
  justify-content: flex-end;
}

.about-service__corner{
  width: clamp(22px, 2.6vw, 34px);
  height: clamp(22px, 2.6vw, 34px);
  border: 2px solid rgba(255,255,255,0.95);
  transform: rotate(45deg);
  border-radius: 4px;
  opacity: 0.95;

  /* новое — чтобы не было дефолтного вида кнопки */
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: inline-block;
}

.about-service__title{
  text-align: left;
  text-transform: uppercase;
  font-size: clamp(20px, 4.5vw, 36px);
}

.about-service__lead{
  text-align: left;
  color: rgba(255,255,255,0.95);
  font-weight: 500;
  font-size: clamp(12px, 2.9vw, 18px);
  line-height: 1.2;
}

.about-service__bullets{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.1vh, 12px);
}

.about-service__bullets li{
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.about-service__dot{
  width: 10px;
  height: 10px;
  min-width: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.95);
  margin-top: 6px;
}

.about-service__bullet-text{
  color: rgba(255,255,255,0.95);
  font-weight: 500;
  text-align: left;
  font-size: clamp(12px, 2.6vw, 16px);
}

/* Right white content for desktop */
.about-service__content{
  background: white;
  border-radius: var(--card-radius);
  padding: clamp(18px, 2.2vh, 36px);
  box-sizing: border-box;
  margin-top: 0;
  color: var(--strategix-dark);
}

.about-service__content-title{
  text-align: left;
  color: var(--strategix-accent);
  font-size: clamp(18px, 3.5vw, 32px);
}

.about-service__content-lead{
  color: var(--strategix-accent);
  font-weight: 700;
  font-size: clamp(14px, 2.6vw, 22px);
  margin-top: 6px;
  margin-bottom: 12px;
}

.about-service__text{
  color: var(--strategix-dark);
  font-size: clamp(12px, 1.6vw, 16px);
  line-height: 1.45;
}

/* Mobile first: single column with green card full width, white content below (as in mobile mockup) */
.about-service__card{
  width: 100%;
}

.about-service__content{
  width: 100%;
}

@media(--tablet-width){
  .about-service__inner{
    flex-direction: row;
    align-items: stretch;
    gap: clamp(24px, 2.2vw, 40px);
  }

  .about-service__card{
    width: 40%;
    min-width: 360px;
    padding: clamp(28px, 3.5vh, 48px);
    display: flex;
    justify-content: flex-start;
  }

  .about-service__content{
    width: 60%;
    padding: clamp(28px, 3.5vh, 48px);
  }

  .about-service__title{
    font-size: clamp(28px, 2.4vw, 44px);
  }

  .about-service__content-title{
    font-size: clamp(28px, 2.4vw, 44px);
  }
}

</style>