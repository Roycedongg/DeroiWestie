export type Locale = "zh" | "en";
export type I18nText = Record<Locale, string>;
export type I18nList = Record<Locale, string[]>;

export type ResultTier = "HIGHLIGHT" | "NORMAL";

export type ShowResult = {
  id: string;
  date: string; // YYYY-MM-DD
  dogName: string; // e.g. "Rollies"

  // ✅ i18n
  title: I18nText;

  location?: string; // e.g. "China"
  judge?: string; // e.g. "Ireland Terrier Specialist"

  tier?: ResultTier; // HIGHLIGHT shows will be pinned
  tags?: string[]; // e.g. ["BIS2", "BOG1", "Baby"]

  // ✅ i18n
  highlights: I18nList;

  link?: string;

  images?: {
    src: string;
    alt?: I18nText; // ✅ i18n
  }[];
};

export const showResults: ShowResult[] = [
  {
    id: "2026-01-17-rollies-stats",
    date: "2026-01-17",
    dogName: "Rollies",
    title: { zh: "CKU 杭州站", en: "Debut at CKU Hangzhou" },
    location: "China",
    judge:"George Schogol, Johan Andersson, Johnny Lee, Myriam Vermeire, Haruko Mizukoshi, Seven Duan", 
    tier: "NORMAL",
    tags: ["BIS"],
    highlights: {
      zh: ["BoB*6, BIS1*2, BIS2*1, BIS3*2, BIS4*1"],
      en: ["Bob*6, BIS1*2, BIS2*1, BIS3*2, BIS4*1"],
    },
    images: [
      {
        src: "/results/rollies-hangzhou1.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },
      {
        src: "/results/rollies-hangzhou2.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },{
        src: "/results/rollies-hangzhou3.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },{
        src: "/results/rollies-hangzhou4.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },
    ],
  },

  {
    id: "2026-01-10-rollies-stats",
    date: "2026-01-10",
    dogName: "Rollies",
    title: { zh: "CKU 南京站", en: "Debut at CKU Nanjing" },
    location: "China",
    judge:"Panche Dameski, Mica Mladenovic, Lavina Diamanti, Bao Chen", 
    tier: "NORMAL",
    tags: ["BIS"],
    highlights: {
      zh: ["BoB*6",
       "BIS1*3",
        "BIS4*1"],
      en: ["BoB*6",
       "BIS1*3",
        "BIS4*1"],
    },
    images: [
      {
        src: "/results/rollies-nanjing1.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },
      {
        src: "/results/rollies-nanjing2.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },
    ],
  },

  {
    id: "2025-10-24-cku-main-day2",
    date: "2025-10-24",
    dogName: "Rollies",
    title: { zh: "CKU 本部展", en: "CKU Main Show" },
    location: "China",
    judge: "Ireland Terrier Specialist",
    tier: "HIGHLIGHT",
    tags: ["BIS2", "Baby", "Terrier"],
    highlights: {
      zh: [
        "8 shows：7 个 Best of Breed（BOB）",
        "2 个 Best of Group 1（Terrier Group 1st）",
        "6 个 Best of Group 2、1 个 Best of Group 3",
        "1 个 Best in Show 2（BIS2）",
        "Best in Show 2（BIS 2）",
        "Group 3 BBISS - Specialty Best Baby Terrier",
        "One of the biggest shows in China — major highlight",
      ],
      en: [
        "8 shows: 7× Best of Breed (BOB)",
        "2× Best of Group 1 (Terrier Group 1st)",
        "6× Best of Group 2, 1× Best of Group 3",
        "1× Best in Show 2 (BIS2)",
        "Reserve Best in Show (BIS 2)",
        "Terrier Specialty: Westie Baby Winner",
        "One of the biggest shows in China — major highlight",
      ],
    },
    images: [
      {
        src: "/results/rollies-bis2-1.jpg",
        alt: { zh: "BIS 2 荣誉照", en: "BIS 2 Photo" },
      },
      {
        src: "/results/rollies-bis2-2.jpg",
        alt: { zh: "奖花照", en: "Ribbon Photo" },
      },
    ],
  },

  {
    id: "2025-10-19-rollies-stats",
    date: "2025-10-19",
    dogName: "Rollies",
    title: { zh: "CKU Huzhou", en: "Debut at CKU Huzhou" },
    location: "China",
    tier: "NORMAL",
    tags: ["BIS"],
    highlights: {
      zh: ["BIS1*3, BIS2*2, BIS3"],
      en: ["BIS1×3, BIS2×2, BIS3"],
    },
    images: [
      {
        src: "/results/rollies-huzhou1.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },
      {
        src: "/results/rollies-huzhou2.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },
    ],
  },

  {
    id: "2025-12-31-CKU跨年展",
    date: "2025-12-31",
    dogName: "Rollies",
    title: { zh: "CKU 2025 Year-End Show", en: "CKU 2025 Year-End Show" },
    location: "China",
    tier: "HIGHLIGHT",
    tags: ["BIS"],
    highlights: {
      zh: [
        "8 shows：7 Best in Show(BIS)",
        "8 shows：8 Best of Breed",
        "BIS1x1 BIS2x3 BIS3x1 BIS4x2",
      ],
      en: [
        "8 shows: 7× Best in Show (BIS)",
        "8 shows: 8× Best of Breed",
        "BIS1×1, BIS2×3, BIS3×1, BIS4×2",
      ],
    },
    images: [
      {
        src: "/results/rollies-benbuzhan1.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },
      {
        src: "/results/rollies-benbuzhan2.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },
      {
        src: "/results/rollies-benbuzhan3.jpg",
        alt: { zh: "BIS 赏励照", en: "BIS Award Photo" },
      },
    ],
  },
];
