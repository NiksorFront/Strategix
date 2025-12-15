<script setup lang="ts">
import { computed, ref } from 'vue';
import localesConfig from '@/content/locales.json';
import indexPageContent from '@/content/pages/index.json';
import Header from '@/widgets/header';
import Welcome from '@/widgets/welcome';
import AboutUs from '@/widgets/about-us';
import Services from '@/widgets/services';
import OurProjects from '@/widgets/our-projects';
import MarketResponse from '@/widgets/market-response';
import OurTeam from '@/widgets/our-team';
import LeaveRequest from '@/widgets/leave-request';
import Footer from '@/widgets/footer';

type LocaleConfig = { code: string; name: string; iso?: string }

type TranslationSections = Record<string, unknown>
type TranslationsMap = Record<string, TranslationSections>

const locales = computed<LocaleConfig[]>(() => localesConfig?.locales || []);
const translations = (indexPageContent.translations || {}) as TranslationsMap;

const initialActiveLocale = locales.value[0]?.code || Object.keys(translations)[0] || '';
const activeLocale = ref(initialActiveLocale);

const tabs = computed(() =>
  locales.value.map((locale) => ({
    ...locale,
    hasContent: Boolean(translations?.[locale.code]),
  })),
);

const localeSections = computed<Record<string, { key: string; json: string }[]>>(() => {
  const result: Record<string, { key: string; json: string }[]> = {};

  locales.value.forEach(({ code }) => {
    const content = translations?.[code];

    if (content && typeof content === 'object') {
      result[code] = Object.entries(content).map(([sectionKey, sectionValue]) => ({
        key: sectionKey,
        json: JSON.stringify(sectionValue, null, 2),
      }));
    }
  });

  return result;
});

const activeLocaleName = computed(() => {
  const current = locales.value.find(({ code }) => code === activeLocale.value);
  return current ? `${current.name} · ${current.code}` : activeLocale.value || 'Нет языка';
});
</script>

<template>
  <div class="main">
    <Header /> 
    <main>
      <Welcome />
      <AboutUs />
      <Services />
      <OurProjects />
      <MarketResponse />
      <OurTeam />
      <LeaveRequest />
    </main>
    <Footer />
  </div>
  <div class="edit-json">
    <div class="edit-card p-3 box-border">
      <div class="flex items-center justify-between gap-2">
        <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          index.json
        </p>
        <span class="text-[11px] text-muted-foreground/80">
          {{ activeLocaleName }}
        </span>
      </div>

      <div class="space-y-3">
        <div
          class="flex flex-wrap gap-[2.666%] border border-border py-3"
          role="tablist"
          aria-label="Locales"
        >
          <button
            v-for="tab in tabs"
            :key="tab.code"
            type="button"
            :aria-selected="activeLocale === tab.code"
            class="w-[23%] inline-flex justify-center items-center gap-1 rounded-md border border-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            :class="activeLocale === tab.code
              ? 'bg-background text-foreground shadow-soft border-border'
              : 'text-muted-foreground'"
            role="tab"
            @click="activeLocale = tab.code"
          >
            <span class="font-semibold">{{ tab.name }}</span>
            <span class="text-[11px] text-muted-foreground">({{ tab.code }})</span>
          </button>
        </div>

        <div class="space-y-3">
          <template
            v-for="tab in tabs"
            :key="`panel-${tab.code}`"
          >
            <div
              v-show="activeLocale === tab.code"
              role="tabpanel"
              :aria-label="`Content for ${tab.name}`"
              class="space-y-3"
            >
              <div
                v-if="localeSections[tab.code]?.length"
                class="space-y-3"
              >
                <div
                  v-for="section in localeSections[tab.code]"
                  :key="section.key"
                  class="rounded-lg border border-border bg-card"
                >
                  <div class="flex items-center justify-between gap-2">
                    <p class="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {{ section.key }}
                    </p>
                    <span class="text-[10px] text-muted-foreground/80">
                      {{ tab.code }}
                    </span>
                  </div>
                  <pre class="mt-2 whitespace-pre-wrap break-words rounded-md bg-muted/60 p-3 font-mono text-[11px] leading-relaxed text-foreground/80">{{ section.json }}</pre>
                </div>
              </div>
              <div
                v-else
                class="rounded-lg border border-dashed border-border bg-muted/60 p-4 text-sm text-muted-foreground"
              >
                Для языка {{ tab.name }} пока нет данных в index.json.
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main{
  transform: scale(0.75);
  transform-origin: left top;
}

.edit-json{
  width: calc(var(--section-width)/4);
  height: calc(var(--vh) * 100);
  max-height: calc(var(--vh) * 100);

  position: fixed;
  top: 0;
  right: 0;
  overflow-y: scroll;

  box-sizing: border-box;
}

.edit-card{
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
