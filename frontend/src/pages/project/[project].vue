<script setup lang="ts">
import projectsContent from '@/content/pages/projects.json'
import Header from '@/widgets/header';
import Footer from '@/widgets/footer';
import Expamle1 from './expamle1.vue'

const route = useRoute()

// slug из урла
const project = computed(() => route.params.project as string)

const { locale } = useI18n()
const currentLocale = computed(() => locale.value || 'example')
const projectType = computed(() => projectsContent.projects.group1[currentLocale.value].title)
//@ts-ignore
const descriptionProject = computed(() => projectsContent.projects.group1[currentLocale.value].cases[project.value].description)

</script>

<template>
  <Header theme="light" /> 
  <main>
    <Expamle1 />
  </main>
  <Footer />
</template>
