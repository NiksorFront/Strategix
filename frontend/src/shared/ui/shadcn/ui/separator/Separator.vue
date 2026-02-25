<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Separator } from "reka-ui"
import { cn } from '@/shared/ui/shadcn/lib'

const {
  class: className,
  orientation = "horizontal",
  decorative = true,
  ...delegatedProps
} = defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :orientation="orientation"
    :decorative="decorative"
    :class="
      cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className,
      )
    "
  />
</template>
