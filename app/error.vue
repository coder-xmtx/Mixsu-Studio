<script setup lang="ts">
import type { NuxtError } from "#app";
import { zh_cn } from "@nuxt/ui/locale";

const props = defineProps<{ error: NuxtError }>();

// 用真实的错误状态，而不是把一切都当成 404
const statusCode = computed(() => props.error?.statusCode ?? 500);
const isNotFound = computed(() => statusCode.value === 404);

const statusMessage = computed(() => {
  if (props.error?.statusMessage) return props.error.statusMessage;
  return isNotFound.value ? "这里不是你该来的地方" : "出了点问题，稍后再试试";
});

useHead({
  htmlAttrs: { lang: "zh-CN" },
  title: `${statusCode.value} · Mixsu Studio`,
});
</script>

<template>
  <UApp :locale="zh_cn">
    <div class="flex min-h-dvh items-center justify-center bg-default px-6">
      <UError
        icon="i-lucide-file-x"
        :error="{ statusCode, statusMessage }"
        :ui="{ statusMessage: 'font-serif' }"
        :clear="{ label: '返回首页', icon: 'i-lucide-arrow-left' }"
      />
    </div>
  </UApp>
</template>
