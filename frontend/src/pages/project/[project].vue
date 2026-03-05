<script setup lang="ts">
import type { Component } from 'vue';
import {getProjectContent} from '@/shared/lib/content/registry';

import Header from '@/widgets/header';
import ExampleWelcome from '@/widgets/example-welcome';
import ExampleTasks from '@/widgets/example-tasks';
import ExampleContext from '@/widgets/example-context';
import ExampleGoalsCompany from '@/widgets/example-goals-company';
import ExampleBigLogo from '@/widgets/example-big-logo';
import ExampleTypograhy from '@/widgets/example-typograhy';
import ExampleColorPalette from '@/widgets/example-color-palette';
import ExampleStrategies from '@/widgets/example-strategies';
import ExampleBigImage from '@/widgets/example-big-image';
import ExampleBigVideo from '@/widgets/example-big-video';
// import ExampleSlider from '@/widgets/example-slider';
import ExampleWhatDid from '@/widgets/example-what-did';
import ExampleResultsMetrics from '@/widgets/example-results-metrics';
import ExampleResultsBlocks from '@/widgets/example-results-blocks';
// import ExampleResultsList from '@/widgets/example-results-list';
import ExampleInfo from '@/widgets/example-info';
import ExampleOtherProjects from '@/widgets/example-other-projects';
import Footer from '@/widgets/footer';
import NotFound from '@/widgets/not-found';

const route = useRoute();

// slug из урла
const project = computed(() => route.params.project as string);

const { locale } = useI18n();
const currentLocale = computed(() => locale.value || 'example');

const projectContent = computed(() => getProjectContent(project.value));

const sectionComponents: Record<string, Component> = {
  'example-welcome': ExampleWelcome,
  'example-tasks': ExampleTasks,
  'example-context': ExampleContext,
  'example-goals-company': ExampleGoalsCompany,
  'example-big-logo': ExampleBigLogo,
  'example-what-did': ExampleWhatDid,
  'example-typograhy': ExampleTypograhy,
  'example-color-palette': ExampleColorPalette,
  'example-strategies': ExampleStrategies,
  'example-big-image': ExampleBigImage,
  'example-big-video': ExampleBigVideo,
  'example-results-metrics': ExampleResultsMetrics,
  'example-results-blocks': ExampleResultsBlocks,
  'example-info': ExampleInfo,
  'example-other-projects': ExampleOtherProjects,
};

const localeContent = computed(() => {
  const translations = projectContent.value?.translations;
  if (!translations) return null;

  return (
    translations[currentLocale.value] ??
    translations.ru ??
    translations.en ??
    Object.values(translations)[0] ??
    null
  );
});

const sections = computed(() => {
  const content = localeContent.value;
  if (!content) return [];

  return Object.entries(content)
    .map(([key, data]) => {
      const baseKey = key.replace(/-\d+$/, '');
      const componentKey = `example-${baseKey}`;
      const component = sectionComponents[componentKey] ?? NotFound;

      return {
        key: `${componentKey}-${key}`,
        component,
        data,
      };
    });
});

const isNotFound = computed(() => !localeContent.value || sections.value.length === 0);
</script>

<template>
  <Header theme="light" /> 
  <main>
    <NotFound v-if="isNotFound" />
    <component
      :is="section.component"
      v-for="section in sections"
      v-else
      :key="section.key"
      :data="section.data"
    />
  </main>
  <Footer />
</template>
