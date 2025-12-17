<script setup lang="ts">
  import { computed } from 'vue';
  import HeaderCMS from '@/widgets/header-cms';
  import projectsContent from '@/content/pages/projects.json';

  type ProjectCase = { src?: string; title?: string }
  type ProjectLocaleData = { title?: string; cases?: Record<string, ProjectCase> }
  type ProjectGroup = Record<string, ProjectLocaleData>
  type ProjectsContent = Record<string, ProjectGroup>

  const projectsData = (projectsContent.projects || {}) as ProjectsContent;
  const missingGroupTitle = 'таких кейсов не существует';

  const route = useRoute();
  const { locale } = useI18n();

  const currentLocale = computed(() => locale.value || 'ru');

  const groupSlug = computed(() => {
    const param = route.params?.projects;
    if (Array.isArray(param)) return param[param.length - 1] || '';
    return String(param || '')
      .split('/')
      .filter(Boolean)
      .pop() || '';
  });

  const group = computed<ProjectGroup | null>(() => {
    const slug = groupSlug.value;
    if (!slug) return null;
    return projectsData[slug] || null;
  });

  const groupTitle = computed(() => {
    const data = group.value;
    if (!data) return missingGroupTitle;
    const localized = data[currentLocale.value] || data.ru || Object.values(data)[0];
    return localized?.title || groupSlug.value || missingGroupTitle;
  });

  const hasGroup = computed(() => group.value !== null);

  const normalizeSrc = (src: string | undefined) => (src || '').replace(/^\.\/+/, '/');

  const projectsList = computed(() => {
    const data = group.value;
    if (!data) return [];
    const localized = data[currentLocale.value] || data.ru || Object.values(data)[0] || {};
    const cases = localized.cases || {};

    return Object.entries(cases).map(([key, value]) => ({
      key,
      title: value?.title || key,
      image: normalizeSrc(value?.src),
    }));
  });
</script>

<template>
  <div class="min-h-screen text-foreground index">
    <div class="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-6">
      <HeaderCMS>{{ groupTitle }}</HeaderCMS>
      <main
        v-if="hasGroup"
        class="projects-shell"
      >
        <div class="projects-grid">
          <div
            v-for="project in projectsList"
            :key="project.key"
            class="project-card"
          >
            <div class="project-media">
              <NuxtImg
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="project-image"
                :width="600"
                :height="400"
              />
              <div
                v-else
                class="project-placeholder"
              />
            </div>
            <div class="project-body">
              <p class="project-title">
                {{ project.title }}
              </p>
            </div>
          </div>
        </div>
      </main>
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
    border-radius: calc(var(--card-radius) / 2);
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
</style>
