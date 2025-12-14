<script setup lang="ts">
import { useAttrs } from 'vue';
import { type ClassValue } from 'clsx';

import { cn } from '../../lib/cn';

interface LabelProps {
  for?: string;
  class?: ClassValue;
}

defineProps<LabelProps>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
</script>

<template>
  <label
    v-bind="{ ...attrs, class: undefined }"
    :class="cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground', attrs.class)"
  >
    <slot />
  </label>
</template>
