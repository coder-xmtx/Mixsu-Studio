<script setup lang="ts">
useSeoMeta({
  title: "关于",
  description: "小明同学的个人介绍：前端、Go 与一点点 Blender。",
});
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-6 py-16">
    <NuxtImg
      src="/portrait.png"
      alt="小明同学的头像"
      width="320"
      height="320"
      format="webp"
      class="rounded-2xl"
    />

    <h1 class="font-serif text-2xl font-bold">小明同学</h1>

    <UButton
      color="primary"
      icon="i-simple-icons-github"
      variant="link"
      size="xl"
      to="https://github.com/coder-xmtx"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub：coder-xmtx"
    />

    <USeparator label="SAY" class="w-2xs font-serif" />

    <div class="font-write text-xl text-center">
      <p>Je t'aime encore,</p>
      <p>Mais le monde pleure sans fin.</p>
    </div>
  </div>
</template>
