<script setup lang="ts">
import plusIconUrl from "@/assets/images/plus-icon.svg";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: false, default: '' },
  content: { type: String, required: false, default: '' },
});
</script>

<template>
  <details class="about-item">
    <summary class="about-summary">
      <span class="base-text about-title">{{ title }}</span>
      <span
        class="base-text about-subtitle"
        aria-hidden="true"
      >{{ subtitle }}</span>
      <span
        class="about-icon"
        aria-hidden="true"
      >
        <NuxtImg :src="plusIconUrl" />
      </span>
    </summary>

    <p class="base-text about-answer">
      <span class="base-text about-subtitle-2">{{ subtitle }}</span><br>
      {{ content }}
    </p>
  </details>
</template>

<style scoped>
.about-item {
  border-top: clamp(1px, 0.125vw, 4px) solid var(--strategix-dark);
  padding: min(23px, calc(var(--vh) * 2.5)) 0;

  @media(--tablet-width){
    padding: 20.5px 0;
  }

  @media(--big-laptop-width){
    padding: clamp(23px, calc(var(--vh) * 3), 50px) 0;
  }

  @media(--mobile-medium){
    padding: min(23px, calc(var(--vh) * 2.5)) 0;
    border-top: 1px solid var(--strategix-dark);
  }
}

.about-item:last-child {
  border-bottom: clamp(1px, 0.125vw, 4px) solid var(--strategix-dark);

  @media(--mobile-medium){
    border-bottom: 1px solid var(--strategix-dark);
  }
}

.about-summary {
  display: flex;
  transition: transform 0.5s ease;
  align-items: center;
  cursor: pointer;
  list-style: none;
}

.about-summary::-webkit-details-marker {
  display: none;
}

.about-title {
  width: 70vw;
  text-align: left;
  font-weight: 600;
  font-size: clamp(28px, 2.4vw, 56px);
   

  @media(--tablet-width){
    width: 30vw;
  }

  @media(--mobile-medium){
    font-size: min(28px, calc(var(--vh) * 5));
  }
}

.about-subtitle {
  width: 70vw;
  font-weight: 700;
  text-align: left;
  font-size: clamp(20px, 1.65vw, 40px);
  display: none;

  @media(--mobile-medium){
    font-size: min(20px, calc(var(--vh) * 3.6));
  }

  @media(--tablet-width){
    width: 55vw;
    display: block;
  }
 
}

.about-subtitle-2 {
  width: 90%;
  font-weight: 700;
  text-align: left;
  font-size: min(23px, 10vw);
  display: block;

  @media(--mobile-medium){
    font-size: min(23px, calc(var(--vh) * 4));
  }

  @media(--tablet-width){
    width: 55vw;
    display: none;
  }
 
}

.about-answer {
  width: 98%;
  max-height: 500px;
  font-size: clamp(16px, 1.2vw, 32px);
  text-align: left;
  font-weight: 300;

  /* анимация раскрытия */
  overflow: hidden;
  opacity: 0;
  margin-top: 0;

  transition:
    max-height 0.4s ease,
    opacity 0.3s ease,
    margin-top 0.4s ease;

  @media (--mobile-medium) {
    font-size: min(16px, calc(var(--vh) * 2.8));
  }

  @media (--tablet-width) {
    margin-left: min(30vw, 875px);
    width: min(55vw, 1600px);
    display: block;
  }
}

details[open] .about-answer {
  opacity: 1;
  margin-top: min(13px, calc(var(--vh) * 1.5));

  @media (--tablet-width) {
    margin-top: min(33px, calc(var(--vh) * 3.3));
  }
}


.about-icon {
  width: auto;
  height: min(40px, calc(var(--vh) * 6));
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;
  margin-left: auto;
  background-color: white;
  border-radius: 50%;

  @media(--big-laptop-width){
    height: clamp(40px, calc(var(--vh) * 6), 80px);
  }

  @media (--mobile-medium) {
    height: min(40px, calc(var(--vh) * 6));
  }
}

.about-icon img{
  width: 50%;
  height: 50%;
}

details[open] .about-icon {
  transform: rotate(45deg);
  background-color: var(--strategix-accent);
}

details[open] .about-icon img {
  filter: invert(1);
}

</style>
