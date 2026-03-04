<script setup lang="ts">
import ExampleSectionTitle from '@/shared/ui/example-section-title';

type ExampleTasksItem = {
  src: string;
  description: string;
  background?: string;
  border?: boolean;
};

type ExampleTasksData = {
  title?: string;
  description: string[];
  lists: ExampleTasksItem[];
};

const { data } = defineProps<{
  data: ExampleTasksData;
}>();

const getBackgroundColor = (background?: string) => {
  const normalized = background?.trim();
  return normalized || 'var(--strategix-light)';
};

const isAccentBackground = (background?: string) => {
  const normalized = background?.trim().toLowerCase() ?? '';

  return (
    normalized === '#2ab464' ||
    normalized === 'var(--strategix-accent)' ||
    normalized === 'rgb(42, 180, 100)' ||
    normalized === 'rgb(42,180,100)'
  );
};
</script>

<template>
  <section class="example-tasks">
    <div class="intro">
      <ExampleSectionTitle>
        {{ data.title ?? '' }}
      </ExampleSectionTitle>

      <div class="intro-description">
        <p
          v-for="(paragraph, index) in data.description"
          :key="`task-paragraph-${index}`"
          class="small-text intro-paragraph"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>

    <ul class="tasks-list">
      <li
        v-for="(item, index) in data.lists"
        :key="`${item.description}-${index}`"
        class="task-row"
      >
        <article class="task-card task-image-card">
          <NuxtImg
            class="task-image"
            :src="item.src"
            :alt="item.description"
            format="webp"
            :quality="80"
            width="640"
            height="640"
            sizes="xs:50vw sm:50vw md:50vw lg:25vw xl:25vw xxl:25vw"
            loading="lazy"
            decoding="async"
          />
        </article>

        <article
          class="task-card task-text-card"
          :class="{ 'task-text-card--accent': isAccentBackground(item.background) }"
          :style="{
            backgroundColor: getBackgroundColor(item.background),
            border: item.border ? '1px solid var(--strategix-dark)' : 'none',
          }"
        >
          <span
            class="task-number"
            :class="{ 'task-number--accent': isAccentBackground(item.background) }"
          >
            {{ index + 1 }}
          </span>
          <p class="small-text task-text">
            {{ item.description }}
          </p>
        </article>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.example-tasks{
  --tasks-grid-gap: min(2.8vw, 14px);

  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 6), 72px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 5), 56px);

  background-color: var(--strategix-light);

  @media(--tablet-width){
    --tasks-grid-gap: min(1vw, 20px);

    padding-block: min(calc(var(--vh) * 7), 80px);
    gap: min(calc(var(--vh) * 8), 80px);
  }

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 8), 56px);
    gap: min(calc(var(--vh) * 4), 28px);
  }
}

.intro{
  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 3), 24px);
  align-items: start;

  @media(--tablet-width){
    gap: clamp(24px, calc(var(--vh) * 4), 80px);
  }

  @media(--mobile-medium){
    row-gap: min(calc(var(--vh) * 3), 24px);
  }
}

.intro-description{
  width: 100%;
  max-width: clamp(280px, 68vw, 960px);

  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2vw, 24px);

  @media(--tablet-width){
    margin-left: calc(((100% - (3 * var(--tasks-grid-gap))) / 4) + var(--tasks-grid-gap));
  }
}

.intro-paragraph{
  margin: 0;
  color: var(--strategix-dark);
  font-weight: 400;

  line-height: 132%;
  letter-spacing: 0;
  text-align: left;
  text-transform: none;
}

.tasks-list{
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--tasks-grid-gap);

  @media(--tablet-width){
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.task-row{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--tasks-grid-gap);
}

.task-card{
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: var(--card-radius);
  overflow: hidden;
}

.task-image{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.task-text-card{
  padding: clamp(14px, 1.35vw, 28px);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(12px, 2.4vw, 24px);
}

.task-text-card--accent .task-text{
  color: var(--strategix-light);
}

.task-number{
  align-self: flex-end;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: min(9vw, 52px);
  height: auto;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  background-color: var(--strategix-accent);
  color: var(--strategix-light);

  font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: min(5vw, 30px);
  font-weight: 500;
  line-height: 1;

  @media(--tablet-width){
    width: clamp(52px, 4.5vw, 104px);
    font-size: clamp(30px, 2.5vw, 60px);
  }

  @media(--mobile-medium){
    width: min(10vw, 44px);
    height: min(10vw, 44px);
    font-size: min(30px, calc(var(--vh) * 6.25));
  }
}

.task-number--accent{
  background-color: var(--strategix-light);
  color: var(--strategix-accent);
}

.task-text{
  width: 85%;
  margin: 0;
  margin-top: auto;

  color: var(--strategix-dark);
  font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: 0;
  text-align: left;
  text-transform: none;
}

.task-row:nth-child(even) .task-image-card{
  order: 2;
}

.task-row:nth-child(even) .task-text-card{
  order: 1;
}

@media(--tablet-width){
  .task-row:nth-child(even) .task-image-card,
  .task-row:nth-child(even) .task-text-card{
    order: 0;
  }
}
</style>
