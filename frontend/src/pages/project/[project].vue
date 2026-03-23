<script setup lang="ts">
import type { Component } from 'vue';
import {getProjectContent} from '@/shared/lib/content/registry';
import indexContent from '@/content/pages/index.json';

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
  isZeroGapSection: boolean;
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
        isZeroGapSection: zeroGapSectionKeys.has(componentKey),
      };
    });
});

const isNotFound = computed(() => !localeContent.value || sections.value.length === 0);

const siteTranslations = indexContent.translations as Record<string, {
  footer?: {
    brand?: string;
  };
}>;

const normalizeText = (value: unknown) => {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim();
};

const projectName = computed(() => {
  const localizedName = normalizeText(localeContent.value?.welcome?.name);
  return localizedName || project.value;
});

const projectDescription = computed(() => {
  const welcomeDescription = localeContent.value?.welcome?.description;

  if (Array.isArray(welcomeDescription)) {
    const firstDescription = welcomeDescription
      .map((item) => normalizeText(item))
      .find(Boolean);

    if (firstDescription) return firstDescription;
  }

  const singleDescription = normalizeText(welcomeDescription);
  if (singleDescription) return singleDescription;

  const infoTitle = normalizeText(localeContent.value?.info?.title);
  if (infoTitle) return infoTitle;

  return 'Strategix project case study';
});

const seoBrand = computed(() => {
  const localizedBrand = siteTranslations[currentLocale.value]?.footer?.brand?.trim();
  if (localizedBrand) return localizedBrand;

  const fallbackBrand = siteTranslations.ru?.footer?.brand?.trim() || siteTranslations.en?.footer?.brand?.trim();
  return fallbackBrand || 'STRATEGIX';
});

const seoTitle = computed(() => (
  isNotFound.value
    ? `Project not found | ${seoBrand.value}`
    : `${projectName.value} | ${seoBrand.value}`
));

const seoDescription = computed(() => (
  isNotFound.value
    ? `Project "${project.value}" was not found.`
    : projectDescription.value
));

const seoRobots = computed(() => (
  isNotFound.value ? 'noindex, nofollow' : 'index, follow'
));

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  robots: seoRobots,
});
</script>

<template>
  <Header theme="light" /> 
  <main class="project-page-main">
    <NotFound v-if="isNotFound" theme="light" />
    <template v-else>
      <component
        :is="section.component"
        v-for="section in sections"
        :key="section.key"
        class="project-page-main__section"
        :class="{
          'project-page-main__section--zero-gap': section.isZeroGapSection,
        }"
        :data="section.data"
      />
    </template>
  </main>
  <Footer />
</template>

<style scoped>
.project-page-main{
  --project-page-main-gap: min(calc(var(--vh) * 6), 60px);

  display: flex;
  flex-direction: column;
  padding-bottom: var(--project-page-main-gap);
  background-color: var(--strategix-light);
  font-synthesis: none;

  @media(--tablet-width){
    --project-page-main-gap: min(calc(var(--vh) * 10), 180px);
  }

  @media(--mobile-medium){
    --project-page-main-gap: min(calc(var(--vh) * 8), 56px);
  }
}

.project-page-main__section + .project-page-main__section{
  margin-top: var(--project-page-main-gap);
}

.project-page-main__section--zero-gap + .project-page-main__section--zero-gap{
  margin-top: 0;
}
</style>
