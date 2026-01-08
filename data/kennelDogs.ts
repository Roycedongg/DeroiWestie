// data/kennelDogs.ts
export type Locale = "zh" | "en";
export type KennelSex = "male" | "female";

export type KennelDog = {
  id: string;
  sex: KennelSex;

  name: {
    zh: string; // 正式名 / 展名
    en: string;
  };
  callName?: {
    zh: string; // 昵称（可选）
    en: string;
  };

  image: {
    src: string; // 放在 public 下的路径，例如 /kennel/rollies-stud-01.jpg
    alt: {
      zh: string;
      en: string;
    };
  };

  // 父母的奖项/血统（文字即可，避免太复杂）
  pedigree: {
    zh: string[]; // 建议 3-6 条
    en: string[];
  };

  // 自己的奖项
  titles: {
    zh: string[]; // 3-10 条
    en: string[];
  };

  // 可选：一句话亮点（卡片顶部更高级）
  highlight?: {
    zh: string;
    en: string;
  };
};

export const kennelDogs: KennelDog[] = [
  {
    id: "rollies- bitch-01",
    sex: "female",
    name: { zh: "DeRoi Rollies on a Roll", en: "DeRoi Rollies on a Roll" },
    callName: { zh: "嘬嘬", en: "Rollies" },
    image: {
      src: "/kennel/rollies-bitch-01.jpg",
      alt: { zh: "Rollies 种母写真", en: "Rollies bitch portrait" },
    },
    highlight: {
      zh: "强骨量、漂亮头版、毛质稳定，适合提升轮廓与毛感。",
      en: "Strong bone, excellent head, stable harsh coat—great for outline and coat texture.",
    },
pedigree: {
  zh: [
    "父：CRYSTAL BOY DE LA POMME AM TH KOR GCH",
    "2021 AKC Top.1 Westie",
    "Top.3 in Terrier Group",
    "Westminster Terrier Group 1",
    "Montgomery Group 4",
    "",
    "母：DIESEL TOP Phoenix MULAN CN GCH, CN TH CH, INT CH",
    "2022 CKU Top.1 Westie",
    "Top.1 in Terrier Group",
    "Group 3 BISS",
    "血统特点：毛质硬，色素好，头版强",
  ],
  en: [
    "Sire: CRYSTAL BOY DE LA POMME AM TH KOR GCH",
    "2021 AKC No.1 Westie",
    "Top 3 in Terrier Group",
    "Westminster Terrier Group 1",
    "Montgomery Group 4",
    "Dam: DIESEL TOP Phoenix MULAN CN GCH, CN TH CH, INT CH",
    "2022 CKU No.1 Westie",
    "Top 1 in Terrier Group",
    "Group 3 BISS",
    "Pedigree highlights: harsh coat, strong pigment, excellent head",
  ],
},

    titles: {
      zh: [
        "BPBIS * 7",
        " BOB*23 / BIG *9",
        "性格稳定，适合家庭与赛场",
      ],
      en: [
       "BPBIS * 7",
       "BPBIS * 7",
        " BOB*23 / BIG *9",
        "Stable temperament for ring & home (Sample)",
      ],
    },
  },

  {
    id: "rollies-stud-01",
    sex: "male",
    name: { zh: "DeRoi XXXXX（示例）", en: "DeRoi XXXXX (Sample)" },
    callName: { zh: "Luna（示例）", en: "Luna (Sample)" },
    image: {
      src: "/kennel/rollies-stud-01.jpg",
      alt: { zh: "种公写真", en: "Brood stud portrait" },
    },
    highlight: {
      zh: "比例协调、步态流畅、母系稳定，适合繁育与赛场发展。",
      en: "Balanced proportions, smooth movement, consistent maternal line—ideal for breeding and showing.",
    },
    pedigree: {
      zh: [
        "父：CH XXXXX（示例）— 赛场表现稳定",
        "母：CH XXXXX（示例）— 母系强、育成优秀",
      ],
      en: [
        "Sire: CH XXXXX (Sample) — consistent show record",
        "Dam: CH XXXXX (Sample) — strong maternal line, proven producer",
      ],
    },
    titles: {
      zh: ["BOB / Group Placements（示例）", "结构与毛质均衡（示例）"],
      en: ["BOB / Group Placements (Sample)", "Balanced structure and coat (Sample)"],
    },
  },
];
