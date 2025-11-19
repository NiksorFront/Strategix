<template>
  <header>
    <NuxtImg
      src="/images/strategix-white.svg"
      alt="strategix logo"
      class="strategix-logo"
    />
  </header>
</template>

<style scoped>
  header {
      width: calc(100vw - 2 * var(--padding-section-x));
      height: 10vh;

      padding: 5.4vh var(--padding-section-x);
      background-color: var(--background-dark);
  }

  .strategix-logo{
    width: 172px;
    aspect-ratio: 172 / 36;
  }
</style>  