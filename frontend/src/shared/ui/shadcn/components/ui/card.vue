<script setup lang="ts">
import { useAttrs } from 'vue';
import { type ClassValue } from 'clsx';

import { cn } from '../../lib/cn';

interface CardProps {
  class?: ClassValue;
}

defineProps<CardProps>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="cn('card-surface border-border text-foreground', attrs.class)"
  >
    <slot />
  </div>
</template>
