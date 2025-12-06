<script setup lang="ts">
  const {src, title, description} = defineProps<{src: string, title: string, description: string}>()
</script>

<template>
  <li class="project-card">
    <NuxtImg
      :src="src"
      class="img-card"
      sizes="(max-width: 600px) 74.36vw, (max-width: 1024px) 50vw, 33vw"
      format="webp"
      :quality="80"
      :alt="title"
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
  box-sizing: border-box;
  border-radius: var(--card-radius);

  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  transition: all 0.3s;
  
  @media(--mobile-width){
    min-width: min(32.5%, 74.36vw);
  }

  @media(--mobile-medium){
    /* height: fit-content; */
  }

}

.img-card{
  width: 100%;
  height: 68.5%;
  max-height: 45.5vh;

  object-fit: cover;
  border-radius: var(--card-radius);

  @media(--tablet-width){
    max-height: 48.6vh;
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
  font-size: clamp(23px, calc(1.25vw + 1.5vh), 50px);
  font-weight: 500;

  transition: all 0.3s;

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

  transition: all 0.3s;

  @media(--laptop-width){
    width: 70%;
    margin: auto 0 min(7%, 3vh) 6%;
  }
}

.project-card:hover{
  margin-top: 1vh;
  height: calc(100% - 1.5vh);
  border: clamp(2px, 0.175vw, 6px) solid var(--strategix-accent);
  cursor: pointer;
}

.project-card:hover .img-card{
  height: calc(68.5% + 0.5vh);
}

.project-card:hover .title-card{
  /* margin: min(8.5%, 3.75vh) 0 0 6%; */
  font-weight: 700;
}

.project-card:hover .description-card{
  margin: auto 0 min(5%, 2.25vh) 6%;
}
</style>