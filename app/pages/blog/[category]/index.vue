<script setup lang="ts">
const route = useRoute();
const category = String(route.params.category ?? "");

// 未知分类直接 404
if (!isBlogCategory(category)) {
  throw createError({
    statusCode: 404,
    statusMessage: "这个分类不存在",
    fatal: true,
  });
}

const { data: posts } = await useAsyncData(`blog-category-${category}`, () =>
  queryCollection("blog")
    .where("category", "=", category)
    .order("pin", "DESC")
    .order("date", "DESC")
    .all(),
);

useSeoMeta({
  title: categoryLabel(category),
  description: `${categoryLabel(category)}分类下的全部文章。`,
});
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-6 py-12">
    <UBreadcrumb :items="[
      { label: '首页', to: '/' },
      { label: '博客', to: '/blog' },
      { label: categoryLabel(category) },
    ]" class="mb-6" />

    <header class="mb-8">
      <h1 class="flex items-center gap-2 font-serif text-3xl font-bold">
        <UIcon :name="categoryIcon(category)" class="size-7 text-primary-300" />
        {{ categoryLabel(category) }}
      </h1>
      <p class="mt-2 text-sm text-muted">{{ categoryDescription(category) }}</p>
    </header>

    <BlogCategoryNav :active="category" class="mb-6" />

    <BlogList :posts="posts" empty-title="这个分类还是空的" empty-description="换个分类看看，或者等我先写几篇" />
  </div>
</template>
