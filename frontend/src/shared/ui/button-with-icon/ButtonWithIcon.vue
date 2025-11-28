<script setup lang="ts">
  const { srcIcon, styleButton } = defineProps<{
    srcIcon: string,
    styleButton: 'white' | 'green',
  }>();
</script>

<template>
  <button
    class="base-text button"
    :class="styleButton === 'green' ? 'green' : styleButton === 'white' && 'white'"
  >
    <slot />&nbsp;&nbsp;
    <span class="icon">
      <NuxtImg
        :src="srcIcon"
        alt="icon"
      />
    </span>
  </button>
</template>

<style scoped>
.button {
  width: 100%;
  height: fit-content;
  
  padding: 2vh 9% 2vh 0;

  font-size: min(20px, 5.5vw);
  align-items: center;

  font-weight: 400;         
  line-height: 110%;         
  letter-spacing: 0;
  text-wrap: nowrap;

  justify-content: center; 

  background: transparent;
  border-width: 2px !important;
  border-radius: 50px;     

  color: white;
  cursor: pointer;
  position: relative;

  @media(--tablet-width){
      width: fit-content;
      height: fit-content;

      font-size: clamp(12px, 1.05vw, 25px);
      border-width: 1px !important;
      padding: clamp(10px, 1vw, 24px) clamp(28px, 2.75vw, 65px) clamp(10px, 1vw, 24px) clamp(11px, 1.2vw, 28px);
    }
  
  @media(--big-laptop-width){
      border-width: 2px !important;
  }

  @media(--mobile-medium) {

      border-width: 1px !important;
      font-size: min(12px, 3vh);

      padding: 2vh 6vh 2vh 2vh;
    }
}

/* Круг с стрелкой — второй span */
.icon{
  width: auto;
  height: 94%;
  aspect-ratio: 1 / 1;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 3%;
  right: 0.5%;

  border-radius: 50%;
}

.green{
  border: solid var(--strategix-accent);  /* Accent из макета */
}

.green .icon{
  background-color: var(--strategix-accent);    /* заливка круга */
}

.white{
  border: solid var(--background-dark);  /* Accent из макета */
}

.white .icon img{
  width: auto;
  height: 80%;
  aspect-ratio: 1 / 1;
}

.icon img{
  width: auto;
  height: 40%;
  aspect-ratio: 1 / 1;
}

</style>