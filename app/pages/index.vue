<template>
  <div class="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-20 text-center">
    <div class="flex flex-col items-center gap-4">
      <h1 class="font-header text-5xl font-bold text-primary-300 sm:text-6xl">
        Mixsu Studio
      </h1>
      <p class="font-serif text-base text-muted">—— 让生活慢下来 ——</p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-3">
      <UButton to="/blog" size="lg" color="primary" variant="outline" icon="i-lucide-notebook-pen" label="进入博客" />
      <UButton to="/about" size="lg" color="neutral" variant="ghost" icon="i-lucide-user-round" label="关于我" />
    </div>
  </div>
</template>
