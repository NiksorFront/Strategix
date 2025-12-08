<script setup lang="ts">
const { id } = defineProps<{ id: string }>();
</script>

<template>
  <dialog
    :id="id"
    class="modal"
    closedby="any"
  >
    <slot />
  </dialog>
</template>


<style>
  /* Блокировка скролла, когда модалка открыта */
  body:has(dialog.modal[open]) {
    overflow: hidden;
  }
</style>

<style scoped>
.modal {
  width: calc(100vw - 2 * var(--padding-section-x));
  height: 86vh;
  margin: calc(clamp(18px, 2vw, 48px) + min(40px, 4vh)) var(--padding-section-x) 10vh; /*Рассчет идет исходя из margin-bottom IndexSectionTitle.vue и padding-bottom у Services.vue */
  box-sizing: border-box;

  /* убираем чёрную стандартную рамку/фон */
  border: none;
  outline: none;
  padding: 0;
  background: transparent;

  /* стартовое состояние — "невидим снизу" */
  filter: blur(2px);
  transform: scale(0.98);

  @media(--tablet-width){
    height: calc(100vh - (clamp(14px, 2.25vw, 52px) + clamp(40px, 5vh, 80px)) - 10vh);
    margin: calc(clamp(14px, 2.25vw, 52px) + clamp(40px, 5vh, 80px)) var(--padding-section-x) 10vh;
  }

  @media(--mobile-medium){
    height: calc(100vh - clamp(40px, 5vh, 80px) - 10vh);
    margin: clamp(40px, 5vh, 80px) var(--padding-section-x) 10vh;
  }
}

/* когда диалог открыт — запускаем анимацию*/
.modal[open] {
  animation: modal-fly-in 0.3s ease-in-out forwards;
}

.modal::backdrop {
  background: rgba(0, 0, 0, 0.6);
}

/* анимация "влёта" */
@keyframes modal-fly-in {
  0% {
    filter: blur(2px);
    transform: scale(0.98);
  }

  100% {
    filter: blur(0);
    transform: scale(1);
  }
}
</style>
