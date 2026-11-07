export default defineNuxtConfig({
  // 默认配置
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  telemetry: false,
  // 注册模块
  modules: ["@nuxt/ui", "@nuxt/content"],
  // 样式文件入口
  css: ["~/assets/css/main.css"],
  // 字体
  fonts: {
    provider: "npm",
    families: [
      { name: "Noto Serif SC", weights: ["400", "700"] },
      { name: "Playfair Display", weights: ["400", "700"] },
      { name: "JetBrains Mono", weights: ["400"] },
    ],
  },
  //
  content: {
    experimental: { sqliteConnector: "native" },
  },
});
