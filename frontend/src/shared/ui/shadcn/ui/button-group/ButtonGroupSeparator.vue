<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from '@/shared/ui/shadcn/lib'
import { Separator } from '@/shared/ui/shadcn/ui/separator'

const {
  class: className,
  orientation = "vertical",
  ...delegatedProps
} = defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <Separator
    data-slot="button-group-separator"
    v-bind="delegatedProps"
    :orientation="orientation"
    :class="cn(
      'bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto',
      className,
    )"
  />
</template>
