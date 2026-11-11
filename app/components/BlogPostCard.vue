<script setup lang="ts">
import type { BlogPost } from "~/utils/blog";

const props = defineProps<{ post: BlogPost }>();

const formattedDate = computed(() => formatPostDate(props.post.date));
const isoDate = computed(() => toIsoDate(props.post.date));
</script>

<template>
  <article
    class="group relative flex flex-col gap-3 rounded-xl border border-default/40 bg-elevated/20 p-5 transition-colors focus-within:border-primary-300/60 hover:border-primary-300/50 hover:bg-elevated/40"
  >
    <NuxtImg
      v-if="post.cover"
      :src="post.cover"
      :alt="`《${post.title}》的封面`"
      width="768"
      height="432"
      format="webp"
      loading="lazy"
      class="aspect-video w-full rounded-lg object-cover"
    />

    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
      <time v-if="formattedDate" :datetime="isoDate">{{ formattedDate }}</time>
      <UBadge v-if="post.pin" label="置顶" color="primary" variant="subtle" size="sm" />
    </div>

    <h2 class="font-serif text-xl font-bold text-default transition-colors group-hover:text-primary-300">
      <!-- 伪元素铺满整张卡片，让整块区域可点，同时保留标题链接的可访问性 -->
      <NuxtLink :to="post.path" class="after:absolute after:inset-0 after:content-['']">
        {{ post.title }}
      </NuxtLink>
    </h2>

    <p v-if="post.description" class="line-clamp-2 text-sm leading-relaxed text-muted">
      {{ post.description }}
    </p>

    <div class="relative z-10 mt-auto flex flex-wrap items-center gap-2 pt-1">
      <NuxtLink
        v-if="post.category"
        :to="`/blog/${post.category}`"
        class="inline-flex items-center gap-1 rounded-full border border-default/50 px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-primary-300/50 hover:text-primary-300"
      >
        <UIcon :name="categoryIcon(post.category)" class="size-3" />
        {{ categoryLabel(post.category) }}
      </NuxtLink>

      <NuxtLink
        v-for="tag in post.tags ?? []"
        :key="tag"
        :to="{ path: '/blog', query: { tag } }"
        class="rounded-full px-2 py-0.5 text-xs text-dimmed transition-colors hover:bg-elevated/60 hover:text-primary-300"
      >
        #{{ tag }}
      </NuxtLink>
    </div>
  </article>
</template>
