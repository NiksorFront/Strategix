<script setup lang="ts">
const {peopleImg, name, lastname, position} = defineProps<{peopleImg: string, name: string, lastname: string, position: string}>()
</script>

<template>
  <NuxtImg
    class="member-card"
    :src="peopleImg"
  >
    <div class="text-background">
      <h4 class="name">
        {{ name }}{{ lastname }}
      </h4>
      <p class="position">
        {{ position }}
      </p>
    </div>
  </NuxtImg>
</template>

<style scoped>
.member-card{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--card-radius);
}

.text-background{
    
}

.name{

}
.position{

}
</style>
