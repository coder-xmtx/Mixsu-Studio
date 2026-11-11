<script setup lang="ts">
import { zh_cn } from "@nuxt/ui/locale";

useHead({
  htmlAttrs: { lang: "zh-CN" },
  // 页面只提供自己的标题，站点名在这里统一拼接
  titleTemplate: (title) => (title ? `${title} · Mixsu Studio` : "Mixsu Studio · 让生活慢下来"),
});

useSeoMeta({
  description: "小明同学的个人站点：记录生活、代码与思考。",
  ogSiteName: "Mixsu Studio",
  ogType: "website",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <UApp :locale="zh_cn">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
