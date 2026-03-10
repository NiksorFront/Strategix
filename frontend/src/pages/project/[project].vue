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
import ExampleSlider from '@/widgets/example-slider';
import ExampleWhatDid from '@/widgets/example-what-did';
import ExampleResultsMetrics from '@/widgets/example-results-metrics';
import ExampleResultsBlocks from '@/widgets/example-results-blocks';
import ExampleResultsList from '@/widgets/example-results-list';
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

type ProjectSection = {
  key: string;
  component: Component;
  componentKey: string;
  data: unknown;
};

type ProjectSectionGroup = {
  key: string;
  sections: ProjectSection[];
  isZeroGapGroup: boolean;
};

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
  'example-slider': ExampleSlider,
  'example-results-metrics': ExampleResultsMetrics,
  'example-results-blocks': ExampleResultsBlocks,
  'example-results-list': ExampleResultsList,
  'example-info': ExampleInfo,
  'example-other-projects': ExampleOtherProjects,
};

const zeroGapSectionKeys = new Set([
  'example-big-image',
  'example-big-logo',
  'example-big-video',
]);

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

const sections = computed<ProjectSection[]>(() => {
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
        componentKey,
        data,
      };
    });
});

const sectionGroups = computed<ProjectSectionGroup[]>(() => {
  const groups: ProjectSectionGroup[] = [];

  for (const section of sections.value){
    const isZeroGapSection = zeroGapSectionKeys.has(section.componentKey);
    const lastGroup = groups.at(-1);

    if (isZeroGapSection && lastGroup?.isZeroGapGroup){
      lastGroup.sections.push(section);
      continue;
    }

    groups.push({
      key: `group-${section.key}`,
      sections: [section],
      isZeroGapGroup: isZeroGapSection,
    });
  }

  return groups;
});

const isNotFound = computed(() => !localeContent.value || sections.value.length === 0);
</script>

<template>
  <Header theme="light" /> 
  <main class="project-page-main">
    <NotFound v-if="isNotFound" />
    <template v-else>
      <div
        v-for="group in sectionGroups"
        :key="group.key"
        class="project-page-main__group"
        :class="{
          'project-page-main__group--zero-gap': group.isZeroGapGroup,
        }"
      >
        <component
          :is="section.component"
          v-for="section in group.sections"
          :key="section.key"
          :data="section.data"
        />
      </div>
    </template>
  </main>
  <Footer />
</template>

<style scoped>
.project-page-main{
  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 6), 60px);
  padding-bottom: min(calc(var(--vh) * 6), 60px);
  background-color: var(--strategix-light);

  @media(--tablet-width){
    gap: min(calc(var(--vh) * 10), 180px);
    padding-bottom: min(calc(var(--vh) * 10), 180px);
  }

  @media(--mobile-medium){
    gap: min(calc(var(--vh) * 8), 56px);
    padding-bottom: min(calc(var(--vh) * 8), 56px);
  }
}

.project-page-main__group{
  display: flex;
  flex-direction: column;
  gap: inherit;
}

.project-page-main__group--zero-gap{
  gap: 0;
}
</style>
