<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";

const listRef = ref<HTMLElement | null>(null);
const isAutoScrolling = ref(false);
let rafId: number | null = null;
let direction = 0;
let lastTs = 0;

const startScroll = (dir: number) => {
  direction = dir;
  if (rafId !== null) return;

  isAutoScrolling.value = true;

  lastTs = 0;
  const step = (ts: number) => {
    const list = listRef.value;
    if (!list) {
      rafId = null;
      return;
    }

    if (!lastTs) lastTs = ts;
    const dt = ts - lastTs;
    lastTs = ts;

    const speed = 1; // px per ms
    list.scrollLeft += direction * speed * dt;

    rafId = requestAnimationFrame(step);
  };

  rafId = requestAnimationFrame(step);
};

const stopScroll = () => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  direction = 0;
  isAutoScrolling.value = false;
};

onBeforeUnmount(() => {
  stopScroll();
});
</script>

<template>
  <div
    ref="root"
    class="slider"
  >
    <ul
      ref="listRef"
      class="slider__list"
      :class="{ 'slider__list--autoscroll': isAutoScrolling }"
    >
      <!-- Spacer, чтобы казалось, что у нас плошной слайдер -->
      <span class="slider__spacer" />

      <slot />

      <span class="slider__spacer" />
    </ul>
    <div
      class="slider__hover-zone slider__hover-zone--left"
      @mouseenter="startScroll(-1)"
      @mouseleave="stopScroll"
    />
    <div
      class="slider__hover-zone slider__hover-zone--right"
      @mouseenter="startScroll(1)"
      @mouseleave="stopScroll"
    />
  </div>
</template>

<style scoped>
.slider {
	width: calc(100% + 2 * var(--padding-section-x));
  height: 84%;
	position: relative;
  margin: 0;
  overflow: hidden;
  transform: translateX(calc(-1 * var(--padding-section-x)));

  /* @media(--tablet-width){
    width: 100%;
    transform: none;
  }

  @media(--mobile-medium){
    width: 100%;
    transform: none;
  } */
}

.slider__list {
	width: 100%;
  height: 100%;
	overflow-x: auto;
  overflow-y: hidden;

  margin: 0;
  padding: 0;

  display: flex;
  justify-content: space-between;
  gap: 1.25%;
	list-style: none;
	scrollbar-width: none;
	scroll-snap-type: x mandatory; /* центрируем элементы */

  /* mask-image: url("@/assets/images/gradient.svg");
  mask-repeat: no-repeat;
  mask-position: right;
  mask-size: cover; */
}

.slider__list::-webkit-scrollbar {
	/* Chrome/Safari */
	display: none;
}

.slider__list > * {
	scroll-snap-align: center;
}

.slider__list--autoscroll {
  scroll-snap-type: none;
}

.slider__spacer {
	min-width: calc(var(--padding-section-x) - 1.25%); /* padding у края*/
	pointer-events: none;

  @media(--tablet-width){
    min-width: var(--padding-section-x);
    margin-left: -1.25%;
  }

  @media(--mobile-medium){
    min-width: var(--padding-section-x);
    margin-left: -1.25%;
  }
}

.slider__hover-zone {
  position: absolute;
  top: 0;
  height: 100%;
  width: var(--padding-section-x);
  z-index: 2;
  background: transparent;
}

.slider__hover-zone--left {
  left: 0;
}

.slider__hover-zone--right {
  right: 0;
}

</style>
