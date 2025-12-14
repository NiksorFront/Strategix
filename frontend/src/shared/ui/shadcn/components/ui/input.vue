<script setup lang="ts">
import { useAttrs } from 'vue';
import { type ClassValue } from 'clsx';

import { cn } from '../../lib/cn';

interface InputProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  class?: ClassValue;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
});

const modelValue = defineModel<string | number | null>();
const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  modelValue.value = target.value;
};
</script>

<template>
  <input
    v-bind="{ ...attrs, class: undefined }"
    :value="modelValue ?? ''"
    :type="props.type"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :class="cn(
      'flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-background',
      props.class,
      attrs.class,
    )"
    @input="onInput"
  />
</template>
