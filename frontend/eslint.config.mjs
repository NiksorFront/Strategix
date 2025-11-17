// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import featureSlicedConfig from "@uvarovag/eslint-config-feature-sliced-flat";

export default withNuxt([
  // Your custom configs here
  featureSlicedConfig({
    alias: "@",
    layers: ["app", "pages", "widgets", "features", "entities", "shared"],
  }),
]);
