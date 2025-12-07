<template>
  <div class="branding__decor">
    <div class="branding__decor__square" />
  </div>
</template>

<style>
.branding__decor {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
}

.branding__decor__square{
  width: 100%;
  height: 100%;

  transform: rotate(45deg);

  background-color: var(--strategix-accent);

  /* animation: square-anim 2s infinite ease-in-out; /* запускается в ServiceCard.vue */
}

@keyframes square-anim {
  0%{
    width: 100%;
    height: 100%;
    background-color: var(--strategix-accent-light);
    transform: rotate(45deg);
  }

  100%{
    width: 100%;
    height: 100%;
    background-color: var(--strategix-accent-light);
    transform: rotate(405deg);
  }
}
</style>
