<script setup lang="ts">
  const props = defineProps({
    list: {
      type: Array as () => Array<string>,
      required: true,
    },
    isWhite: {
      type: Boolean,
      default: false,
    },
  })
</script>

<template>
  <ul
    class="list"
  >
    <li
      v-for="(content, index) in list"
      :key="content"
      class="item base-text"
      :class="{ 'white': isWhite }"
    >
      <span :class="`number ${isWhite ? 'white' : ''}`">{{ index + 1 }}</span> {{ content }}
    </li>
  </ul>
</template>

<style scoped>
.list{
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 2), 16px);

  @media(--tablet-width){
    gap: clamp(16px, calc(var(--vh) * 2), 32px);
  }

  @media(--mobile-medium){
    gap: min(calc(var(--vh) * 2), 8px);
  }
}

.item{
  margin: 0;
  display: flex;
  align-items: center;
  align-items: baseline;
  gap: min(4vw, 18px);

  font-size: min(18px, 4.615vw);
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0;
  text-align: left;

  @media(--tablet-width){
    font-size: clamp(18px, 2.5vw, 60px);
    gap: clamp(18px, 3.5vw, 84px);
    line-height: 150%;
  }

  @media(--mobile-medium){
    font-size: min(18px, calc(var(--vh) * 7));
    gap: min(4vw, 18px);
  }
}

.item.white{
  color: var(--strategix-light);
}

.number{
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: min(6.4vw, 32px);
  height: min(6.4vw, 32px);
  aspect-ratio: 1 / 1;

  background-color: transparent;
  border: solid clamp(0px, 0.075vw, 2px) var(--strategix-dark);
  border-radius: 50%;

  text-align: center;

  @media(--tablet-width){
    width: clamp(32px, 4vw, 96px);
    height: clamp(32px, 4vw, 96px);
  }

  @media(--mobile-medium){
    width: min(calc(var(--vh) * 4 + 2vw), 36px);
    height: min(calc(var(--vh) * 4 + 2vw), 36px);
  }
}

.number.white{
  border-color: var(--strategix-light);
  background-color: var(--strategix-light);
  color: var(--strategix-accent);
}
</style>