export const competitionCategories = [
  "1. 索尼科學大賞",
  "2. IEYI發明展／世界賽",
  "3. 科技教育實作競賽",
  "4. 麥克松",
  "5. 其他競賽",
] as const;

export type CompetitionCategory = (typeof competitionCategories)[number];

/**
 * 將歷年正式競賽名稱對應到資料庫查詢用的大分類。
 * 正式名稱仍保留在專題資料中，不會被此函式覆寫。
 */
export function getCompetitionCategory(competition: string): CompetitionCategory {
  const value = competition.toLocaleLowerCase("zh-Hant");

  if (value.includes("索尼") || value.includes("sony")) {
    return "1. 索尼科學大賞";
  }

  if (value.includes("ieyi") || value.includes("iyia")) {
    return "2. IEYI發明展／世界賽";
  }

  // 「麥克松科技教育競賽」雖包含科技教育字樣，仍應歸入麥克松。
  if (value.includes("麥克松")) {
    return "4. 麥克松";
  }

  if (
    value.includes("國教署") ||
    value.includes("國民及學前教育署") ||
    value.includes("科技教育創意實作") ||
    value.includes("科技教育實作") ||
    value.includes("創意科技競賽")
  ) {
    return "3. 科技教育實作競賽";
  }

  return "5. 其他競賽";
}
