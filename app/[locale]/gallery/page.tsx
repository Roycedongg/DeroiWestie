import path from "path";
import fs from "fs/promises";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-static"; // 静态构建更稳

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

const CATEGORY_DIRS: { dir: string; category: GalleryCategory; label: string }[] = [
  { dir: "dogs", category: "Kennel Dogs", label: "犬舍犬只" },
  { dir: "puppies", category: "Puppies", label: "幼犬" },
  { dir: "shows", category: "Shows", label: "赛场" },
  { dir: "lifestyle", category: "Lifestyle", label: "日常" },
];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function titleFromFilename(filename: string) {
  // rollies-ring-01.jpg -> Rollies Ring 01
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

async function loadGallery(): Promise<GalleryItem[]> {
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
      items.push({
        id: `${c.dir}-${base}`, // 保证唯一
        src,
        alt: `DeRoi Westie - ${c.label}`,
        category: c.category,
        title: titleFromFilename(file),
      });
    }
  }

  // 你也可以在这里做自定义排序，比如 shows 优先
  return items;
}

export default async function GalleryPage() {
  const items = await loadGallery();

  return <GalleryClient items={items} />;
}
