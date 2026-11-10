<script setup lang="ts">
// 获取博客列表
const { data: posts } = await useAsyncData('blog-list', () =>
    queryCollection('blog').order('date', 'DESC').all()
);
</script>

<template>
    <div class="mx-auto max-w-3xl px-6 py-16">
        <h1 class="text-3xl font-serif mb-8">博客 Blog</h1>
        <ul class="space-y-6 gap-3 mb-10">
            <li v-for="post in posts" :key="post.path">
                <NuxtLink :to="post.path" class="text-xl font-serif hover:text-primary-300">
                    {{ post.title }}
                </NuxtLink>
                <div class="flex gap-2">
                    <p class="text-sm text-muted mt-2">{{ post.date }}</p>
                    <p class="text-sm text-muted mt-2">{{ post.description }}</p>
                </div>
            </li>
        </ul>

        <UButton icon="i-lucide-arrow-left" size="md" variant="outline" to="/" color="primary">返回首页
        </UButton>
    </div>
</template>