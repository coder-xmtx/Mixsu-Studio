<script setup lang="ts">

const route = useRoute();

// 获取博客路由
const { data: post } = await useAsyncData(route.path, () =>
    queryCollection('blog').path(route.path).first(),
);
</script>

<template>
    <div class="mx-auto max-w-3xl mt-10 mb-20">
        <ContentRenderer v-if="post" :value="post" />

        <UButton icon="i-lucide-arrow-left" size="md" variant="outline" to="/blog"
            class="border border-gold-500 text-gold-500 hover:bg-gold-200/10">返回博客目录
        </UButton>
    </div>
</template>