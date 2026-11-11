<script setup lang="ts">
const route = useRoute();

const navItems = [
  { label: "首页", to: "/", exact: true },
  { label: "博客", to: "/blog", exact: false },
  { label: "关于", to: "/about", exact: false },
];

// /blog 不是 /blog/xxx 的父路由记录，router-link 的 active-class 不会命中，
// 所以这里自己按路径前缀判断（SSR 也能算对）。
function isActive(to: string, exact?: boolean) {
  if (exact) return route.path === to;
  return route.path === to || route.path.startsWith(`${to}/`);
}

const year = new Date().getFullYear();
</script>

<template>
  <div class="relative flex min-h-dvh flex-col">
    <!-- 背景层：fixed 铺满全屏，滚动时保持不动 -->
    <div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <GradientWaves horizonColor="#663600" waveColor="#f5a000" crestColor="#ffefc2" :speed="0.3" :amplitude="2.5"
        :waveScale="0.65" :waveRatio="0.9" :swell="35" :turbulence="20" :tilt="1.1" :zoom="2.0" :height="5.5"
        :fogDepth="15" detail="medium" :brightness="1.0" :opacity="1.0" :mouseInteraction="false"
        :parallaxStrength="0.5" :grain="true" :grainIntensity="0.05" />
    </div>

    <!-- 顶部导航 -->
    <header class="relative z-10">
      <div class="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-5">
        <NuxtLink to="/" class="group flex items-center gap-2.5" aria-label="Mixsu Studio 首页">
          <img src="/logo.svg" alt="" width="28" height="28"
            class="size-7 transition-transform duration-300 group-hover:rotate-6" />
          <span class="font-header text-lg tracking-wide transition-colors group-hover:text-primary-300">
            Mixsu Studio
          </span>
        </NuxtLink>

        <nav aria-label="主导航" class="flex items-center gap-1">
          <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
            class="rounded-md px-3 py-1.5 text-sm transition-colors"
            :class="isActive(item.to, item.exact) ? 'text-primary-300' : 'text-muted hover:text-default'"
            :aria-current="isActive(item.to, item.exact) ? 'page' : undefined">
            {{ item.label }}
          </NuxtLink>

          <UButton icon="i-simple-icons-github" color="neutral" variant="ghost" size="sm"
            to="https://github.com/coder-xmtx" target="_blank" rel="noopener noreferrer"
            aria-label="GitHub：coder-xmtx" class="ms-1" />
        </nav>
      </div>
    </header>

    <!-- 内容层 -->
    <main class="relative z-10 flex flex-1 flex-col">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="relative z-10">
      <div
        class="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-2 border-t border-default/40 px-6 py-6 text-xs text-muted sm:flex-row">
        <p>© {{ year }} Mixsu Studio · 让生活慢下来</p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/blog" class="transition-colors hover:text-default">博客</NuxtLink>
          <NuxtLink to="/about" class="transition-colors hover:text-default">关于</NuxtLink>
          <a href="https://github.com/coder-xmtx" target="_blank" rel="noopener noreferrer"
            class="transition-colors hover:text-default">GitHub</a>
        </div>
      </div>
    </footer>
  </div>
</template>
