<script setup lang="ts">
useHead({
  htmlAttrs: { lang: "zh-CN" },
});

useSeoMeta({
  title: "Mixsu Studio - 让生活慢下来",
  description: "个人博客,记录生活,编写代码"
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
