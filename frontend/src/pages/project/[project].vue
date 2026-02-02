<script setup lang="ts">
import projectsContent from '@/content/pages/projects.json'
import {getProjectContent} from '@/shared/lib/content/registry';
import type { ExampleWelcomeData } from '@/widgets/example-welcome/model/types';

import Header from '@/widgets/header';
import ExampleWelcome from '@/widgets/example-welcome';
import ExampleGoalsCompany from '@/widgets/example-goals-company';
import ExampleWhatDid from '@/widgets/example-what-did';
import ExampleResults from '@/widgets/example-results';
import ExampleOtherProjects from '@/widgets/example-other-projects';
import Footer from '@/widgets/footer';
import { get } from 'http';
// import Expamle1 from './expamle1.vue'

const route = useRoute()

// slug из урла
const project = computed(() => route.params.project as string)

const { locale } = useI18n()
const currentLocale = computed(() => locale.value || 'example')

const emptyWelcomeData: ExampleWelcomeData = {
  sphere: '',
  name: '',
  img: '',
  description: [],
  about: [],
};

const welcomeData = computed<ExampleWelcomeData>(() => {
  const content = getProjectContent(project.value);
  return content?.translations?.[currentLocale.value]?.welcome ?? emptyWelcomeData;
});

// const projectType = computed(() => projectsContent.projects.group1[currentLocale.value].title)
//@ts-ignore
// const descriptionProject = computed(() => projectsContent.projects.group1[currentLocale.value].cases[project.value].description)

</script>

<template>
  <Header theme="light" /> 
  <main>
    <ExampleWelcome :data="welcomeData" />
    <!-- <ExampleGoalsCompany />
    <ExampleWhatDid />
    <ExampleResults />
    <ExampleOtherProjects /> -->
  </main>
  <!-- <Footer /> -->
</template>
