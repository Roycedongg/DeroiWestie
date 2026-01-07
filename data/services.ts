// ===============================
// Locale
// ===============================
export type Locale = "zh" | "en";
type I18nText = Record<Locale, string>;

// ===============================
// Service category definitions
// ===============================

export type ServiceCategory =
  | "Hand Stripping"
  | "Maintenance"
  | "Full Grooming"
  | "Bath & Tidy"
  | "Puppy"
  | "Add-ons";

export const serviceCategories: {
  key: ServiceCategory;
  label: I18nText;
  desc: I18nText;
  tips?: Record<Locale, string[]>;
  thumb?: string;
}[] = [
  {
    key: "Hand Stripping",
    label: { zh: "手拔毛 / 开荒", en: "Hand Stripping / First Visit Reset" },
    desc: {
      zh: "适合第一次到店、毛况复杂、需要重建轮廓与毛质的狗狗。开荒通常更耗时，但能为后续周期护理打下最好基础。",
      en: "Best for first-time visits or complex coat conditions. A reset takes longer but builds the best foundation for long-term maintenance.",
    },
    tips: {
      zh: ["首次到店默认按开荒评估", "可提前发照片确认毛况", "目标：轮廓重建 + 毛质恢复"],
      en: ["First visit is assessed as a reset by default", "Send photos in advance for coat evaluation", "Goal: silhouette rebuild + coat texture recovery"],
    },
  },
  {
    key: "Maintenance",
    label: { zh: "维护 / 周期护理", en: "Maintenance / Routine Cycle" },
    desc: {
      zh: "适合规律回访、维持造型与毛质的狗狗。周期越稳定，越省时、效果越好。",
      en: "For regular returning clients to maintain shape and coat quality. The more consistent the cycle, the better (and faster) the results.",
    },
    tips: {
      zh: ["建议 3–6 周周期", "轮廓更稳定、质感更细腻", "对皮肤与毛质更友好"],
      en: ["Recommended every 3–6 weeks", "More stable outline and refined texture", "Gentler for skin and coat"],
    },
  },
  {
    key: "Full Grooming",
    label: { zh: "全剪造型（Full Grooming）", en: "Full Grooming (Full Clip)" },
    desc: {
      zh: "适合贵宾、杜宾混种（Doodle）、马尔济斯、西施、约克夏、比熊等需要完整剪毛造型的犬种。",
      en: "Ideal for Poodles, Doodles, Maltese, Shih Tzu, Yorkies, Bichons and other breeds that need full clip styling.",
    },
    tips: {
      zh: ["适合非刚毛犬种", "包含全身剪毛造型", "造型可沟通需求与风格"],
      en: ["Best for non-wire coats", "Includes full-body styling", "Style can be discussed and customized"],
    },
  },
  {
    key: "Bath & Tidy",
    label: { zh: "洗护 / 修整", en: "Bath & Tidy" },
    desc: {
      zh: "适合想保持干净清爽、但不进行完整造型重建的狗狗。包含洗护、吹整与必要修整。",
      en: "For a clean and fresh look without a full style rebuild. Includes bath, blow dry, and essential tidy-up.",
    },
    tips: {
      zh: ["眼周 / 脚底 / 卫生修整", "适合日常清爽维护", "可搭配加项"],
      en: ["Face/feet/sanitary tidy", "Great for regular freshness", "Pairs well with add-ons"],
    },
  },
  {
    key: "Puppy",
    label: { zh: "幼犬适应", en: "Puppy Introduction" },
    desc: {
      zh: "帮助幼犬建立正向美容体验：轻量护理 + 逐步熟悉站台、吹风与基础触碰。",
      en: "Build a positive grooming experience: light care + gradual introduction to table, dryer, and handling.",
    },
    tips: {
      zh: ["首次体验尤为关键", "短时完成，降低压力", "为未来长期护理做准备"],
      en: ["First experience matters most", "Short session to reduce stress", "Prepares for long-term routine grooming"],
    },
  },
  {
    key: "Add-ons",
    label: { zh: "加项", en: "Add-ons" },
    desc: {
      zh: "可与任意服务搭配的附加项目。",
      en: "Optional extras that can be added to any service.",
    },
    tips: {
      zh: ["剪指甲 / 清耳 / 局部处理", "建议与主服务一起预约"],
      en: ["Nails / ears / spot treatments", "Recommended to book with a main service"],
    },
  },
];

// ===============================
// Service item definitions
// ===============================

export type ServiceItem = {
  id: string;
  category: ServiceCategory;

  title: I18nText;
  subtitle?: I18nText;

  priceCAD: number;
  durationMin: number;

  shortDesc: I18nText;

  details?: Record<Locale, string[]>;
  badge?: "Popular" | "New";

  recommendedFor?: Record<Locale, string[]>;
  notRecommendedFor?: Record<Locale, string[]>;
  recommendedFrequency?: I18nText;
  notes?: Record<Locale, string[]>;

  thumb?: string;
  image?: string; // backward-compatible
};

const CATEGORY_DEFAULT_THUMB: Partial<Record<ServiceCategory, string>> = {
  "Hand Stripping": "/services/thumbs/handstrip.jpg",
  Maintenance: "/services/thumbs/maintenance.jpg",
  "Full Grooming": "/services/thumbs/fullgroom.jpg",
  "Bath & Tidy": "/services/thumbs/bath.jpg",
  Puppy: "/services/thumbs/puppy.jpg",
  // Add-ons intentionally no default image
};

const rawServices: ServiceItem[] = [
  {
    id: "westie-handstrip-first",
    category: "Hand Stripping",
    title: { zh: "西高地开荒（第一次手拔毛）", en: "Westie Reset (First Hand Stripping)" },
    subtitle: { zh: "首次到店 / 毛况复杂 / 重建轮廓", en: "First visit / complex coat / silhouette rebuild" },
    priceCAD: 200,
    durationMin: 180,
    shortDesc: {
      zh: "针对第一次到店或毛况复杂的西高地，进行完整手拔毛与轮廓重建。",
      en: "For first-time Westies or complex coats: full hand stripping and silhouette rebuild.",
    },
    details: {
      zh: ["完整手拔毛与轮廓塑造", "根据毛况调整处理方式", "基础清洁与整理"],
      en: ["Full hand stripping and silhouette shaping", "Method adjusted to coat condition", "Basic cleaning and finishing"],
    },

    image: "/services/thumbs/handstrip.jpg",

    recommendedFor: {
      zh: ["西高地等刚毛梗犬", "第一次到店 / 毛况复杂", "需要重建轮廓与毛质"],
      en: ["Wire-coated terriers (e.g., Westie)", "First visit / complex coat", "Silhouette + texture rebuild"],
    },
    notRecommendedFor: {
      zh: ["需要全剪造型的犬种（如贵宾、比熊、约克夏等）"],
      en: ["Breeds that need full clip styling (Poodle/Bichon/Yorkie, etc.)"],
    },
    recommendedFrequency: {
      zh: "首次开荒后建议进入 3–6 周维护周期",
      en: "After the first reset, recommended maintenance every 3–6 weeks",
    },
    notes: {
      zh: [
        "即使日常有循环，每个人拔毛处理方式和手法不同，所以第一次都视为开荒。",
        "不配合/敏感可分次完成或调整方案。",
      ],
      en: [
        "Even with a routine cycle, different groomers have different techniques—your first visit is treated as a reset.",
        "If sensitive or uncooperative, we can split into multiple sessions or adjust the plan.",
      ],
    },
    badge: "Popular",
  },
  {
    id: "westie-maintenance",
    category: "Maintenance",
    title: { zh: "西高地循环（周期手拔毛）", en: "Westie Maintenance (Routine Hand Stripping)" },
    subtitle: { zh: "规律回访 / 保持轮廓与毛质", en: "Regular return / keep outline and texture" },
    priceCAD: 150,
    durationMin: 150,
    shortDesc: {
      zh: "适合已有良好基础、按周期回访的狗狗，维持轮廓与质感。",
      en: "For dogs with a good base coat on a routine schedule—maintains outline and texture.",
    },
    details: {
      zh: ["局部手拔毛维护", "保持造型比例", "适合 3–6 周周期"],
      en: ["Targeted hand stripping maintenance", "Keep proportions and outline", "Best every 3–6 weeks"],
    },
    recommendedFor: {
      zh: ["西高地等刚毛梗犬", "规律回访维持轮廓与毛质"],
      en: ["Wire-coated terriers (e.g., Westie)", "Regular returning maintenance clients"],
    },
    notRecommendedFor: {
      zh: ["需要全剪造型的犬种（如贵宾、比熊、约克夏等）"],
      en: ["Breeds that need full clip styling (Poodle/Bichon/Yorkie, etc.)"],
    },
    recommendedFrequency: { zh: "建议 3–6 周一次", en: "Recommended every 3–6 weeks" },
    notes: {
      zh: ["周期越稳定，越省时、越漂亮；毛质与皮肤状态也更好。"],
      en: ["A consistent cycle saves time, looks better, and supports healthier skin and coat."],
    },
  },
  {
    id: "full-grooming-standard",
    category: "Full Grooming",
    title: { zh: "Full Grooming（全剪造型）", en: "Full Grooming (Full Clip)" },
    subtitle: {
      zh: "Poodle / Doodle / 马尔济斯 / 西施 / 约克夏 / 比熊",
      en: "Poodle / Doodle / Maltese / Shih Tzu / Yorkie / Bichon",
    },
    priceCAD: 100,
    durationMin: 120,
    shortDesc: {
      zh: "适合需要完整剪毛造型的犬种，包含洗护、吹整与全身造型修剪。",
      en: "For breeds that need full clip styling: bath, blow dry, and full-body haircut.",
    },
    details: {
      zh: ["洗护与吹整", "全身剪毛造型", "根据犬种与毛量调整时长"],
      en: ["Bath and blow dry", "Full-body haircut and styling", "Timing adjusted by breed and coat volume"],
    },
    recommendedFor: {
      zh: ["Poodle / Doodle", "马尔济斯 / 西施 / 约克夏 / 比熊", "需要完整剪毛造型"],
      en: ["Poodle / Doodle", "Maltese / Shih Tzu / Yorkie / Bichon", "Full clip styling needs"],
    },
    notRecommendedFor: {
      zh: ["刚毛梗犬（如西高地）若目标是毛质与轮廓，建议选择手拔毛方案"],
      en: ["Wire-coated terriers (e.g., Westie): if you want coat texture and outline, choose hand stripping"],
    },
    recommendedFrequency: {
      zh: "建议 4–6 周一次（视生长速度与造型需求调整）",
      en: "Recommended every 4–6 weeks (adjusted by growth and style needs)",
    },
    notes: {
      zh: ["可沟通你想要的长度、风格与脸型。"],
      en: ["We can discuss your preferred length, style, and face shape."],
    },
  },
  {
    id: "bath-tidy",
    category: "Bath & Tidy",
    title: { zh: "洗护 + 局部修整", en: "Bath + Tidy" },
    priceCAD: 95,
    durationMin: 90,
    shortDesc: {
      zh: "洗护、吹整，并进行必要的眼周、脚底与卫生修整。",
      en: "Bath, blow dry, plus essential face/feet/sanitary tidy-up.",
    },
    details: {
      zh: ["洗护与吹整", "局部修整", "不包含完整造型重建"],
      en: ["Bath and blow dry", "Essential tidy-up", "Does not include a full style rebuild"],
    },
  },
  {
    id: "puppy-intro",
    category: "Puppy",
    title: { zh: "幼犬适应护理", en: "Puppy Introduction Session" },
    subtitle: { zh: "建立正向美容体验", en: "Build a positive grooming experience" },
    priceCAD: 60,
    durationMin: 45,
    shortDesc: {
      zh: "为幼犬提供轻量护理，帮助其适应美容流程与环境。",
      en: "A light session to help puppies get used to the grooming process and environment.",
    },
    details: {
      zh: ["轻量清洁与整理", "熟悉站台与吹风", "降低紧张与压力"],
      en: ["Light cleaning and tidy", "Table and dryer introduction", "Reduced stress and anxiety"],
    },
    badge: "New",
  },
  {
    id: "addon-nails",
    category: "Add-ons",
    title: {
      zh: "加项：剪指甲,磨指甲,拔耳毛,淋巴按摩,开结",
      en: "Add-on: Nails / Grinding / Ear Plucking / Lymph Massage / De-matting",
    },
    priceCAD: 15,
    durationMin: 10,
    shortDesc: { zh: "可与任意主服务搭配。", en: "Can be added to any main service." },
  },
];

export const services: ServiceItem[] = rawServices.map((s) => {
  if (s.category === "Add-ons") return s;

  const direct = s.thumb ?? s.image;
  const fallback = CATEGORY_DEFAULT_THUMB[s.category];
  const picked = direct ?? fallback;

  return picked ? { ...s, thumb: picked } : s;
});
