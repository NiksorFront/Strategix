<script setup lang="ts">
  import HeaderCMS from '@/widgets/header-cms';

</script>

<template>
  <div class="min-h-screen text-foreground index">
    <div class="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-6">
      <HeaderCMS>Языки сайта</HeaderCMS>
      <!-- <main
        class="projects-shell"
      >
        <div class="projects-grid" />
      </main> -->
    </div>
  </div>
</template>

<style scoped>
  .projects-shell {
    width: 100%;
    min-height: 70vh;
    border: 2px solid color-mix(in srgb, var(--strategix-light) 50%, white 50%);
    background-color: hsl(var(--card));
    border-radius: var(--card-radius);
    padding: 16px;
    box-sizing: border-box;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(5, 19.6%);
    gap: 0.5%;
  }

  .project-card {
    border: 2px solid color-mix(in srgb, var(--strategix-light) 50%, white 50%);
    background-color: hsl(var(--card));
    border-radius: calc(var(--card-radius) / 2);
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease, transform 0.2s ease;
  }

  .project-title {
    font-weight: 600;
    color: var(--strategix-dark);
    margin: 0;
    text-transform: uppercase;
  }

  .project-body {
    padding: 12px 16px;
  }

  .project-media {
    width: 100%;
    height: auto;
    aspect-ratio: 8 / 10;
    border-radius: 0 0 calc(var(--card-radius) / 2) calc(var(--card-radius) / 2);
    overflow: hidden;
    border: 0;
    background: color-mix(in srgb, var(--strategix-light) 60%, white 40%);
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-placeholder {
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      color-mix(in srgb, var(--strategix-light) 60%, white 40%),
      color-mix(in srgb, var(--strategix-light) 60%, white 40%) 10px,
      color-mix(in srgb, var(--strategix-light) 40%, white 60%) 10px,
      color-mix(in srgb, var(--strategix-light) 40%, white 60%) 20px
    );
  }

  .project-card:hover {
    border-color: var(--strategix-accent);
    height: 98%;
    transform: translateY(2%);
  }

  .add-card {
    justify-content: center;
    align-items: center;
    border-style: dashed;
    border-color: rgba(0, 0, 0, 0.25);
    background: color-mix(in srgb, var(--strategix-light) 20%, white 80%);
  }

  .add-card:hover {
    height: 100%;
    transform: translateY(0);
  }

  .add-card-content {
    padding: 24px 16px;
    text-align: center;
  }

  .add-card-title {
    margin: 0 0 8px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .add-card-subtitle {
    margin: 0;
    color: color-mix(in srgb, var(--strategix-dark) 80%, black 20%);
    font-size: 14px;
  }

  .add-card-error {
    margin: 8px 0 0;
    color: #b91c1c;
    font-size: 13px;
  }
</style>
