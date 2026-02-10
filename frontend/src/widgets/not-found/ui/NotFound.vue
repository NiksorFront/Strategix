<script setup lang="ts">

</script>

<template>
  <section
    class="not-found"
  >
    <h1 class="upperscase-text">
      404
    </h1>
  </section>
</template>

<style scoped>
.not-found{
  width: var(--section-width);
  height: calc(var(--vh) * 80);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  place-content: center;
  background-color: var(--strategix-light);

  color: rgb(230, 42, 42);
}

</style>
