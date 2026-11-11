<script setup lang="ts">
defineProps<{ active?: string }>();
</script>

<template>
  <nav aria-label="文章分类" class="flex flex-wrap items-center gap-2">
    <NuxtLink
      to="/blog"
      class="rounded-full border px-3 py-1 text-sm transition-colors"
      :class="
        !active
          ? 'border-primary-300/60 bg-primary-300/10 text-primary-300'
          : 'border-default/40 text-muted hover:border-primary-300/50 hover:text-default'
      "
    >
      全部
    </NuxtLink>

    <NuxtLink
      v-for="category in blogCategories"
      :key="category.value"
      :to="`/blog/${category.value}`"
      class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors"
      :class="
        active === category.value
          ? 'border-primary-300/60 bg-primary-300/10 text-primary-300'
          : 'border-default/40 text-muted hover:border-primary-300/50 hover:text-default'
      "
    >
      <UIcon :name="category.icon" class="size-3.5" />
      {{ category.label }}
    </NuxtLink>
  </nav>
</template>
