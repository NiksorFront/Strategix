<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/shadcn/ui/alert';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/ui/card';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { ScrollArea, ScrollBar } from '@/shared/ui/shadcn/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/shadcn/ui/tabs';
import { Textarea } from '@/shared/ui/shadcn/ui/textarea';
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
type NavItem = { text: string; href: string }
type LocaleTranslation = Record<string, any>
type TranslationsMap = Record<string, LocaleTranslation>
type ServiceKey = 'reputation' | 'media' | 'branding' | 'production' | 'events' | 'aiMarketing' | 'ads'

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const baseTranslations = (indexPageContent.translations || {}) as TranslationsMap;
const editedTranslations = ref<TranslationsMap>({});

const locales = computed<LocaleConfig[]>(() => localesConfig?.locales || []);
const initialActiveLocale = locales.value[0]?.code || Object.keys(baseTranslations)[0] || '';
const activeLocale = ref(initialActiveLocale);

const isSaving = ref(false);
const saveMessage = ref('');
const saveError = ref('');

const welcomeLinkMode = reactive<Record<string, 'urls' | 'flat'>>({});

const serviceCards: { key: ServiceKey; label: string }[] = [
  { key: 'reputation', label: 'Reputation' },
  { key: 'media', label: 'Media' },
  { key: 'branding', label: 'Branding' },
  { key: 'production', label: 'Production' },
  { key: 'events', label: 'Events' },
  { key: 'aiMarketing', label: 'AI Marketing' },
  { key: 'ads', label: 'Ads' },
];

const defaultSectionIds = ['#header', '#welcome', '#about-us', '#services', '#our-projects', '#market-response', '#contacts', '#our-team', '#leave-request'];

const ensureDefaults = (localeData: LocaleTranslation) => {
  localeData.header ??= {};
  const header = localeData.header;
  if (!Array.isArray(header.navigation_desktop)) header.navigation_desktop = [];
  header.button ??= { text: '', href: '#contacts' };
  header.mobile_menu ??= {};
  if (!Array.isArray(header.mobile_menu.navigation_mobile)) header.mobile_menu.navigation_mobile = [];
  if (header.mobile_menu.navigation_mobile.length === 0) {
    header.mobile_menu.navigation_mobile.push({ text: '', href: defaultSectionIds[0] });
  }
  header.mobile_menu.button ??= { text: '', href: header.button?.href || '#contacts' };

  localeData.welcome ??= {};
  const welcome = localeData.welcome;
  welcome.button ??= { text: '', href: '#contacts' };
  if (!welcome.urls || typeof welcome.urls !== 'object') {
    welcome.urls = {};
  }
  if (Array.isArray(welcome.urls)) {
    const normalized: Record<string, { text: string; href: string }> = {};
    welcome.urls.forEach((entry: any, idx: number) => {
      normalized[`button${idx + 1}`] = entry;
    });
    welcome.urls = normalized;
  }

  localeData.about_us ??= { title: '', items: [] };
  if (!Array.isArray(localeData.about_us.items)) localeData.about_us.items = [];
  if (localeData.about_us.items.length === 0) {
    localeData.about_us.items.push({ title: '', subtitle: '', content: '' });
  }

  localeData.services ??= { title: '' };
  const services = localeData.services;
  serviceCards.forEach(({ key }) => {
    services[key] ??= { title: '', description: '', lead: '', bullets: [''], text: '' };
    if (!Array.isArray(services[key].bullets) || services[key].bullets.length === 0) {
      services[key].bullets = [''];
    }
  });
  services.questions ??= { title: '', description: '', email: '' };

  localeData.our_projects ??= localeData.our_projects || {};

  localeData.market_response ??= { title: '', description1: '', description2: '' };

  localeData.our_team ??= { firstcard: { title: '', description: '' }, members: [], lastcard: { title: '', description: '', email: '' } };
  const team = localeData.our_team;
  team.firstcard ??= { title: '', description: '' };
  if (!Array.isArray(team.members)) team.members = [];
  team.lastcard ??= { title: '', description: '', email: '' };

  localeData.leave_request ??= { contacts: {}, form: {}, agree: {} };
  const contacts = localeData.leave_request.contacts ??= {};
  contacts.title ??= '';
  contacts.email ??= '';
  contacts.phone ??= '';
  contacts.telegram ??= { text: '', href: '' };
  contacts.whatsapp ??= { text: '', href: '' };
  const form = localeData.leave_request.form ??= {};
  form.title ??= '';
  form.name ??= '';
  form.phone ??= '';
  form.title2 ??= '';
  form.question ??= '';
  form.question2 ??= '';
  form.button ??= '';

  localeData.footer ??= { brand: '', rights: '', privacy_policy: { text: '', href: '' }, email: '', icon1: { src: '', href: '' }, icon2: { src: '', href: '' } };
  localeData.footer.privacy_policy ??= { text: '', href: '' };
  localeData.footer.icon1 ??= { src: '', href: '' };
  localeData.footer.icon2 ??= { src: '', href: '' };
};

const initializeTranslations = () => {
  const filled: TranslationsMap = {};
  const codes = locales.value.map((loc) => loc.code);

  codes.forEach((code) => {
    const source = baseTranslations[code] ? clone(baseTranslations[code]) : {};
    ensureDefaults(source);
    filled[code] = source;
    const welcome = source?.welcome || {};
    welcomeLinkMode[code] = welcome.urls ? 'urls' : 'flat';
  });

  Object.keys(baseTranslations).forEach((code) => {
    if (filled[code]) return;
    const source = clone(baseTranslations[code] || {});
    ensureDefaults(source);
    filled[code] = source;
    const welcome = source?.welcome || {};
    welcomeLinkMode[code] = welcome.urls ? 'urls' : 'flat';
  });

  editedTranslations.value = filled;
};

initializeTranslations();

const currentLocaleData = computed(() =>
  editedTranslations.value[activeLocale.value] ||
  editedTranslations.value[locales.value[0]?.code as string] ||
  ({} as LocaleTranslation),
);

const sectionIdOptions = computed(() => {
  const ids = new Set(defaultSectionIds);
  Object.values(editedTranslations.value).forEach((locale) => {
    const header = locale?.header || {};
    (header.navigation_desktop || []).forEach((item: NavItem) => item?.href && ids.add(item.href));
    (header.mobile_menu?.navigation_mobile || []).forEach((item: NavItem) => item?.href && ids.add(item.href));
  });
  return Array.from(ids);
});

const desktopNavCharCount = computed(() =>
  (currentLocaleData.value.header.navigation_desktop || []).reduce(
    (acc: number, item: NavItem) => acc + (item?.text?.length || 0),
    0,
  ),
);
const desktopNavError = computed(() => desktopNavCharCount.value > 40);
const hasBlockingErrors = computed(() => desktopNavError.value);

const hasLongWord = (text: string) => /\S{11,}/.test(text || '');
const mobileNavWarnings = computed(() =>
  (currentLocaleData.value.header.mobile_menu.navigation_mobile || []).map((item: NavItem) =>
    hasLongWord(item?.text || ''),
  ),
);

const welcomeButtonsList = computed(() => {
  const welcome = currentLocaleData.value.welcome;
  const container = welcomeLinkMode[activeLocale.value] === 'urls' ? welcome.urls : welcome;
  const entries = Object.entries(container || {}).filter(
    ([key, value]) => /^button\d+/.test(key) && value && typeof value === 'object',
  );
  return entries.map(([key, value]) => ({ key, value: value as { text: string; href: string } }));
});

const addDesktopNav = () => {
  const header = currentLocaleData.value.header;
  header.navigation_desktop.push({ text: '', href: sectionIdOptions.value[0] || '#header' });
};

const removeDesktopNav = (index: number) => {
  const nav = currentLocaleData.value.header.navigation_desktop;
  nav.splice(index, 1);
};

const addMobileNav = () => {
  const nav = currentLocaleData.value.header.mobile_menu.navigation_mobile;
  if (nav.length >= 5) return;
  nav.push({ text: '', href: sectionIdOptions.value[0] || '#header' });
};

const removeMobileNav = (index: number) => {
  const nav = currentLocaleData.value.header.mobile_menu.navigation_mobile;
  if (nav.length <= 1) return;
  nav.splice(index, 1);
};

const addWelcomeLink = () => {
  const welcome = currentLocaleData.value.welcome;
  const container = welcomeLinkMode[activeLocale.value] === 'urls' ? welcome.urls : welcome;
  const nextIndex = Object.keys(container || {}).filter((key) => key.startsWith('button')).length + 1;
  container[`button${nextIndex}`] = { text: '', href: '' };
};

const removeWelcomeLink = (key: string) => {
  const welcome = currentLocaleData.value.welcome;
  const container = welcomeLinkMode[activeLocale.value] === 'urls' ? welcome.urls : welcome;
  delete container[key];
};

const addAboutItem = () => {
  currentLocaleData.value.about_us.items.push({ title: '', subtitle: '', content: '' });
};

const removeAboutItem = (index: number) => {
  const items = currentLocaleData.value.about_us.items;
  if (items.length <= 1) return;
  items.splice(index, 1);
};

const moveAboutItem = (index: number, direction: number) => {
  const items = currentLocaleData.value.about_us.items;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= items.length) return;
  const [item] = items.splice(index, 1);
  items.splice(targetIndex, 0, item);
};

const moveDesktopNav = (index: number, direction: number) => {
  const items = currentLocaleData.value.header.navigation_desktop;
  const target = index + direction;
  if (target < 0 || target >= items.length) return;
  const [item] = items.splice(index, 1);
  items.splice(target, 0, item);
};

const moveMobileNav = (index: number, direction: number) => {
  const items = currentLocaleData.value.header.mobile_menu.navigation_mobile;
  const target = index + direction;
  if (target < 0 || target >= items.length) return;
  const [item] = items.splice(index, 1);
  items.splice(target, 0, item);
};

const addServiceBullet = (key: ServiceKey) => {
  const bullets = currentLocaleData.value.services[key].bullets;
  bullets.push('');
};

const moveServiceBullet = (key: ServiceKey, index: number, direction: number) => {
  const bullets = currentLocaleData.value.services[key].bullets;
  const target = index + direction;
  if (target < 0 || target >= bullets.length) return;
  const [item] = bullets.splice(index, 1);
  bullets.splice(target, 0, item);
};

const removeServiceBullet = (key: ServiceKey, index: number) => {
  const bullets = currentLocaleData.value.services[key].bullets;
  if (bullets.length <= 1) return;
  bullets.splice(index, 1);
};

const addTeamMember = () => {
  currentLocaleData.value.our_team.members.push({ src: '', name: '', lastname: '', position: '' });
};

const moveTeamMember = (index: number, direction: number) => {
  const members = currentLocaleData.value.our_team.members;
  const target = index + direction;
  if (target < 0 || target >= members.length) return;
  const [item] = members.splice(index, 1);
  members.splice(target, 0, item);
};

const removeTeamMember = (index: number) => {
  const members = currentLocaleData.value.our_team.members;
  members.splice(index, 1);
};

const inputClass = 'h-8 px-3 py-2 text-sm leading-tight w-full box-border';
const selectTriggerClass = 'h-8 w-full justify-between';
const textareaClass = 'w-full box-border resize-vertical min-h-[88px] px-3 py-2 text-sm leading-tight';
const rowTwoCols = 'grid w-full box-border grid-cols-[55%_43%] gap-[2%] items-center';
const rowTwoColsTop = 'grid w-full box-border grid-cols-[55%_43%] gap-[2%] items-start';
const twoColGrid = 'grid w-full box-border grid-cols-2 gap-[3%]';

const saveIndex = async () => {
  if (hasBlockingErrors.value) {
    saveError.value = 'Сначала исправьте ошибки перед сохранением.';
    return;
  }
  isSaving.value = true;
  saveMessage.value = '';
  saveError.value = '';
  try {
    const payload = { ...indexPageContent, translations: clone(editedTranslations.value) };
    const response = await fetch('/api/cms', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(text || `Ошибка сохранения (${response.status})`);
    }

    saveMessage.value = 'Сохранено в файл';
  } catch (error: any) {
    saveError.value = error?.data?.message || error?.message || 'Не удалось сохранить изменения.';
  } finally {
    isSaving.value = false;
  }
};
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
    <ScrollArea class="w-full h-full">
      <div class="edit-card p-3 box-border">
        <div class="flex items-center justify-between gap-2">
          <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            index.json
          </p>
          <span class="text-[11px] text-muted-foreground/80">
            {{ activeLocale }}
          </span>
        </div>

        <Tabs
          v-model:model-value="activeLocale"
          class="space-y-3"
        >
          <TabsList class="flex flex-wrap justify-between gap-2 bg-muted/70">
            <TabsTrigger
              v-for="tab in locales"
              :key="tab.code"
              :value="tab.code"
              class="w-[48%] flex items-center gap-2 text-sm rounded-lg"
            >
              <span class="font-semibold">{{ tab.name }}</span>
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
                  Header
                </CardTitle>
                <span class="text-[11px] text-muted-foreground">
                  Навигация: {{ desktopNavCharCount }}/40
                </span>
              </CardHeader>
              <CardContent class="space-y-4">
                <div>
                  <div class="mb-1 text-sm font-medium text-foreground">
                    Навигация на пк
                  </div>
                  <Alert
                    v-if="desktopNavError"
                    variant="destructive"
                    class="mb-2"
                  >
                    <AlertTitle>Лимит 40 символов</AlertTitle>
                    <AlertDescription>
                      Превышено 40 символов. Удалите пункт или сократите текст.
                    </AlertDescription>
                  </Alert>
                  <div class="space-y-2">
                    <div
                      v-for="(item, index) in currentLocaleData.header.navigation_desktop"
                      :key="`nav-${index}`"
                      class="row-wrap"
                    >
                      <div :class="rowTwoCols">
                        <Input
                          v-model="item.text"
                          :class="inputClass"
                          placeholder="Текст"
                        />
                        <Select v-model="item.href">
                          <SelectTrigger :class="selectTriggerClass">
                            <SelectValue placeholder="Секция" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              v-for="id in sectionIdOptions"
                              :key="id"
                              :value="id"
                            >
                              {{ id }}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div class="action-stack">
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="index === 0"
                          @click="moveDesktopNav(index, -1)"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="index === currentLocaleData.header.navigation_desktop.length - 1"
                          @click="moveDesktopNav(index, 1)"
                        >
                          ↓
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          @click="removeDesktopNav(index)"
                        >
                          −
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    class="mt-2 h-8 w-full"
                    @click="addDesktopNav"
                  >
                    + Добавить пункт
                  </Button>
                </div>

                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Кнопка ведущая к форме на пк
                  </p>
                  <Input
                    v-model="currentLocaleData.header.button.text"
                    :class="inputClass"
                    placeholder="Текст кнопки"
                  />
                </div>

                <div>
                  <div class="mb-1 flex items-center justify-between">
                    <p class="text-sm font-medium text-foreground">
                      Навигация в боковом меню на телефоне
                    </p>
                    <p class="text-[11px] text-muted-foreground">
                      {{ currentLocaleData.header.mobile_menu.navigation_mobile.length }}/5
                    </p>
                  </div>
                  <div class="space-y-2">
                    <div
                      v-for="(item, index) in currentLocaleData.header.mobile_menu.navigation_mobile"
                      :key="`mobile-${index}`"
                      class="row-wrap"
                    >
                      <div :class="rowTwoColsTop">
                        <div class="space-y-1">
                          <Input
                            v-model="item.text"
                            :class="inputClass"
                            placeholder="Текст"
                          />
                          <Alert
                            v-if="mobileNavWarnings[index]"
                            class="border-amber-200 bg-amber-50 text-amber-800"
                          >
                            <AlertDescription class="text-[11px]">
                              >10 символов подряд без пробелов — вёрстка может поехать.
                            </AlertDescription>
                          </Alert>
                        </div>
                        <Select v-model="item.href">
                          <SelectTrigger :class="selectTriggerClass">
                            <SelectValue placeholder="Секция" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              v-for="id in sectionIdOptions"
                              :key="id"
                              :value="id"
                            >
                              {{ id }}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div class="action-stack">
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="index === 0"
                          @click="moveMobileNav(index, -1)"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="index === currentLocaleData.header.mobile_menu.navigation_mobile.length - 1"
                          @click="moveMobileNav(index, 1)"
                        >
                          ↓
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="currentLocaleData.header.mobile_menu.navigation_mobile.length <= 1"
                          @click="removeMobileNav(index)"
                        >
                          −
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    class="mt-2 h-8 w-full"
                    :disabled="currentLocaleData.header.mobile_menu.navigation_mobile.length >= 5"
                    @click="addMobileNav"
                  >
                    + Добавить пункт
                  </Button>
                </div>

                <div class="space-y-1">
                  <p class=" text-sm font-medium text-foreground">
                    Кнопка ведущая к форме в боковом меню на телефоне
                  </p>
                  <Input
                    v-model="currentLocaleData.header.mobile_menu.button.text"
                    placeholder="Текст кнопки"
                    :class="inputClass"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="mb-1">
                <CardTitle class="text-sm uppercase tracking-wide">
                  Welcome
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Заголовок
                  </p>
                  <Textarea
                    v-model="currentLocaleData.welcome.title"
                    :class="textareaClass"
                    placeholder="Текст заголовка"
                  />
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Подзаголовок
                  </p>
                  <Textarea
                    v-model="currentLocaleData.welcome.subtitle"
                    :class="textareaClass"
                    placeholder="Текст подзаголовка"
                  />
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Кнопка ведущая на форму заолнения
                  </p>
                  <Input
                    v-model="currentLocaleData.welcome.button.text"
                    :class="inputClass"
                    placeholder="Текст кнопки"
                  />
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-foreground">
                      Кнопки со ссылками
                    </p>
                    <p class="text-[11px] text-muted-foreground">
                      {{ welcomeButtonsList.length }} шт.
                    </p>
                  </div>
                  <div class="space-y-2">
                    <div
                      v-for="link in welcomeButtonsList"
                      :key="link.key"
                      class="row-wrap"
                    >
                      <div :class="rowTwoCols">
                        <Input
                          v-model="link.value.text"
                          :class="inputClass"
                          placeholder="Текст"
                        />
                        <Input
                          v-model="link.value.href"
                          :class="inputClass"
                          placeholder="Ссылка"
                        />
                      </div>
                      <div class="action-stack">
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          @click="removeWelcomeLink(link.key)"
                        >
                          −
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    class="h-8 w-full"
                    @click="addWelcomeLink"
                  >
                    + Добавить кнопку
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="mb-1">
                <CardTitle class="text-sm uppercase tracking-wide">
                  About us
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Заголовок
                  </p>
                  <Input
                    v-model="currentLocaleData.about_us.title"
                    :class="inputClass"
                    placeholder="Заголовок"
                  />
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-foreground">
                      Пункты
                    </p>
                    <p class="text-[11px] text-muted-foreground">
                      {{ currentLocaleData.about_us.items.length }} шт.
                    </p>
                  </div>
                  <div class="space-y-3">
                    <Card
                      v-for="(item, index) in currentLocaleData.about_us.items"
                      :key="`about-${index}`"
                      class="bg-card/80 row-wrap"
                    >
                      <CardHeader class="pb-2">
                        <CardTitle class="text-[12px] uppercase tracking-wide text-muted-foreground">
                          Пункт {{ index + 1 }}
                        </CardTitle>
                      </CardHeader>
                      <CardContent class="space-y-3">
                        <Input
                          v-model="item.title"
                          :class="inputClass"
                          placeholder="Заголовок"
                        />
                        <Input
                          v-model="item.subtitle"
                          :class="inputClass"
                          placeholder="Подзаголовок"
                        />
                        <Textarea
                          v-model="item.content"
                          class="min-h-[96px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                          placeholder="Контент"
                        />
                      </CardContent>
                      <div class="action-stack">
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="index === 0"
                          @click="moveAboutItem(index, -1)"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="index === currentLocaleData.about_us.items.length - 1"
                          @click="moveAboutItem(index, 1)"
                        >
                          ↓
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="currentLocaleData.about_us.items.length <= 1"
                          @click="removeAboutItem(index)"
                        >
                          −
                        </Button>
                      </div>
                    </Card>
                  </div>
                  <Button
                    variant="secondary"
                    class="h-8 w-full"
                    @click="addAboutItem"
                  >
                    + Добавить пункт
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="mb-1">
                <CardTitle class="text-sm uppercase tracking-wide">
                  Services
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Заголовок
                  </p>
                  <Input
                    v-model="currentLocaleData.services.title"
                    :class="inputClass"
                    placeholder="Заголовок секции"
                  />
                </div>

                <div class="space-y-3">
                  <Card
                    v-for="card in serviceCards"
                    :key="card.key"
                    class="bg-card/80"
                  >
                    <CardHeader class="flex items-center justify-between pb-2">
                      <CardTitle class="text-[12px] uppercase tracking-wide text-muted-foreground">
                        {{ card.label }}
                      </CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-3">
                      <Input
                        v-model="currentLocaleData.services[card.key].title"
                        :class="inputClass"
                        placeholder="Заголовок"
                      />
                      <Textarea
                        v-model="currentLocaleData.services[card.key].description"
                        class="min-h-[72px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                        placeholder="Описание"
                      />
                      <Textarea
                        v-model="currentLocaleData.services[card.key].lead"
                        class="min-h-[72px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                        placeholder="Заголовок модального окна"
                      />
                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <p class="text-sm font-medium text-foreground">
                            Пункты
                          </p>
                          <p class="text-[11px] text-muted-foreground">
                            {{ currentLocaleData.services[card.key].bullets.length }} шт.
                          </p>
                        </div>
                        <div class="space-y-2">
                          <div
                            v-for="(bullet, bulletIndex) in currentLocaleData.services[card.key].bullets"
                            :key="`bullet-${card.key}-${bulletIndex}`"
                            class="row-wrap"
                          >
                            <Textarea
                              v-model="currentLocaleData.services[card.key].bullets[bulletIndex]"
                              class="min-h-[60px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                              placeholder="Текст пункта"
                            />
                            <div class="action-stack">
                              <Button
                                variant="outline"
                                size="icon"
                                class="icon-fab"
                                :disabled="bulletIndex === 0"
                                @click="moveServiceBullet(card.key, bulletIndex, -1)"
                              >
                                ↑
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                class="icon-fab"
                                :disabled="bulletIndex === currentLocaleData.services[card.key].bullets.length - 1"
                                @click="moveServiceBullet(card.key, bulletIndex, 1)"
                              >
                                ↓
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                class="icon-fab"
                                :disabled="currentLocaleData.services[card.key].bullets.length <= 1"
                                @click="removeServiceBullet(card.key, bulletIndex)"
                              >
                                −
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="secondary"
                          class="h-8 w-full"
                          @click="addServiceBullet(card.key)"
                        >
                          + Добавить пункт
                        </Button>
                      </div>
                      <Textarea
                        v-model="currentLocaleData.services[card.key].text"
                        class="min-h-[96px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                        placeholder="Текст модального окна"
                      />
                    </CardContent>
                  </Card>
                </div>

                <Card class="bg-card/80">
                  <CardHeader class="pb-2">
                    <CardTitle class="text-[12px] uppercase tracking-wide text-muted-foreground">
                      Questions (mobile/tablet)
                    </CardTitle>
                  </CardHeader>
                  <CardContent class="space-y-3">
                    <Input
                      v-model="currentLocaleData.services.questions.title"
                      :class="inputClass"
                      placeholder="Заголовок"
                    />
                    <Textarea
                      v-model="currentLocaleData.services.questions.description"
                      class="min-h-[72px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                      placeholder="Подзаголовок"
                    />
                    <Input
                      v-model="currentLocaleData.services.questions.email"
                      type="email"
                      :class="inputClass"
                      placeholder="Почта"
                    />
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="mb-1">
                <CardTitle class="text-sm uppercase tracking-wide">
                  Our projects
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-foreground">
                    Фильтрация
                  </p>
                  <label class="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      v-model="currentLocaleData.our_projects.enable"
                      type="checkbox"
                      class="h-4 w-4"
                    >
                    <span>Включить</span>
                  </label>
                </div>

                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Заголовок
                  </p>
                  <Input
                    v-model="currentLocaleData.our_projects.title"
                    :class="inputClass"
                    placeholder="Заголовок секции"
                  />
                </div>

                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Фильтры
                  </p>
                  <Input
                    v-model="currentLocaleData.our_projects.filters[0]"
                    :class="inputClass"
                    placeholder="Первое слово фильтра"
                  />
                  <p class="text-xs text-muted-foreground">
                    Остальные фильтры и сами проекты редактируются на странице проектов.
                    <a
                      href="http://localhost:3000/cms/"
                      class="font-semibold underline"
                      target="_blank"
                    >
                      Перейти в редактор проектов
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="mb-1">
                <CardTitle class="text-sm uppercase tracking-wide">
                  Market response
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <Input
                  v-model="currentLocaleData.market_response.title"
                  :class="inputClass"
                  placeholder="Заголовок"
                />
                <Textarea
                  v-model="currentLocaleData.market_response.description1"
                  class="min-h-[72px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                  placeholder="Описание 1"
                />
                <Textarea
                  v-model="currentLocaleData.market_response.description2"
                  class="min-h-[72px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                  placeholder="Описание 2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="mb-1">
                <CardTitle class="text-sm uppercase tracking-wide">
                  Our team
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Первая карточка
                  </p>
                  <Input
                    v-model="currentLocaleData.our_team.firstcard.title"
                    :class="inputClass"
                    placeholder="Заголовок"
                  />
                  <Textarea
                    v-model="currentLocaleData.our_team.firstcard.description"
                    class="min-h-[72px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                    placeholder="Описание"
                  />
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-foreground">
                      Команда
                    </p>
                    <p class="text-[11px] text-muted-foreground">
                      {{ currentLocaleData.our_team.members.length }} чел.
                    </p>
                  </div>
                  <div class="space-y-3">
                    <Card
                      v-for="(member, index) in currentLocaleData.our_team.members"
                      :key="`member-${index}`"
                      class="bg-card/80 row-wrap"
                    >
                      <CardHeader class="pb-2">
                        <CardTitle class="text-[12px] uppercase tracking-wide text-muted-foreground">
                          Участник {{ index + 1 }}
                        </CardTitle>
                      </CardHeader>
                      <CardContent class="grid w-full grid-cols-2 gap-[3%] box-border">
                        <Input
                          v-model="member.src"
                          :class="inputClass"
                          placeholder="Изображение (svg/путь)"
                        />
                        <Input
                          v-model="member.position"
                          :class="inputClass"
                          placeholder="Должность"
                        />
                        <Input
                          v-model="member.name"
                          :class="inputClass"
                          placeholder="Имя"
                        />
                        <Input
                          v-model="member.lastname"
                          :class="inputClass"
                          placeholder="Фамилия"
                        />
                      </CardContent>
                      <div class="action-stack">
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="index === 0"
                          @click="moveTeamMember(index, -1)"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          :disabled="index === currentLocaleData.our_team.members.length - 1"
                          @click="moveTeamMember(index, 1)"
                        >
                          ↓
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          class="icon-fab"
                          @click="removeTeamMember(index)"
                        >
                          −
                        </Button>
                      </div>
                    </Card>
                  </div>
                  <Button
                    variant="secondary"
                    class="h-8 w-full"
                    @click="addTeamMember"
                  >
                    + Добавить участника
                  </Button>
                </div>

                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Последняя карточка
                  </p>
                  <Input
                    v-model="currentLocaleData.our_team.lastcard.title"
                    :class="inputClass"
                    placeholder="Заголовок"
                  />
                  <Textarea
                    v-model="currentLocaleData.our_team.lastcard.description"
                    class="min-h-[72px] w-full box-border resize-vertical px-3 py-2 text-sm leading-tight"
                    placeholder="Подзаголовок"
                  />
                  <Input
                    v-model="currentLocaleData.our_team.lastcard.email"
                    type="email"
                    :class="inputClass"
                    placeholder="Почта"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="mb-1">
                <CardTitle class="text-sm uppercase tracking-wide">
                  Leave request
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Контакты
                  </p>
                  <Input
                    v-model="currentLocaleData.leave_request.contacts.title"
                    :class="inputClass"
                    placeholder="Заголовок"
                  />
                  <div class="grid grid-cols-2 gap-[3%] box-border">
                    <Input
                      v-model="currentLocaleData.leave_request.contacts.email"
                      type="email"
                      :class="inputClass"
                      placeholder="Почта"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.contacts.phone"
                      :class="inputClass"
                      placeholder="Телефон"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.contacts.telegram.text"
                      :class="inputClass"
                      placeholder="Telegram текст"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.contacts.telegram.href"
                      :class="inputClass"
                      placeholder="Telegram ссылка"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.contacts.whatsapp.text"
                      :class="inputClass"
                      placeholder="WhatsApp текст"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.contacts.whatsapp.href"
                      :class="inputClass"
                      placeholder="WhatsApp ссылка"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Форма
                  </p>
                  <div class="grid grid-cols-2 gap-[3%] box-border">
                    <Input
                      v-model="currentLocaleData.leave_request.form.title"
                      :class="inputClass"
                      placeholder="Заголовок 1"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.form.name"
                      :class="inputClass"
                      placeholder="Имя"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.form.phone"
                      :class="inputClass"
                      placeholder="Телефон"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.form.title2"
                      :class="inputClass"
                      placeholder="Заголовок 2"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.form.question"
                      :class="inputClass"
                      placeholder="Вопрос 1"
                    />
                    <Input
                      v-model="currentLocaleData.leave_request.form.question2"
                      :class="inputClass"
                      placeholder="Вопрос 2"
                    />
                  </div>
                  <Input
                    v-model="currentLocaleData.leave_request.form.button"
                    :class="inputClass"
                    placeholder="Текст кнопки"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="mb-1">
                <CardTitle class="text-sm uppercase tracking-wide">
                  Footer
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Имя компании
                  </p>
                  <Input
                    v-model="currentLocaleData.footer.brand"
                    :class="inputClass"
                    placeholder="Имя компании"
                  />
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Годы и права
                  </p>
                  <Input
                    v-model="currentLocaleData.footer.rights"
                    :class="inputClass"
                    placeholder="Права"
                  />
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Политика конфиденциальности
                  </p>
                  <div class="grid grid-cols-2 gap-[3%] box-border">
                    <Input
                      v-model="currentLocaleData.footer.privacy_policy.text"
                      :class="inputClass"
                      placeholder="Текст"
                    />
                    <Input
                      v-model="currentLocaleData.footer.privacy_policy.href"
                      :class="inputClass"
                      placeholder="Ссылка на PDF"
                    />
                  </div>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Почта
                  </p>
                  <Input
                    v-model="currentLocaleData.footer.email"
                    type="email"
                    :class="inputClass"
                    placeholder="Email"
                  />
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    Иконки
                  </p>
                  <div class="grid grid-cols-2 gap-[3%] box-border">
                    <Input
                      v-model="currentLocaleData.footer.icon1.src"
                      :class="inputClass"
                      placeholder="Icon1 (svg/путь)"
                    />
                    <Input
                      v-model="currentLocaleData.footer.icon1.href"
                      :class="inputClass"
                      placeholder="Icon1 ссылка"
                    />
                    <Input
                      v-model="currentLocaleData.footer.icon2.src"
                      :class="inputClass"
                      placeholder="Icon2 (svg/путь)"
                    />
                    <Input
                      v-model="currentLocaleData.footer.icon2.href"
                      :class="inputClass"
                      placeholder="Icon2 ссылка"
                    />
                  </div>
                </div>
              </CardContent>
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
          class="border-emerald-200 bg-emerald-50 text-emerald-700"
        >
          <AlertDescription class="text-xs font-semibold">
            {{ saveMessage }}
          </AlertDescription>
        </Alert>
        <Alert
          v-if="saveError"
          variant="destructive"
        >
          <AlertDescription class="text-xs font-semibold">
            {{ saveError }}
          </AlertDescription>
        </Alert>
      </div>
      <Button
        type="button"
        class="text-sm font-semibold"
        :disabled="isSaving || hasBlockingErrors"
        @click="saveIndex"
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
  --cms-scale: clamp(0.1, calc(1 - (var(--cms-panel-width) + var(--cms-panel-gap)) / 100vw), 0.9);
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
</style>
