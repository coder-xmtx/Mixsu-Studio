/**
 * 博客的共享元数据与格式化工具。
 *
 * 注意：下面 category 的 value 必须与 content.config.ts 中
 * `category: z.enum([...])` 保持一致，两边要一起改。
 */
export const blogCategories = [
  {
    value: "frontend",
    label: "前端",
    icon: "i-lucide-monitor-smartphone",
    description: "页面、框架与工程化实践。",
  },
  {
    value: "golang",
    label: "Golang",
    icon: "i-lucide-terminal",
    description: "Go 语言、并发与后端基础。",
  },
  {
    value: "blender",
    label: "Blender",
    icon: "i-lucide-box",
    description: "建模、材质与渲染笔记。",
  },
  {
    value: "life",
    label: "生活",
    icon: "i-lucide-coffee",
    description: "慢下来之后想说的话。",
  },
] as const;

export type BlogCategory = (typeof blogCategories)[number]["value"];

/** 文章在列表 / 卡片里用到的字段（与 content.config.ts 的 schema 对应） */
export interface BlogPost {
  path: string;
  title: string;
  description?: string;
  date?: string | Date;
  category?: string;
  tags?: string[];
  pin?: boolean;
  cover?: string;
}

const categoryValues = blogCategories.map((item) => item.value) as readonly string[];

export function isBlogCategory(value: unknown): value is BlogCategory {
  return typeof value === "string" && categoryValues.includes(value);
}

export function categoryLabel(value?: string | null): string {
  if (!value) return "未分类";
  return blogCategories.find((item) => item.value === value)?.label ?? value;
}

export function categoryDescription(value?: string | null): string {
  return (
    blogCategories.find((item) => item.value === value)?.description ??
    "这个分类下的全部文章。"
  );
}

export function categoryIcon(value?: string | null): string {
  return blogCategories.find((item) => item.value === value)?.icon ?? "i-lucide-file-text";
}

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * 把内容里的日期解析成本地时间的 Date。
 * Nuxt Content 给到的是 "2026-11-08" 这样的日期字符串，
 * 直接 new Date("2026-11-08") 会按 UTC 解析，在部分时区会串成前一天，
 * 所以这里手动拆分年月日。
 */
function toLocalDate(value: string | Date): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (dateOnly) {
    return new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** 展示用：「2026年11月8日」 */
export function formatPostDate(value?: string | Date | null): string {
  if (!value) return "";
  const date = toLocalDate(value);
  return date ? dateFormatter.format(date) : String(value);
}

/** <time datetime="..."> 用的 ISO 日期，取不到时返回 undefined */
export function toIsoDate(value?: string | Date | null): string | undefined {
  if (!value) return undefined;
  const date = toLocalDate(value);
  if (!date) return undefined;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
