<script setup lang="ts">
import {getProjectContent} from '@/shared/lib/content/registry';
import type { ExampleWelcomeData } from '@/widgets/example-welcome/model/types';
import type { ExampleGoalsCompanyData } from '@/widgets/example-goals-company/model/types';
import type { ExampleWhatDidData } from '@/widgets/example-what-did/model/types';
import type { ExampleResultsData } from '@/widgets/example-results/model/types';
import type { ExampleOtherProjectsData } from '@/widgets/example-other-projects/model/types';

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

const emptyOtherProjectsData: ExampleOtherProjectsData = {
  projects: [],
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

const otherProjectsData = computed<ExampleOtherProjectsData>(() => {
  return projectContent.value?.translations?.[currentLocale.value]?.['other-projects'] ?? emptyOtherProjectsData;
});
// const projectType = computed(() => projectsContent.projects.group1[currentLocale.value].title)
//@ts-ignore
// const descriptionProject = computed(() => projectsContent.projects.group1[currentLocale.value].cases[project.value].description)

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
