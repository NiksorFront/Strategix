<script setup lang="ts">
import indexContent from '@/content/pages/index.json';
import Header from '@/widgets/header';
import Welcome from '@/widgets/welcome';
import AboutUs from '@/widgets/about-us';
import Services from '@/widgets/services';
import OurProjects from '@/widgets/our-projects';
import MarketResponse from '@/widgets/market-response';
import OurTeam from '@/widgets/our-team';
import LeaveRequest from '@/widgets/leave-request';
import Footer from '@/widgets/footer';

type HomePageContent = {
  welcome?: {
    title?: string;
    subtitle?: string;
  };
  market_response?: {
    description1?: string;
  };
  footer?: {
    brand?: string;
  };
};

const { locale } = useI18n();
const currentLocale = computed(() => locale.value || 'ru');

const homeTranslations = indexContent.translations as Record<string, HomePageContent>;

const localeContent = computed(() => (
  homeTranslations[currentLocale.value] ??
  homeTranslations.ru ??
  homeTranslations.en ??
  Object.values(homeTranslations)[0] ??
  {}
));

const seoBrand = computed(() => {
  const brand = localeContent.value.footer?.brand?.trim();
  return brand || 'STRATEGIX';
});

const seoTitle = computed(() => {
  const title = localeContent.value.welcome?.title?.trim();
  return title ? `${title} | ${seoBrand.value}` : seoBrand.value;
});

const seoDescription = computed(() => {
  const subtitle = localeContent.value.welcome?.subtitle?.trim();
  if (subtitle) return subtitle;

  const fallbackDescription = localeContent.value.market_response?.description1?.trim();
  return fallbackDescription || 'Strategic reputation marketing for international markets.';
});

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
});
</script>

<template>
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
</template>
