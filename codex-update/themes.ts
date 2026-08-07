export type ThemeId = "sunny" | "ocean" | "forest" | "starlight" | "bamboo" | "lake-mist" | "industrial";

export const themes = {
  sunny: { name: "暖陽活力風" },
  ocean: { name: "海洋科技風" },
  forest: { name: "森林生態風" },
  starlight: { name: "星空夜光風" },
  bamboo: { name: "竹韻工藝風" },
  "lake-mist": { name: "日月潭晨霧風" },
  industrial: { name: "機械工業風" },
} as const;

export const DEFAULT_THEME: ThemeId = "forest";
