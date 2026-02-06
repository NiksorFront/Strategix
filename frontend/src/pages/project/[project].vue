<script setup lang="ts">
import {getProjectContent} from '@/shared/lib/content/registry';
import type { ExampleWelcomeData } from '@/widgets/example-welcome/model/types';
import type { ExampleGoalsCompanyData } from '@/widgets/example-goals-company/model/types';
import type { ExampleWhatDidData } from '@/widgets/example-what-did/model/types';
import type { ExampleResultsData } from '@/widgets/example-results/model/types';
import type { ExampleOtherProjectsData } from '@/widgets/example-other-projects/model/types';
import projectsContent from '@/content/pages/projects.json';

import Header from '@/widgets/header';
import ExampleWelcome from '@/widgets/example-welcome';
import ExampleGoalsCompany from '@/widgets/example-goals-company';
import ExampleWhatDid from '@/widgets/example-what-did';
import ExampleResults from '@/widgets/example-results';
import ExampleOtherProjects from '@/widgets/example-other-projects';
import Footer from '@/widgets/footer';
// import Expamle1 from './expamle1.vue'

const route = useRoute()

// slug из урла
const project = computed(() => route.params.project as string)

const { locale } = useI18n()
const currentLocale = computed(() => locale.value || 'example')

const projectContent = computed(() => getProjectContent(project.value));

type ProjectCase = { src: string; title: string; description?: string };
type ProjectLocaleData = { title?: string; cases?: Record<string, ProjectCase> };
type ProjectsContent = Record<string, Record<string, ProjectLocaleData>>;
type OtherProject = { slug: string; title: string; src: string };

const projectsData = (projectsContent.projects || {}) as ProjectsContent;

const emptyWelcomeData: ExampleWelcomeData = {
  sphere: '',
  name: '',
  img: '',
  description: [],
  about: [],
};

const welcomeData = computed<ExampleWelcomeData>(() => {
  return projectContent.value?.translations?.[currentLocale.value]?.welcome ?? emptyWelcomeData;
});

const emptyGoalsCompanyData: ExampleGoalsCompanyData = {
  list: [],
};

const emptyWhatDidData: ExampleWhatDidData = {
  description: '',
  list: [],
};

const emptyResultsData: ExampleResultsData = {
  description: '',
  items: [],
};

const goalsCompanyData = computed<ExampleGoalsCompanyData>(() => {
  return projectContent.value?.translations?.[currentLocale.value]?.['goals-company'] ?? emptyGoalsCompanyData;
});

const whatDidData = computed<ExampleWhatDidData>(() => {
  return projectContent.value?.translations?.[currentLocale.value]?.['what-did'] ?? emptyWhatDidData;
});

const resultsData = computed<ExampleResultsData>(() => {
  return projectContent.value?.translations?.[currentLocale.value]?.results ?? emptyResultsData;
});

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return hash;
};

const createSeededRandom = (seed: string) => {
  let state = hashString(seed) || 1;

  return () => {
    state |= 0;
    state = (state + 0x6D2B79F5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const otherProjectsData = computed<ExampleOtherProjectsData>(() => {
  const localeCode = currentLocale.value;

  const allProjects = Object.values(projectsData).flatMap((group) => {
    const localized = group[localeCode] || group.ru;
    if (!localized?.cases) return [];

    return Object.entries(localized.cases)
      .map(([slug, data]) => {
        if (!data?.title || !data?.src) return null;

        return {
          slug,
          title: data.title,
          src: data.src,
        };
      })
      .filter((item): item is OtherProject => Boolean(item));
  });

  const availableProjects = allProjects.filter((item) => item.slug !== project.value);
  const shuffled = [...availableProjects];
  const random = createSeededRandom(`${project.value}:${localeCode}`);

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const first = shuffled[i];
    const second = shuffled[j];
    if (!first || !second) continue;

    shuffled[i] = second;
    shuffled[j] = first;
  }

  return {
    projects: shuffled.slice(0, 2).map((item, index) => ({
      ...item,
      direction: index % 2 === 0 ? 'left' : 'right',
    })),
  };
});

</script>

<template>
  <Header theme="light" /> 
  <main>
    <ExampleWelcome :data="welcomeData" />
    <div v-if="project === 'css' || project === 'm&m' || project === 'play-create-eat'">
      <ExampleGoalsCompany :data="goalsCompanyData" />
      <ExampleWhatDid :data="whatDidData" />
      <ExampleResults :data="resultsData" />
      <ExampleOtherProjects :data="otherProjectsData" />
    </div>
  </main>
  <Footer />
</template>
