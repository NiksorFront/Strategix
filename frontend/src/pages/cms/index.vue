<script setup lang="ts">
  import HeaderCMS from '@/widgets/header-cms';
  import ProjectsCMS from '@/widgets/projects-cms';
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-6">
      <HeaderCMS>Content Management System</HeaderCMS>
      <main class="cms-layout">
        <ProjectsCMS />
      </main>
    </div>
  </div>
</template>

<style scoped>
  .cms-layout {
    width: 100%;
    min-height: 70vh;
    height: fit-content;
    display: grid;
    grid-template-columns: 42% 5% 26.5% 26.5%;
    grid-template-rows: 50% 50%;
  }
</style>
