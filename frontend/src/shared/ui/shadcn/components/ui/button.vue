<script setup lang="ts">
import { useAttrs } from 'vue';
import { type ClassValue } from 'clsx';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:opacity-90 shadow-soft',
        ghost: 'bg-transparent text-foreground hover:bg-secondary',
        outline: 'border border-border text-foreground hover:bg-secondary',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonVariant = 'default' | 'ghost' | 'outline';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  class?: ClassValue;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'default',
  size: 'default',
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    :type="props.type"
    :disabled="props.disabled"
    :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class, attrs.class)"
  >
    <slot />
  </button>
</template>
