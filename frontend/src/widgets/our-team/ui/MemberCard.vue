<script setup lang="ts">
const {src, name, lastname, position} = defineProps<{src: string, name: string, lastname: string, position: string}>()
</script>

<template>
  <article class="member-card">
    <NuxtImg
      class="image-card"
      :src="src"
      sizes="(max-width: 600px) 48vw, 25vw"
      format="webp"
      :quality="70"
      :alt="`${name} ${lastname}`"
    />
    <div class="text-background">
      <h4 class="small-text name">
        {{ name }} {{ lastname }}
      </h4>
      <p class="small-text position">
        {{ position }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.member-card{
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--card-radius);

    position: relative;
}

.image-card{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text-background{
    width: 85%;
    height: fit-content;
    /* height: 18%; */

    position: absolute;
    bottom: 16%;
    left: 50%;
    transform: translateX(-50%) translateY(50%);

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    border-radius: calc(var(--card-radius) / 2.5);
    background-color: white;
}

.name{
    margin: 2.5% 4% 0;

    font-size: clamp(10px, calc(0.9vw + 0.4vh), 30px);
    line-height: 110%;
    font-weight: 600;
    text-align: left;

    color: var(--strategix-dark);

    @media(--mobile-medium) {
      font-size: min(10px, 2.1vh);
    }
}

.position{
    margin: 0 4% 2.5%;

    font-size: clamp(10px, calc(0.9vw + 0.4vh), 30px);
    line-height: 110%;
    font-weight: 600;
    text-align: left;

    color: var(--strategix-gray);

    @media(--mobile-medium) {
      font-size: min(10px, 2.1vh);
    }
}

</style>
