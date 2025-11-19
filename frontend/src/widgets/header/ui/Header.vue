<template>
  <header>
    <NuxtImg
      class="strategix-logo"
      src="/images/strategix-white.svg"
      alt="strategix logo"
    />
  </header>
</template>

<style scoped>
  header {
    width: calc(100vw - 2 * var(--padding-section-x));
    height: 10vh;

    padding: 5.4vh var(--padding-section-x);
    background-color: var(--background-dark);

    @media (--tablet-width) {
      padding-top: 3.2vh;
    }
  }

  .strategix-logo{
    width: 172px;
    aspect-ratio: 172 / 36;
  }
</style>  