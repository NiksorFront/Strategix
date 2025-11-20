<script setup lang="ts">
  const {srcIcon, styleButton} = defineProps<{srcIcon: string, styleButton: 'white' | 'green'}>()
</script>

<template>
  <button class="base-text button" :class="styleButton === 'green' ? 'green' : styleButton === 'white' && 'white'">
    <slot />
    <span class="icon" >
      <NuxtImg
        :src="srcIcon"
        alt="icon"
      />
    </span>
  </button>
</template>

<style scoped>
.button {
  align-items: center;

  font-weight: 400;         
  line-height: 110%;         
  letter-spacing: 0;
  text-wrap: nowrap;

  justify-content: center; 

  background: transparent;
  border-radius: 50px;      
  color: white;

  cursor: pointer;

  position: relative;
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
  right: 1px;

  border-radius: 50%;
}

.green{
  border: solid var(--strategix-accent);  /* Accent из макета */
}

.green .icon{
    background-color: var(--strategix-accent);    /* заливка круга */
}

.white{
  border: 1px solid var(--background-dark);  /* Accent из макета */
}

.white .icon img{
  width: 85%;
  height: 85%;
}

.icon img{
  width: 40%;
  height: 40%;
}

</style>