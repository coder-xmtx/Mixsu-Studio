<script setup lang="ts">
const route = useRoute();

const { data: post } = await useAsyncData(`blog-post-${route.path}`, () =>
  queryCollection("blog").path(route.path).first(),
);

// 路径能匹配到动态路由，但文章不存在时给真正的 404，而不是白屏 200
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "找不到这篇文章",
    fatal: true,
  });
}

// 相邻文章：只取需要的字段，避免把正文都带上
const { data: siblings } = await useAsyncData("blog-neighbors", () =>
  queryCollection("blog").select("path", "title", "date").order("date", "DESC").all(),
);

const currentIndex = computed(() =>
  (siblings.value ?? []).findIndex((item) => item.path === route.path),
);

// 列表是时间倒序：index-1 更新，index+1 更旧
const newerPost = computed(() =>
  currentIndex.value > 0 ? siblings.value?.[currentIndex.value - 1] : undefined,
);

const olderPost = computed(() => {
  const list = siblings.value ?? [];
  return currentIndex.value >= 0 && currentIndex.value < list.length - 1
    ? list[currentIndex.value + 1]
    : undefined;
});

const formattedDate = computed(() => formatPostDate(post.value?.date));
const isoDate = computed(() => toIsoDate(post.value?.date));

const breadcrumbItems = computed(() => [
  { label: "首页", to: "/" },
  { label: "博客", to: "/blog" },
  {
    label: categoryLabel(post.value?.category),
    to: `/blog/${post.value?.category}`,
  },
  { label: post.value?.title ?? "" },
]);

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogType: "article",
  articlePublishedTime: isoDate.value,
  ogImage: post.value.cover,
});
</script>

<template>
  <div class="mx-auto w-full max-w-5xl px-6 py-10" v-if="post">
    <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

    <header class="border-b border-default/40 pb-6">
      <h1 class="font-serif text-3xl font-bold text-pretty text-highlighted sm:text-4xl">
        {{ post.title }}
      </h1>

      <p v-if="post.description" class="mt-3 text-lg text-pretty text-muted">
        {{ post.description }}
      </p>

      <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
        <time v-if="formattedDate" :datetime="isoDate">{{ formattedDate }}</time>

        <NuxtLink v-if="post.category" :to="`/blog/${post.category}`"
          class="inline-flex items-center gap-1 transition-colors hover:text-primary-300">
          <UIcon :name="categoryIcon(post.category)" class="size-3.5" />
          {{ categoryLabel(post.category) }}
        </NuxtLink>

        <NuxtLink v-for="tag in post.tags ?? []" :key="tag" :to="{ path: '/blog', query: { tag } }"
          class="rounded-full px-2 py-0.5 text-xs text-dimmed transition-colors hover:bg-elevated/60 hover:text-primary-300">
          #{{ tag }}
        </NuxtLink>
      </div>
    </header>

    <div class="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-10">
      <div class="min-w-0">
        <NuxtImg v-if="post.cover" :src="post.cover" :alt="`《${post.title}》的封面`" width="768" height="432" format="webp"
          class="mb-8 w-full rounded-xl" />

        <ContentRenderer :value="post" />

        <!-- 上一篇 / 下一篇 -->
        <nav v-if="olderPost || newerPost" aria-label="相邻文章"
          class="mt-14 grid gap-4 border-t border-default/40 pt-6 sm:grid-cols-2">
          <NuxtLink v-if="olderPost" :to="olderPost.path"
            class="group rounded-lg border border-default/40 p-4 transition-colors hover:border-primary-300/50">
            <span class="flex items-center gap-1 text-xs text-dimmed">
              <UIcon name="i-lucide-arrow-left" class="size-3" />
              上一篇
            </span>
            <span class="mt-1 line-clamp-2 block font-serif text-sm transition-colors group-hover:text-primary-300">
              {{ olderPost.title }}
            </span>
          </NuxtLink>

          <NuxtLink v-if="newerPost" :to="newerPost.path"
            class="group rounded-lg border border-default/40 p-4 text-right transition-colors hover:border-primary-300/50 sm:col-start-2">
            <span class="flex items-center justify-end gap-1 text-xs text-dimmed">
              下一篇
              <UIcon name="i-lucide-arrow-right" class="size-3" />
            </span>
            <span class="mt-1 line-clamp-2 block font-serif text-sm transition-colors group-hover:text-primary-300">
              {{ newerPost.title }}
            </span>
          </NuxtLink>
        </nav>
      </div>

      <!-- 右侧目录 -->
      <aside v-if="post.body?.toc?.links?.length" class="hidden lg:block">
        <UContentToc :links="post.body.toc.links" highlight-variant="circuit" highlight highlight-color="primary" />
      </aside>
    </div>
  </div>
</template>
