// https://nuxt.com/docs/api/configuration/nuxt-config

// eslint-disable-next-line import/no-internal-modules
import localesConfig from './src/content/locales.json';

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "src",
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxtjs/i18n"],
  app:{
    baseURL: process.env.NUXT_APP_BASE_URL ?? "/",
  },
  experimental: {
    payloadExtraction: false,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['vue', 'vue-router'],
          }
        }
      }
    },
    css: {
      devSourcemap: false,
    }
  },
  nitro: {
    preset: "github_pages",
    prerender: {
      crawlLinks: true
    },
    compressPublicAssets: true,
    minify: true
  },
  image: {
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 480,   // --mobile-width
      sm: 768,   // --tablet-width
      md: 1024,  // --laptop-width
      lg: 1440,  // --big-laptop-width
      xl: 1920,  // --mini-pc-width
      xxl: 2620, // --pc-width
    },
  },
  eslint: {
    config: {
      standalone: false, // чтобы Nuxt не тянул свои JS/TS/Vue пресеты и не конфликтовал с FSD
    },
  },
  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: ['./src/shared/ui/media.css'],
      },

      'postcss-custom-media': {},
      autoprefixer: {},
    },
  },
  i18n: {
    //Код языков опираются на https://w3schoolsrus.github.io/tags/ref_language_codes.html#gsc.tab=0
    locales: localesConfig.locales.map((l: {code: string; iso: string; name: string;}) => ({
      code: l.code,
      iso: l.iso,
      name: l.name
    })),
    defaultLocale: localesConfig.default,
    strategy: 'prefix_and_default',
  }
});