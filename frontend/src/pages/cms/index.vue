<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import HeaderCMS from '@/widgets/header-cms';
  import MainPage from '@/assets/images/main-page.svg';
  import projectsContent from '@/content/pages/projects.json';

  type ProjectCase = { src: string; title: string; description?: string }
  type ProjectLocaleData = { title?: string; cases?: Record<string, ProjectCase> }
  type ProjectsContent = Record<string, Record<string, ProjectLocaleData>>

  const projectsData = (projectsContent.projects || {}) as ProjectsContent

  const { locale } = useI18n()
  const currentLocale = computed(() => locale.value || 'ru')
  const router = useRouter()

  const normalizeSrc = (src: string | undefined) => (src || '').replace(/^\.\/+/, '/')

  const projectGroups = computed(() => {
    const localeCode = currentLocale.value
    const order = ['group1', 'group2', 'group3', 'group4']

    return order.map((key) => {
      const group = projectsData[key]
      const localized = group?.[localeCode] || group?.ru || {}
      const casesEntries = localized.cases ? Object.entries(localized.cases) : []
      const visibleCases = casesEntries.slice(0, 3).map(([caseKey, data]) => ({
        key: caseKey,
        title: data.title,
        image: normalizeSrc(data.src),
      }))
      while (visibleCases.length < 3) {
        visibleCases.push({ key: `placeholder-${visibleCases.length}`, title: '', image: '' })
      }
      const hiddenCount = Math.max(casesEntries.length - 3, 0)

      return {
        key,
        title: localized.title || key,
        cases: visibleCases,
        hiddenCount,
      }
    })
  })

  const goToMainProjects = () => {
    router.push('/cms/main')
  }

  const goToGroup = (group: string) => {
    router.push(`/cms/projects/${encodeURIComponent(group)}`)
  }
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
      <HeaderCMS>Content Management System</HeaderCMS>
      <main class="cms-layout">
        <div
          class="main"
          role="link"
          tabindex="0"
          @click="goToMainProjects"
          @keydown.enter.prevent="goToMainProjects"
        >
          <h2 class="upperscase-text cms-layout-title">
            ГЛАВНАЯ
          </h2>
          <img
            :src="MainPage"
            alt="main"
            class="main-image"
          >
        </div>
        <div class="projects">
          <h2 class="upperscase-text cms-layout-title">
            ПРОЕКТЫ
          </h2>
          <div class="projects-projects">
            <div
              v-for="group in projectGroups"
              :key="group.key"
              class="project-group-card"
              role="link"
              tabindex="0"
              @click="goToGroup(group.key)"
              @keydown.enter.prevent="goToGroup(group.key)"
            >
              <div class="projects-header">
                <h2 class="projects-title">
                  {{ group.title }}
                </h2>
              </div>
              <div class="projects-grid">
                <div
                  v-for="project in group.cases"
                  :key="project.key"
                  class="project-tile"
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
                  <div class="project-meta">
                    <p
                      v-if="project.title"
                      class="project-case-title"
                    >
                      {{ project.title }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="group.hiddenCount > 0"
                  class="project-tile more-tile"
                >
                  <div class="more-count">
                    +{{ group.hiddenCount }}
                  </div>
                </div>
                <div
                  v-else
                  class="project-tile empty-tile"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
  .cms-layout {
    width: 100%;
    height: 70vh;
    display: grid;
    grid-template-columns: 42% 5% 26.5% 26.5%;
    grid-template-rows: 50% 50%;
  }

  .cms-layout-title{
    text-align: left;
  }

  .main{
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    width: 100%;
    height: 100%;
    /* background-color: var(--strategix-light); */
  }

  .main-image {
    width: 100%;
    height: 90%;
    border: 2px solid color-mix(in srgb, var(--strategix-light) 50%, white 50%);
    box-sizing: border-box;
    object-fit: cover;
    object-position: center top;
    display: block;
    border-radius: var(--card-radius);
    transition: all 0.2s ease;
  }

  .main-image:hover{
    /* background-color: var(--strategix-accent); */
    border: 2px solid var(--strategix-accent);
    cursor: pointer;
  }

  .projects{
    grid-column: 3 / 5;
    grid-row: 1 / 3;
    /* background-color: var(--strategix-light); */
  }
  
  .projects-projects{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: calc(0.5vw + 0.5vh);
    height: 90%;
  }

  .project-group-card{
    background-color: color-mix(in srgb, var(--strategix-light) 50%, white 50%);
    box-sizing: border-box;
    border: 2px solid color-mix(in srgb, var(--strategix-light) 50%, white 50%);
    border-radius: var(--card-radius);
    display: flex;
    flex-direction: column;
    padding: 4px;
    gap: var(--gap-grid);
    transition: all 0.2s ease;
  }

  .project-group-card:hover{
    /* background-color: var(--strategix-accent); */
    border: 2px solid var(--strategix-accent);
    cursor: pointer;
  }

  .projects-title{
    margin: 0;
    font-weight: 700;
    font-size: 18px;
    color: #1f2933;
    text-align: center;
  }

  .projects-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: var(--gap-grid);
    flex: 1 1 auto;
  }

  .project-tile{
    background: #f2f2f2;
    border-radius: var(--card-radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #e2e2e2;
  }

  .project-media{
    flex: 1 1 auto;
    min-height: 0;
    background: linear-gradient(135deg, #f2f2f2, #e4e4e4);
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .project-placeholder{
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      -45deg,
      #e5e5e5,
      #e5e5e5 10px,
      #d9d9d9 10px,
      #d9d9d9 20px
    );
  }

  .project-meta{
    display: flex;
    flex-direction: column;
  }

  .project-case-title{
    margin: 0;
    font-weight: 700;
    font-size: 16px;
    color: #1f2933;
    padding: 6px 12px;
  }

  .more-tile{
    align-items: center;
    justify-content: center;
    background: #e8f5ed;
    color: #1f2933;
    border: 1px dashed #c4dfce;
  }

  .more-count{
    font-size: 20px;
    font-weight: 700;
  }

  .empty-tile{
    background: #fafafa;
    border: 1px dashed #e5e5e5;
  }
</style>
