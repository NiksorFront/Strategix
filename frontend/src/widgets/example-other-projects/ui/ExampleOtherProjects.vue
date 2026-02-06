 <script setup lang="ts">
  import type { ExampleOtherProjectsData } from '../model/types';

  defineProps<{
    data: ExampleOtherProjectsData;
  }>();
</script>

<template>
  <section class="example-other-projects">
    <ul class="projects-list">
      <li
        v-for="project in data.projects"
        :key="project.title"
        class="project-card"
        :class="`project-card--${project.direction}`"
      >
        <div
          class="project-head"
          :class="`project-head--${project.direction}`"
        >
          <span
            v-if="project.direction === 'left'"
            class="project-arrow"
            aria-hidden="true"
          >
            &larr;
          </span>
          <span class="project-title base-text">{{ project.title }}</span>
          <span
            v-if="project.direction === 'right'"
            class="project-arrow"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </div>
        <NuxtImg
          class="project-image"
          :src="project.src"
          :alt="project.title"
          sizes="(max-width: 767px) 44vw, (max-width: 1023px) 45vw, 46vw"
          format="webp"
          :width="600"
          :height="600"
          :quality="80"
          loading="lazy"
        />
      </li> 
    </ul>
  </section>
</template>

<style scoped>
.example-other-projects{
  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 6), 72px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  @media(--tablet-width){
    padding-block: min(calc(var(--vh) * 7), 80px);
  }

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 6), 56px);
  }
}

.projects-list{
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(16px, 4vw, 56px);
  row-gap: clamp(20px, 5vw, 64px);

  @media(--tablet-width){
    column-gap: clamp(10px, 1vw, 72px);
  }

  @media(--mobile-medium){
    column-gap: min(4vw, 18px);
  }
}

.project-card{
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 2), 16px);

  @media(--tablet-width){
    gap: clamp(14px, calc(var(--vh) * 2), 24px);
  }

  @media(--mobile-medium){
    gap: min(calc(var(--vh) * 1.5), 12px);
  }
}

.project-head{
  width: 100%;
  display: flex;
  align-items: center;
  gap: min(2vw, 12px);

  color: var(--strategix-dark);
}

.project-head--left{
  justify-content: flex-start;
}

.project-head--right{
  justify-content: flex-end;
}

.project-title{
  text-align: left;
  font-weight: 500;
  text-transform: none;
  line-height: 120%;
  letter-spacing: 0;
  font-size: min(16px, 3.6vw);
  white-space: nowrap;

  @media(--tablet-width){
    font-size: clamp(16px, 1vw, 32px);
  }

  @media(--mobile-medium){
    font-size: min(14px, calc(var(--vh) * 3));
  }
}

.project-head--right .project-title{
  text-align: right;
}

.project-arrow{
  font-size: 1.1em;
  line-height: 1;
}

.project-image{
  width: 100%;
  height: auto;
  margin: 0;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
  border-radius: var(--card-radius);


  @media(--tablet-width){
    aspect-ratio: 4 / 3;
  }

  @media(--mobile-medium){
    aspect-ratio: 4 / 3;
  }
}
</style>
