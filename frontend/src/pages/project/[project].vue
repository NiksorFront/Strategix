<script setup lang="ts">
import projectPage from '@/content/pages/project.json'
import localesConfig from '@/content/locales.json'

const route = useRoute()
const { locale } = useI18n()

const defaultLocale = localesConfig.default

// const key = computed(() => `project-${locale.value}`) // ключ для useAsyncData

// // тянем перевод из project.json
// const { data: content } = await useAsyncData(key.value, () =>
//   $fetch('/api/content/page', {
//     params: {
//       id: 'project',        // это "id"/имя файла project.json
//       locale: locale.value  // текущий язык
//     }
//   })
// )

// slug из урла
const project = computed(() => route.params.project as string)

// нужный перевод из JSON
const content = computed(() => {
  const translations = (projectPage as any).translations || {}
  return translations[locale.value] || translations[defaultLocale] || {}
})
</script>

<template>
  <p class="small-text">
    {{ content.title }} {{ project }}
  </p>
</template>
