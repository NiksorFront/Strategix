<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { Alert, AlertDescription } from '@/shared/ui/shadcn/ui/alert';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/ui/card';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { ScrollArea, ScrollBar } from '@/shared/ui/shadcn/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/shadcn/ui/tabs';
import { Textarea } from '@/shared/ui/shadcn/ui/textarea';
import localesConfig from '@/content/locales.json';
import projectsContent from '@/content/pages/projects.json';
import OurProjects from '@/widgets/our-projects';

type LocaleConfig = { code: string; name: string; iso?: string }
type ProjectCase = { src?: string; title?: string; description?: string }
type ProjectLocaleData = { title?: string; cases?: Record<string, ProjectCase> }
type ProjectGroup = Record<string, ProjectLocaleData>
type ProjectsPayload = { id?: string; projects?: Record<string, ProjectGroup> }

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const locales = computed<LocaleConfig[]>(() => localesConfig?.locales || []);
const initialActiveLocale = locales.value[0]?.code || Object.keys(projectsContent?.projects || {})[0] || '';
const activeLocale = ref(initialActiveLocale);

const editedProjects = ref<ProjectsPayload>({ id: 'projects', projects: {} });
const groupOrder = ref<string[]>([]);

const isSaving = ref(false);
const saveMessage = ref('');
const saveError = ref('');
let saveMessageFlashToken: symbol | null = null;

const pendingCaseUploads = reactive(new Map<ProjectCase, { file: File; preview: string }>());
const pendingCaseVersion = ref(0);
const pendingImageDeletes = ref<string[]>([]);
const slugDrafts = reactive<Record<string, string>>({});
const pendingSlugRenames = reactive<Record<string, string>>({});

const flashSaveMessage = (message: string, duration = 5000) => {
  saveMessage.value = message;
  const token = Symbol('saveMessageFlash');
  saveMessageFlashToken = token;
  setTimeout(() => {
    if (saveMessageFlashToken !== token) return;
    if (saveMessage.value === message) {
      saveMessage.value = '';
    }
  }, duration);
};

const normalizeImageSrc = (src?: string) => {
  if (!src || typeof src !== 'string') return '';
  if (src.startsWith('@/public')) return src.replace(/^@\/public/, '');
  if (src.startsWith('./')) return src.replace(/^\.\//, '/');
  return src;
};

const queueImageForDeletion = (src?: string) => {
  const normalized = normalizeImageSrc(src);
  if (!normalized || !normalized.startsWith('/images/')) return;
  if (!pendingImageDeletes.value.includes(normalized)) {
    pendingImageDeletes.value.push(normalized);
  }
};

const ensureCaseDefaults = (item: ProjectCase) => {
  item.src = typeof item.src === 'string' ? item.src : '';
  item.title = typeof item.title === 'string' ? item.title : '';
  item.description = typeof item.description === 'string' ? item.description : '';
};

const slugDraftKey = (groupKey: string, caseKey: string) => `${groupKey}::${caseKey}`;

const registerSlugRename = (from: string, to: string) => {
  const trimmedFrom = from.trim();
  const trimmedTo = to.trim();
  if (!trimmedFrom || !trimmedTo) return;

  const directKey = Object.prototype.hasOwnProperty.call(pendingSlugRenames, trimmedFrom)
    ? trimmedFrom
    : null;
  const existingOriginal = directKey
    ? directKey
    : Object.keys(pendingSlugRenames).find((key) => pendingSlugRenames[key] === trimmedFrom) || trimmedFrom;

  if (existingOriginal === trimmedTo) {
    delete pendingSlugRenames[existingOriginal];
    return;
  }

  pendingSlugRenames[existingOriginal] = trimmedTo;
};

const dropSlugRenamesFor = (slug: string) => {
  Object.keys(pendingSlugRenames).forEach((key) => {
    if (key === slug || pendingSlugRenames[key] === slug) {
      delete pendingSlugRenames[key];
    }
  });
};

const collectGroupCaseKeys = (group: ProjectGroup) => {
  const keys = new Set<string>();
  Object.values(group).forEach((localeData) => {
    const cases = localeData?.cases || {};
    Object.keys(cases).forEach((key) => keys.add(key));
  });
  return Array.from(keys);
};

const syncGroupCaseKeys = (group: ProjectGroup) => {
  const allKeys = new Set<string>();
  Object.values(group).forEach((localeData) => {
    const cases = localeData?.cases;
    if (!cases || typeof cases !== 'object') return;
    Object.keys(cases).forEach((key) => allKeys.add(key));
  });

  if (!allKeys.size) return;

  Object.values(group).forEach((localeData) => {
    if (!localeData.cases || typeof localeData.cases !== 'object') {
      localeData.cases = {};
    }
    allKeys.forEach((key) => {
      if (!localeData.cases?.[key]) {
        localeData.cases![key] = { src: '', title: '', description: '' };
      }
      ensureCaseDefaults(localeData.cases![key]);
    });
  });
};

const ensureGroupDefaults = (group: ProjectGroup) => {
  locales.value.forEach((locale) => {
    if (!group[locale.code] || typeof group[locale.code] !== 'object') {
      group[locale.code] = { title: '', cases: {} };
    }
  });

  Object.values(group).forEach((localeData) => {
    if (!localeData || typeof localeData !== 'object') return;
    localeData.title = typeof localeData.title === 'string' ? localeData.title : '';
    if (!localeData.cases || typeof localeData.cases !== 'object') {
      localeData.cases = {};
    }
    Object.values(localeData.cases).forEach((item) => ensureCaseDefaults(item));
  });

  syncGroupCaseKeys(group);
};

const initializeProjects = () => {
  const payload = clone(projectsContent || {}) as ProjectsPayload;
  payload.id = payload.id || 'projects';
  if (!payload.projects || typeof payload.projects !== 'object') {
    payload.projects = {};
  }

  Object.values(payload.projects).forEach((group) => {
    if (!group || typeof group !== 'object') return;
    ensureGroupDefaults(group);
  });

  editedProjects.value = payload;
  groupOrder.value = Object.keys(payload.projects || {});

  Object.entries(payload.projects || {}).forEach(([groupKey, group]) => {
    const keys = collectGroupCaseKeys(group);
    keys.forEach((caseKey) => {
      const draftKey = slugDraftKey(groupKey, caseKey);
      if (!(draftKey in slugDrafts)) {
        slugDrafts[draftKey] = caseKey;
      }
    });
  });
};

initializeProjects();

const groupsForLocale = computed(() => {
  const projects = editedProjects.value.projects || {};
  const order = groupOrder.value.length ? groupOrder.value : Object.keys(projects);
  return order
    .map((key) => {
      const group = projects[key];
      if (!group) return null;
      const fallbackLocale = locales.value[0]?.code;
      const localeData =
        group[activeLocale.value] ||
        (fallbackLocale ? group[fallbackLocale] : undefined) ||
        Object.values(group)[0] ||
        { title: '', cases: {} };
      if (!localeData.cases || typeof localeData.cases !== 'object') {
        localeData.cases = {};
      }
      return {
        key,
        group,
        localeData,
      };
    })
    .filter((item): item is { key: string; group: ProjectGroup; localeData: ProjectLocaleData } => !!item);
});

const getCaseKeys = (groupKey: string) => {
  const group = editedProjects.value.projects?.[groupKey];
  const localeData = group?.[activeLocale.value] || group?.[locales.value[0]?.code || ''];
  if (!localeData?.cases) return [];
  return Object.keys(localeData.cases);
};

const rebuildGroupOrder = (nextOrder: string[]) => {
  const projects = editedProjects.value.projects || {};
  const ordered: Record<string, ProjectGroup> = {};
  nextOrder.forEach((key) => {
    if (projects[key]) ordered[key] = projects[key];
  });
  Object.keys(projects).forEach((key) => {
    if (!ordered[key]) ordered[key] = projects[key];
  });
  editedProjects.value.projects = ordered;
  groupOrder.value = Object.keys(ordered);
};

const moveGroup = (groupKey: string, direction: number) => {
  const order = [...groupOrder.value];
  const index = order.indexOf(groupKey);
  if (index < 0) return;
  const target = index + direction;
  if (target < 0 || target >= order.length) return;
  order.splice(index, 1);
  order.splice(target, 0, groupKey);
  rebuildGroupOrder(order);
};

const nextGroupKey = computed(() => {
  const keys = new Set(groupOrder.value);
  let index = keys.size + 1;
  let candidate = `group${index}`;
  while (keys.has(candidate)) {
    index += 1;
    candidate = `group${index}`;
  }
  return candidate;
});

const addGroup = () => {
  const key = nextGroupKey.value;
  const projects = editedProjects.value.projects || (editedProjects.value.projects = {});
  if (projects[key]) return;
  const group: ProjectGroup = {};
  locales.value.forEach((locale) => {
    group[locale.code] = { title: '', cases: {} };
  });
  projects[key] = group;
  ensureGroupDefaults(group);
  rebuildGroupOrder([...groupOrder.value, key]);
  flashSaveMessage(`Группа ${key} добавлена`);
};

const removeGroup = (groupKey: string) => {
  const projects = editedProjects.value.projects;
  if (!projects || !projects[groupKey]) return;
  const group = projects[groupKey];
  if (group) {
    Object.values(group).forEach((localeData) => {
      const cases = localeData?.cases || {};
      Object.values(cases).forEach((item) => queueImageForDeletion(item?.src));
    });

    const groupCases = new Set<ProjectCase>();
    Object.values(group).forEach((localeData) => {
      const cases = localeData?.cases || {};
      Object.values(cases).forEach((item) => groupCases.add(item));
    });

    pendingCaseUploads.forEach((value, item) => {
      if (!groupCases.has(item)) return;
      if (value.preview) URL.revokeObjectURL(value.preview);
      pendingCaseUploads.delete(item);
      pendingCaseVersion.value += 1;
    });

    collectGroupCaseKeys(group).forEach((caseKey) => {
      delete slugDrafts[slugDraftKey(groupKey, caseKey)];
      dropSlugRenamesFor(caseKey);
    });
  }

  delete projects[groupKey];
  rebuildGroupOrder(groupOrder.value.filter((key) => key !== groupKey));
};

const createCaseKey = (groupKey: string) => {
  const existing = new Set(getCaseKeys(groupKey));
  let index = existing.size + 1;
  let candidate = `new-case-${index}`;
  while (existing.has(candidate)) {
    index += 1;
    candidate = `new-case-${index}`;
  }
  return candidate;
};

const addCase = (groupKey: string) => {
  const group = editedProjects.value.projects?.[groupKey];
  if (!group) return;
  const slug = createCaseKey(groupKey);
  Object.values(group).forEach((localeData) => {
    if (!localeData.cases || typeof localeData.cases !== 'object') {
      localeData.cases = {};
    }
    localeData.cases[slug] = { src: '', title: '', description: '' };
  });
  slugDrafts[slugDraftKey(groupKey, slug)] = slug;
};

const reorderCases = (groupKey: string, orderedKeys: string[]) => {
  const group = editedProjects.value.projects?.[groupKey];
  if (!group) return;
  Object.values(group).forEach((localeData) => {
    const cases = localeData?.cases || {};
    const nextCases: Record<string, ProjectCase> = {};
    orderedKeys.forEach((key) => {
      if (cases[key]) nextCases[key] = cases[key];
    });
    Object.keys(cases).forEach((key) => {
      if (!nextCases[key]) nextCases[key] = cases[key];
    });
    localeData.cases = nextCases;
  });
};

const moveCase = (groupKey: string, index: number, direction: number) => {
  const keys = getCaseKeys(groupKey);
  const target = index + direction;
  if (target < 0 || target >= keys.length) return;
  const nextKeys = [...keys];
  const [item] = nextKeys.splice(index, 1);
  nextKeys.splice(target, 0, item);
  reorderCases(groupKey, nextKeys);
};

const removeCase = (groupKey: string, caseKey: string) => {
  const group = editedProjects.value.projects?.[groupKey];
  if (!group) return;
  Object.values(group).forEach((localeData) => {
    const item = localeData?.cases?.[caseKey];
    if (item) {
      queueImageForDeletion(item.src);
      const pending = pendingCaseUploads.get(item);
      if (pending?.preview) URL.revokeObjectURL(pending.preview);
      pendingCaseUploads.delete(item);
      pendingCaseVersion.value += 1;
    }
    if (localeData?.cases) {
      delete localeData.cases[caseKey];
    }
  });
  delete slugDrafts[slugDraftKey(groupKey, caseKey)];
  dropSlugRenamesFor(caseKey);
};

const renameCaseSlug = (
  groupKey: string,
  oldKey: string,
  nextKey: string,
  inputEl?: HTMLInputElement | null,
) => {
  const trimmed = nextKey.trim();
  const oldDraftKey = slugDraftKey(groupKey, oldKey);
  if (!trimmed) {
    saveError.value = 'Slug не может быть пустым.';
    saveMessage.value = '';
    slugDrafts[oldDraftKey] = oldKey;
    if (inputEl) inputEl.value = oldKey;
    return;
  }

  if (trimmed === oldKey) {
    slugDrafts[oldDraftKey] = oldKey;
    if (inputEl) inputEl.value = oldKey;
    return;
  }

  const keys = new Set(getCaseKeys(groupKey));
  if (keys.has(trimmed)) {
    saveError.value = 'Такой slug уже существует.';
    saveMessage.value = '';
    slugDrafts[oldDraftKey] = oldKey;
    if (inputEl) inputEl.value = oldKey;
    return;
  }

  const group = editedProjects.value.projects?.[groupKey];
  if (!group) return;
  const order = getCaseKeys(groupKey);

  Object.values(group).forEach((localeData) => {
    if (!localeData.cases || typeof localeData.cases !== 'object') {
      localeData.cases = {};
    }
    const item = localeData.cases[oldKey] ?? { src: '', title: '', description: '' };
    delete localeData.cases[oldKey];
    localeData.cases[trimmed] = item;
    ensureCaseDefaults(item);
  });

  const nextOrder = order.map((key) => (key === oldKey ? trimmed : key));
  reorderCases(groupKey, nextOrder);

  delete slugDrafts[oldDraftKey];
  slugDrafts[slugDraftKey(groupKey, trimmed)] = trimmed;
  registerSlugRename(oldKey, trimmed);
  saveError.value = '';
};

const getCaseImageSrc = (item: ProjectCase) => {
  pendingCaseVersion.value;
  const pending = pendingCaseUploads.get(item);
  return pending?.preview || normalizeImageSrc(item?.src);
};

const hasPendingCaseImage = (item: ProjectCase) => pendingCaseUploads.has(item);

const uploadCaseImage = (
  groupKey: string,
  caseKey: string,
  fileList: FileList | null,
  inputEl?: HTMLInputElement | null,
) => {
  const file = fileList?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    saveError.value = 'Загрузите изображение.';
    saveMessage.value = '';
    if (inputEl) inputEl.value = '';
    return;
  }

  const group = editedProjects.value.projects?.[groupKey];
  const item = group?.[activeLocale.value]?.cases?.[caseKey];
  if (!item) return;

  const existing = pendingCaseUploads.get(item);
  if (existing?.preview) {
    URL.revokeObjectURL(existing.preview);
  }

  const preview = URL.createObjectURL(file);
  pendingCaseUploads.set(item, { file, preview });
  pendingCaseVersion.value += 1;
  flashSaveMessage('Изображение выбрано, загрузится после сохранения');
  saveError.value = '';
  if (inputEl) inputEl.value = '';
};

const collectUsedImageSources = (payload: ProjectsPayload) => {
  const sources = new Set<string>();
  Object.values(payload.projects || {}).forEach((group) => {
    Object.values(group || {}).forEach((localeData) => {
      const cases = localeData?.cases || {};
      Object.values(cases).forEach((item) => {
        const normalized = normalizeImageSrc(item?.src);
        if (normalized && normalized.startsWith('/images/')) {
          sources.add(normalized);
        }
      });
    });
  });
  return sources;
};

const saveProjects = async () => {
  if (isSaving.value) return;
  isSaving.value = true;
  saveMessage.value = '';
  saveError.value = '';

  try {
    for (const [item, pending] of pendingCaseUploads.entries()) {
      const formData = new FormData();
      formData.append('file', pending.file);

      const responseUpload = await fetch('/api/cms/upload', {
        method: 'POST',
        body: formData,
      });

      if (!responseUpload.ok) {
        const text = await responseUpload.text().catch(() => '');
        throw new Error(text || `Не удалось загрузить файл (${responseUpload.status})`);
      }

      const uploadData = await responseUpload.json();
      queueImageForDeletion(item.src);
      item.src = uploadData.path;
      if (pending.preview) URL.revokeObjectURL(pending.preview);
      pendingCaseUploads.delete(item);
      pendingCaseVersion.value += 1;
    }

    const payload = clone(editedProjects.value);
    const renames = Object.entries(pendingSlugRenames)
      .map(([from, to]) => ({ from, to }))
      .filter((entry) => entry.from && entry.to);
    const response = await fetch('/api/cms/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload, renames }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(text || `Ошибка сохранения (${response.status})`);
    }

    saveMessage.value = 'Сохранено в файл';
    Object.keys(pendingSlugRenames).forEach((key) => delete pendingSlugRenames[key]);

    if (pendingImageDeletes.value.length) {
      const usedSources = collectUsedImageSources(payload);
      const toDelete = Array.from(new Set(
        pendingImageDeletes.value
          .map((src) => normalizeImageSrc(src))
          .filter((src): src is string => !!src && src.startsWith('/images/')),
      )).filter((src) => !usedSources.has(src));

      pendingImageDeletes.value = [];

      for (const src of toDelete) {
        try {
          await fetch('/api/cms/delete-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ src }),
          });
        } catch (error: any) {
          saveError.value = error?.message || 'Не удалось удалить файл изображения.';
        }
      }
    }
  } catch (error: any) {
    saveError.value = error?.message || 'Не удалось сохранить изменения.';
  } finally {
    isSaving.value = false;
  }
};

const updateLayoutMetrics = () => {
  if (typeof window === 'undefined') return;
  const vw = window.innerWidth || 1;
  const gap = 1;
  const panelWidth = Math.min(450, Math.max(300, vw * 0.28));
  const available = Math.max(0, vw - (panelWidth + gap));
  const scale = Math.min(0.9, Math.max(0.55, available / vw));

  const root = document.documentElement;
  root.style.setProperty('--cms-panel-width', `${panelWidth}px`);
  root.style.setProperty('--cms-panel-gap', `${gap}px`);
  root.style.setProperty('--cms-scale', scale.toString());
};

onMounted(() => {
  updateLayoutMetrics();
  window.addEventListener('resize', updateLayoutMetrics, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateLayoutMetrics);
  pendingCaseUploads.forEach((value) => {
    if (value.preview) URL.revokeObjectURL(value.preview);
  });
  pendingCaseUploads.clear();
});

const inputClass = 'h-8 px-3 py-2 text-sm leading-tight w-full box-border';
const textareaClass = 'w-full box-border resize-vertical min-h-[88px] px-3 py-2 text-sm leading-tight';
const rowTwoCols = 'grid w-full box-border grid-cols-[43%_55%] gap-[2%] items-center';

const collapsed = reactive<Record<string, boolean>>({});
const isCollapsed = (key: string) => collapsed[key] ?? true;
const toggleSection = (key: string) => {
  collapsed[key] = !isCollapsed(key);
};
</script>

<template>
  <div class="main">
    <OurProjects />
  </div>
  <div class="edit-json">
    <ScrollArea class="w-full h-full">
      <div class="edit-card p-3 box-border">
        <div class="flex items-center justify-between gap-2">
          <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            projects.json
          </p>
          <span class="text-[11px] text-muted-foreground/80">
            {{ activeLocale }}
          </span>
        </div>

        <Tabs
          v-model:model-value="activeLocale"
          class="space-y-3"
        >
          <TabsList class="flex flex-wrap justify-start sbg-muted/70 p-3 gap-2 bg-[hsl(var(--card))]">
            <TabsTrigger
              v-for="tab in locales"
              :key="tab.code"
              :value="tab.code"
              class="w-19 flex items-center text-sm bg-[var(--background)] hover"
            >
              <span class="font-semibold mr-1">{{ tab.name }}</span>
              <span class="text-[11px] text-muted-foreground">({{ tab.code }})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            v-for="tab in locales"
            :key="`panel-${tab.code}`"
            :value="tab.code"
            class="space-y-3"
          >
            <Card>
              <CardHeader class="flex flex-row items-center justify-between gap-2">
                <CardTitle class="text-sm uppercase tracking-wide">
                  Группы проектов
                </CardTitle>
                <span class="text-[11px] text-muted-foreground">
                  {{ groupsForLocale.length }} шт.
                </span>
              </CardHeader>
              <CardContent class="space-y-3">
                <Button
                  type="button"
                  variant="secondary"
                  class="h-8 w-full hover"
                  @click="addGroup"
                >
                  + Группа ({{ nextGroupKey }})
                </Button>
              </CardContent>
            </Card>

            <Card
              v-for="(groupItem, groupIndex) in groupsForLocale"
              :key="groupItem.key"
            >
              <CardHeader class="flex flex-row items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <CardTitle class="text-sm uppercase tracking-wide">
                    {{ groupItem.key }}
                  </CardTitle>
                  <button
                    type="button"
                    class="toggle-btn"
                    :aria-expanded="!isCollapsed(`group-${groupItem.key}`)"
                    aria-label="Toggle group"
                    @click="toggleSection(`group-${groupItem.key}`)"
                  >
                    {{ isCollapsed(`group-${groupItem.key}`) ? '▼' : '▲' }}
                  </button>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[11px] text-muted-foreground">
                    Кейсы: {{ getCaseKeys(groupItem.key).length }}
                  </span>
                  <div class="group-actions">
                    <Button
                      variant="outline"
                      size="icon"
                      class="icon-fab"
                      :disabled="groupIndex === 0"
                      @click="moveGroup(groupItem.key, -1)"
                    >
                      ↑
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      class="icon-fab"
                      :disabled="groupIndex === groupsForLocale.length - 1"
                      @click="moveGroup(groupItem.key, 1)"
                    >
                      ↓
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      class="icon-fab"
                      @click="removeGroup(groupItem.key)"
                    >
                      −
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <div
                class="collapsible"
                :data-open="!isCollapsed(`group-${groupItem.key}`)"
              >
                <CardContent class="space-y-4">
                  <div class="space-y-2">
                    <p class="text-sm font-medium text-foreground">
                      Название группы
                    </p>
                    <Input
                      v-model="groupItem.localeData.title"
                      :class="inputClass"
                      placeholder="Название"
                    />
                  </div>

                  <div class="space-y-2">
                    <div class="flex items-center justify-between gap-2">
                      <p class="text-sm font-medium text-foreground">
                        Кейсы
                      </p>
                      <span class="text-[11px] text-muted-foreground">
                        {{ getCaseKeys(groupItem.key).length }} шт.
                      </span>
                    </div>

                    <div class="space-y-3">
                      <div
                        v-for="(caseKey, caseIndex) in getCaseKeys(groupItem.key)"
                        :key="caseKey"
                        class="row-wrap"
                      >
                        <div class="section-box space-y-3">
                          <div :class="rowTwoCols">
                            <Input
                              v-model="slugDrafts[slugDraftKey(groupItem.key, caseKey)]"
                              :class="inputClass"
                              placeholder="slug"
                              @blur="renameCaseSlug(groupItem.key, caseKey, slugDrafts[slugDraftKey(groupItem.key, caseKey)] || '', $event.target as HTMLInputElement)"
                              @keydown.enter.prevent="renameCaseSlug(groupItem.key, caseKey, slugDrafts[slugDraftKey(groupItem.key, caseKey)] || '', $event.target as HTMLInputElement)"
                            />
                            <Input
                              v-model="groupItem.localeData.cases[caseKey].title"
                              :class="inputClass"
                              placeholder="Название"
                            />
                          </div>

                          <Textarea
                            v-model="groupItem.localeData.cases[caseKey].description"
                            :class="textareaClass"
                            placeholder="Описание"
                          />

                          <div class="case-media">
                            <div class="case-preview">
                              <img
                                v-if="getCaseImageSrc(groupItem.localeData.cases[caseKey])"
                                :src="getCaseImageSrc(groupItem.localeData.cases[caseKey])"
                                alt=""
                                class="case-thumb"
                              >
                              <div
                                v-else
                                class="case-placeholder"
                              >
                                Нет изображения
                              </div>
                            </div>
                            <label
                              class="case-upload"
                              :class="{ 'is-disabled': isSaving }"
                            >
                              <input
                                type="file"
                                accept="image/*"
                                class="hidden"
                                :disabled="isSaving"
                                @change="uploadCaseImage(groupItem.key, caseKey, ($event.target as HTMLInputElement).files, $event.target as HTMLInputElement)"
                              >
                              {{ hasPendingCaseImage(groupItem.localeData.cases[caseKey]) ? 'Выбрано' : 'Загрузить' }}
                            </label>
                          </div>

                        </div>

                        <div class="action-stack">
                          <Button
                            variant="outline"
                            size="icon"
                            class="icon-fab"
                            :disabled="caseIndex === 0"
                            @click="moveCase(groupItem.key, caseIndex, -1)"
                          >
                            ↑
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            class="icon-fab"
                            :disabled="caseIndex === getCaseKeys(groupItem.key).length - 1"
                            @click="moveCase(groupItem.key, caseIndex, 1)"
                          >
                            ↓
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            class="icon-fab"
                            @click="removeCase(groupItem.key, caseKey)"
                          >
                            −
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="secondary"
                      class="mt-2 h-8 w-full hover"
                      @click="addCase(groupItem.key)"
                    >
                      + Кейс
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>

    <div class="save-bar">
      <div class="flex flex-col items-start gap-1">
        <Alert
          v-if="saveMessage"
          class="border-[var(--strategix-accent)] bg-[var(--strategix-accent-light)] text-black box-border text-center p-3"
        >
          <AlertDescription class="text-xs font-semibold">
            {{ saveMessage }}
          </AlertDescription>
        </Alert>
        <Alert
          v-if="saveError"
          variant="destructive"
          class="bg-red-200 text-black box-border text-center p-3"
        >
          <AlertDescription class="text-xs font-semibold">
            {{ saveError }}
          </AlertDescription>
        </Alert>
      </div>
      <Button
        type="button"
        class="text-sm font-semibold"
        :disabled="isSaving"
        @click="saveProjects"
      >
        {{ isSaving ? 'Сохраняю...' : 'Сохранить' }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
:global(:root){
  --cms-panel-width: clamp(300px, 28vw, 450px);
  --cms-panel-gap: 1px;
  --cms-scale: 0.8;
}

.main{
  transform: scale(var(--cms-scale));
  transform-origin: left top;
}

.edit-json{
  width: var(--cms-panel-width);
  height: calc(var(--vh) * 100);
  max-height: calc(var(--vh) * 100);

  position: fixed;
  top: 0;
  right: 0;
  overflow: hidden;
  padding: 12px;

  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(241, 241, 241, 0.96) 0%, rgba(255, 255, 255, 0.94) 100%);
  box-shadow: -8px 0 24px rgba(32, 34, 38, 0.08);
}

.edit-card{
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 80px;

  position: relative;
}

.edit-card :deep(.grid){
  min-width: 0;
}

.edit-card :deep(.grid > *){
  min-width: 0;
}

.save-bar{
  position: fixed;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 50;
}

.row-wrap{
  position: relative;
  box-sizing: border-box;
}

.action-stack{
  position: absolute;
  top: -6px;
  right: -6px;
  transform: translate(5%, -15%);
  display: flex;
  gap: 4px;
}

.group-actions{
  display: flex;
  gap: 4px;
}

.icon-fab{
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  padding: 0;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  line-height: 1;
  font-size: 12px;
}

.toggle-btn{
  width: 18px;
  height: 18px;
  line-height: 1;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 6px;
  background: white;
  font-size: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.collapsible{
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.35s ease, opacity 0.25s ease;
}

.collapsible[data-open="true"]{
  max-height: 6000px;
  opacity: 1;
}

.section-box{
  padding: 10px;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 10px;
  background: rgba(0,0,0,0.02);
  box-sizing: border-box;
}

.case-media{
  display: flex;
  align-items: stretch;
  gap: 10px;
}

.case-preview{
  flex: 3;
  min-height: 80px;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 10px;
  overflow: hidden;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.case-thumb{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-placeholder{
  padding: 10px;
  font-size: 12px;
  color: rgba(0,0,0,0.6);
  text-align: center;
  line-height: 1.3;
}

.case-upload{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(0,0,0,0.25);
  border-radius: 10px;
  background: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  padding: 8px;
  box-sizing: border-box;
}

.case-upload.is-disabled{
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
