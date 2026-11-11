<script setup lang="ts">
const route = useRoute();

// 置顶优先，其次按时间倒序
const { data: posts } = await useAsyncData("blog-list", () =>
  queryCollection("blog").order("pin", "DESC").order("date", "DESC").all(),
);

// 标签筛选走 query 参数，URL 能直接分享
const activeTag = computed(() => {
  const tag = route.query.tag;
  return typeof tag === "string" && tag ? tag : undefined;
});

const visiblePosts = computed(() => {
  const list = posts.value ?? [];
  if (!activeTag.value) return list;
  return list.filter((post) => (post.tags ?? []).includes(activeTag.value!));
});

const allTags = computed(() => {
  const tags = new Set<string>();
  for (const post of posts.value ?? []) {
    for (const tag of post.tags ?? []) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b, "zh-CN"));
});

useSeoMeta({
  title: "博客",
  description: "记录生活、代码与思考的随笔合集。",
});
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-6 py-12">
    <header class="mb-8">
      <h1 class="font-serif text-3xl font-bold">博客</h1>
      <p class="mt-2 text-sm text-muted">
        记录生活与代码的随笔<template v-if="posts?.length">，共 {{ posts.length }} 篇</template>
      </p>
    </header>

    <BlogCategoryNav class="mb-5" />

    <div v-if="allTags.length" class="mb-8 flex flex-wrap items-center gap-2">
      <span class="text-xs text-dimmed">标签</span>
      <NuxtLink
        v-for="tag in allTags"
        :key="tag"
        :to="{ path: '/blog', query: { tag } }"
        class="rounded-full px-2.5 py-0.5 text-xs transition-colors"
        :class="
          activeTag === tag
            ? 'bg-primary-300/15 text-primary-300'
            : 'text-muted hover:bg-elevated/60 hover:text-default'
        "
      >
        #{{ tag }}
      </NuxtLink>
      <UButton
        v-if="activeTag"
        to="/blog"
        icon="i-lucide-x"
        label="清除筛选"
        size="xs"
        variant="ghost"
        color="neutral"
      />
    </div>

    <p v-if="activeTag" class="mb-4 text-sm text-muted">
      正在看标签 <span class="text-primary-300">#{{ activeTag }}</span> 下的
      {{ visiblePosts.length }} 篇文章
    </p>

    <BlogList
      :posts="visiblePosts"
      :empty-title="activeTag ? `还没有 #${activeTag} 的文章` : undefined"
      :empty-description="activeTag ? '换一个标签看看吧。' : undefined"
    />
  </div>
</template>
