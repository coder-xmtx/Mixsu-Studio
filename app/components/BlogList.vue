<script setup lang="ts">
import type { BlogPost } from "~/utils/blog";

defineProps<{
  posts?: BlogPost[];
  emptyTitle?: string;
  emptyDescription?: string;
}>();
</script>

<template>
  <ul v-if="posts?.length" class="flex flex-col gap-4">
    <li v-for="post in posts" :key="post.path">
      <BlogPostCard :post="post" />
    </li>
  </ul>

  <UEmpty v-else variant="soft" icon="i-lucide-notebook-pen" :title="emptyTitle ?? '这里还没有内容'"
    :description="emptyDescription ?? '文章正在路上，先泡杯茶等一等'" class="py-16" />
</template>
