<script setup lang="ts">
const route = useRoute()

const project = computed(() => route.params.project as string)
</script>

<template>
  <p class="small-text">
    Страница проекта {{ project }}
  </p>
</template>