<script setup lang="ts">
import { computed } from 'vue';
import type { AboutServiceForModal } from "../model/config";

const props = defineProps<{ aboutService: AboutServiceForModal, gridArea: string }>();

const {title, Decor, lead, bullets, text} = props.aboutService

const formattedText = computed(() => {
  // preserve paragraph breaks from the source text
  return text
    .split('\n\n')
    .map(p => `<p>${p}</p>`)
    .join('');
});
</script>

<template>
  <div class="about-service">
    <div
      class="about-service-mobile"
      :class="props.gridArea"
    >
      <div class="service-decor">
        <component :is="Decor" />
      </div>
      <form
        method="dialog"
        class="icon-arrow"
      >
        <button
          type="submit"
          aria-label="Закрыть модальное окно"
        />
      </form>
      
      <h3 class="upperscase-text about-service-title">
        {{ props.aboutService.title }}
      </h3>
       
      <p class="base-text about-service-lead">
        {{ props.aboutService.lead }}
      </p>
      
      <ul class="about-service-bullets">
        <li
          v-for="(b, i) in props.aboutService.bullets"
          :key="i"
          class="bullet"
        >
          <!-- <span class="bullets__dot" /> -->
          <span class="small-text bullet-text">{{ b }}</span>
        </li>
      </ul>

      <div class="service-decor" />
    </div>
    <div class="about-service-pc">
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
.about-service {
  width: 100%;
  height: 100%;
  max-height: 86vh;
  box-sizing: border-box;
  display: flex;

  border-radius: var(--card-radius);
  overflow-y: scroll;
}

.about-service-mobile{
  width: 100%;
  height: 100%;
  padding: min(20px, 2.5vw + 1.2vh);
  box-sizing: border-box;

  position: relative;
  display: flex;
  flex-direction: column;
  gap: min(32px, 3.2vh);

  background: var(--strategix-accent);
  border-radius: var(--card-radius);

  overflow-y: scroll;
}

.service-decor{
  width: min(15vh, min(22.58%, 120px));
  height: auto;
  aspect-ratio: 1 / 1 ;
  margin: 0;

  transition: all 0.3s ease-in-out;
}

.icon-arrow{
  width: min(5vw, 20px);
  height: min(5vw, 20px);
  box-sizing: border-box;

  position: absolute;
  top: clamp(12px, 0.666vw + 1.5vh, 40px);
  right: clamp(12px, 0.666vw + 1.5vh, 40px);

  background: transparent;
  border: 1px solid white;
  border-top: 1px;
  border-right: 1px;

  z-index: 5;

  @media(--tablet-width){
    width: clamp(15px, 2.1vw, 50px);
    height: auto;
  }

  @media(--mobile-medium){
    width: min(4.1675vh, 20px);
    height: min(4.1675vh, 20px);
  }
}

.icon-arrow::after{
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.5px;

  /* длина линии чуть больше диагонали квадрата: √2 ≈ 1.414 */
  width: 141%;
  height: 1px;

  background-color: white;

  transform-origin: left bottom;
  transform: rotate(-45deg);
}

.icon-arrow button{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  /* новое — чтобы не было дефолтного вида кнопки */
  border: 0;
  background: transparent;
  cursor: pointer;
  outline: none;
}

.about-service-pc{
  width: 100%;
  display: none;
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


.about-service-title{
  margin: 0;

  text-align: left;
  font-size: min(32px, 8.2vw);
  color: white;

  @media(--tablet-width){
    font-size: clamp(32px, 8.2vw, 64px);
  }

  @media(--mobile-medium){
    font-size: min(28px, 5vh);
  }
}

.about-service-lead{
  margin: 0;
  padding: 0;

  font-size: min(18px, 4.65vw);
  text-align: left;
  line-height: 130%;
  color: white;

  @media(--tablet-width){
    font-size: clamp(18px, calc(1.1vw + 0.6vh), 42px);
  }

  @media(--mobile-medium) {
    font-size: min(18px, 3.75vh);
  }
}

.about-service__lead{
  text-align: left;
  color: rgba(255,255,255,0.95);
  font-weight: 500;
  font-size: clamp(12px, 2.9vw, 18px);
  line-height: 1.2;
}

.about-service-bullets{
  padding: 0;
  margin: 0;
  margin-left: min(4.4%, 15px);
  display: flex;
  flex-direction: column;
  gap: min(1.2vh, 12px);
  color: white;
}

.bullet{
  /* display: flex; */
  /* align-items: flex-start; */
  /* gap: 12px; */
}

.bullet-text{
  font-size: min(16px, 4.1vw);
  line-height: 130%;

  @media(--mobile-medium) {
    font-size: min(16px, 3.325vh);
  }
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

<style>
    .reputation .service-decor .reputation__decor .reputation__decor__column{
        animation: reputation-anim 4s infinite ease-in-out;
    }


    .media .service-decor .media__decor .media__decor__dot{
        background-color: var(--strategix-accent-light);
        animation: media-anim 4s infinite ease-in-out;
    }


    .branding .service-decor .branding__decor{
        animation: branding-anim 6s infinite linear;
    }
    .branding .service-decor .branding__decor .branding__decor__square{
        background-color: var(--strategix-accent-light);
    }


    .production .service-decor .production__decor .production__decor__quarter-circle{
        background-color: var(--strategix-accent);
        animation: production-anim 4s infinite linear;
    }


    .events .service-decor .events__decor .events__decor__quarter-square{
        background-color: var(--strategix-accent);
        animation: events-anim 4s infinite linear;
    }


    .ai-marketing .service-decor{
        transform: translateY(30%);
    }
    .ai-marketing .service-decor .ai-marketing__decor .ai-marketing__decor__dot{
        transform: scale(1);
        background-color: var(--strategix-accent);
        animation: ai-marketing-anim 4s infinite ease-in-out;
    }


    .ads .service-decor .ads__decor .ads__decor__circle{
        border-color: white;
    }

    .ads .service-decor .ads__decor .ads__decor__point{
        width: 20%;
        height: 20%;
        background-color: var(--strategix-accent-light);
    }

    .ads .service-decor .ads__decor .ads__decor__orbit{
        animation: ads-anim 4s infinite linear;
    }
</style>