// @ts-nocheck
import withNuxt from "./.nuxt/eslint.config.mjs";
import featureSlicedConfig from "@uvarovag/eslint-config-feature-sliced-flat";
import pluginVue from 'eslint-plugin-vue'

export default withNuxt(
  //Глобальные игноры
  {
    ignores: ['.nuxt/**', '**/*.d.ts']
  },

  // Подключаем Vue 3 пресет (подключит плагин "vue" и его правила)
  ...pluginVue.configs['flat/recommended'],
  
  // добавляем FSD-конфиги
  ...featureSlicedConfig,
  // сюда же можно дописывать свои flat-конфиги, если понадобятся
  // { files: ['**/*.ts'], rules: { 'no-console': 'off' } },

  // отключаем multi-word только для страниц
  {
    files: ['src/pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  }
)
