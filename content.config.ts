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
