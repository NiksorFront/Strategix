<script setup lang="ts">
  const {img, title, description} = defineProps<{img: string, title: string, description: string}>()
</script>

<template>
  <li class="project-card">
    <NuxtImg
      :src="img"
      class="img-card"
    />
    <h4 class="base-text title-card">
      {{ title }}
    </h4>
    <p class="small-text description-card">
      {{ description }}
    </p>
  </li>
</template>

<style scoped>
.project-card{
  min-width: 74.36vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  @media(--mobile-width){
    min-width: min(32.5%, 74.36vw);
  }

  @media(--mobile-medium){
    height: fit-content;
  }
  /* position: relative; */
}

.img-card{
  width: 100%;
  height: 68.5%;
  max-height: 45.5vh;

  object-fit: cover;
  border-radius: min(24px, 1vw + 2vh);

  @media(--tablet-width){
    max-height: 48.5vh;
  }

  @media(--mobile-medium){
    max-height: 40vh;
  }
}

.title-card{
  width: 70%;
  text-align: left;
  margin: min(7%, 3vh) 0 0 6%;

  color: white;
  text-transform: uppercase;
  font-size: clamp(23px, 2.334vw, 50px);
  font-weight: 500;

  @media(--mobile-medium){
    font-size: min(23px, 5vh)
  }
}

.description-card{
  width: 90%;
  margin: auto 0 min(12.5%, 5vh) 6%;

  color: white;
  text-align: left;
  line-height: 125%;

  @media(--laptop-width){
    width: 70%;
    margin: auto 0 min(7%, 3vh) 6%;
  }
}
</style>