<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
      <header class="flex flex-col gap-3">
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          CMS — доступна только локально
        </p>
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="space-y-2">
            <h1 class="text-3xl font-bold">
              Рабочая зона CMS
            </h1>
            <p class="text-sm text-muted-foreground">
              Shadcn UI и tailwind подключены только в dev. При генерации /cms выпиливается из маршрутов.
            </p>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>
