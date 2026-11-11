---
title: 开发笔记
description: 网站随想录
date: 2026-11-08
category: frontend
tags:
  - Nuxt
  - 前端
  - 建站
---

## ◈ 2026-11-07

为了真正意义上打造一个属于自己的个人网站，我敲定了如下技术栈

| 包管理器 | 前端全栈框架 | UI框架  |   博客渲染   |
| :------: | :----------: | :-----: | :----------: |
|   Bun    | Nuxt4 (Vue3) | Nuxt UI | Nuxt Content |

### 配色方案（未生效）

我搞了两套配色，但是效果都不是很好，打算先用默认的NuxtUI配色，后面再修改

### LOGO

用两个交替着的黄金比例长方形，代表我一生被混合的一切

同时也代表一种无法逃离的状态

### 字体方案

注意 Nuxt 默认会用 google font 来渲染字体，但是国内无法访问

所以我选择下载 `fontsource` 相关包来进行本地渲染，避免网络问题

`nuxt.config.ts`:

```ts
fonts: {
    provider: "npm",
    families: [
      { name: "Noto Serif SC", weights: ["400", "700"] },
      { name: "Playfair Display", weights: ["400", "700"] },
      { name: "JetBrains Mono", weights: ["400"] },
    ],
},
```

### 博客渲染（未生效）

Nuxt Content 这方面的东西有点看不懂，反正我需要设置 Nuxt 应该在哪里得到博客，然后需要怎么渲染

照着官方文档那样写应该没错

```ts
import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/**",
      // 设置前置 formatter
      schema: z.object({
        title: z.string(), // 标题
        description: z.string(), // 描述
        date: z.date(), // 日期
        category: z.enum(["blender", "frontend", "golang", "life"]), // 分类
        tags: z.array(z.string()).default([]), // 标签
        pin: z.boolean().default(false), // 重要性
        cover: z.string().optional(), // 图画（可选）
      }),
    }),
  },
});
```

## ◈ 2026-11-08

使用 Vue Bits 搞了个动态背景

解决了博客渲染的逻辑，并且可以正常显示博客内容

## ◈ 2026-11-10

修复了 `colorMode` 的问题

`nuxt.config.ts`:

```ts
// 强制暗色模式
colorMode: {
  preference: "dark",
  fallback: "dark",
},
```

## ◈ 2026-11-11

搭建索引页面
