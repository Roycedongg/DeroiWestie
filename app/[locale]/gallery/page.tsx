import path from "path";
import fs from "fs/promises";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-static"; // 静态构建
export const runtime = "nodejs"; // ✅ 关键：避免 Vercel Edge 导致 fs/path 500

type GalleryCategory = "All" | "Kennel Dogs" | "Puppies" | "Shows" | "Lifestyle";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title?: string;
  note?: string;
  date?: string;
};

const CATEGORY_DIRS: { dir: string; category: GalleryCategory; labelZh: string; labelEn: string }[] =
  [
    { dir: "dogs", category: "Kennel Dogs", labelZh: "犬舍犬只", labelEn: "Kennel Dogs" },
    { dir: "puppies", category: "Puppies", labelZh: "幼犬", labelEn: "Puppies" },
    { dir: "shows", category: "Shows", labelZh: "赛场", labelEn: "Shows" },
    { dir: "lifestyle", category: "Lifestyle", labelZh: "日常", labelEn: "Lifestyle" },
  ];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function titleFromFilename(filename: string) {
  const base = filename.replace(/\.[^/.]+$/, "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

async function readDirSafe(absDir: string) {
  try {
    return await fs.readdir(absDir, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function loadGallery(locale: "zh" | "en"): Promise<GalleryItem[]> {
  const publicRoot = path.join(process.cwd(), "public");
  const galleryRoot = path.join(publicRoot, "gallery");

  const items: GalleryItem[] = [];

  for (const c of CATEGORY_DIRS) {
    const abs = path.join(galleryRoot, c.dir);
    const entries = await readDirSafe(abs);

    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "en"));

    for (const file of files) {
      const src = `/gallery/${c.dir}/${file}`;
      const base = file.replace(/\.[^/.]+$/, "");
      const label = locale === "en" ? c.labelEn : c.labelZh;

      items.push({
        id: `${c.dir}-${base}`,
        src,
        alt: `DeRoi Westie - ${label}`,
        category: c.category,
        title: titleFromFilename(file),
      });
    }
  }

  return items;
}

export default async function GalleryPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale === "en" ? "en" : "zh";
  const items = await loadGallery(locale);

  return <GalleryClient items={items} locale={locale} />;
}
