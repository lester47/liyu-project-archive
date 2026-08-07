export const technologyCategories = [
  "感測器與輸入裝置",
  "微控制器與電子電路",
  "AI辨識與語言模型",
  "程式設計與開發工具",
  "網路通訊與雲端服務",
  "機構機械與動力控制",
  "燈光聲音與多媒體",
  "資料分析與智慧判斷",
  "互動遊戲與體感控制",
  "App、網頁與使用介面",
  "材料工藝與造型製作",
  "能源環境與科學原理",
] as const;

export type TechnologyCategory = (typeof technologyCategories)[number];

// 細部技術可同時對應多個上層類別，例如GPS同時是輸入裝置與通訊應用。
const groups: Record<TechnologyCategory, readonly string[]> = {
  感測器與輸入裝置: [
    "加速度感測", "光敏電阻", "光線感測", "光感射擊", "自製壓力感測器", "里程感測",
    "能源感測", "動作感測", "感測器", "雷射感測", "壓力感測", "壓力感測器", "壓力踏板",
    "觸控矩陣", "TTP223電容式觸控", "按鈕控制", "GPS",
  ],
  微控制器與電子電路: [
    "micro:bit", "Micro:bit", "Micro:bit V2", "Arduino", "Arduino程式控制", "ESP32", "Webduino",
    "微控制器", "基礎電路", "麵包板電路", "控制元件", "CD74HC4067多工器", "I2C", "UART",
  ],
  AI辨識與語言模型: [
    "人體姿態辨識", "大語言模型", "自然語言處理", "語音轉文字", "臺語ASR", "AI 人臉辨識",
    "AI人臉辨識", "AI 情緒分析", "AI情緒分析", "AI手勢辨識", "OpenAI大型語言模型",
    "HUSKYLENS", "HuskyLens 2", "YOLOv8n", "Roboflow", "資料增強", "PocketCam", "PocketCard",
  ],
  程式設計與開發工具: [
    "視覺化程式控制", "視覺化程式設計", "MakeCode", "Blockly", "陣列程式", "條件判斷",
    "防抖動程式", "隨機目標程式", "Arduino程式控制", "AI協作除錯", "Codex協作開發", "系統整合",
  ],
  網路通訊與雲端服務: [
    "物聯網", "Wi-Fi", "藍牙傳輸", "MQTT", "radio廣播", "radio群組87", "IFTTT", "LINE 通知",
    "LINE Notify", "Google Sheets", "Google Sheets雲端紀錄", "Google表單", "GitHub Pages",
    "氣象開放資料", "I2C", "UART", "GPS",
  ],
  機構機械與動力控制: [
    "互動機構", "伺服馬達", "馬達", "馬達機構", "機電整合", "機械結構", "機構設計",
    "凸輪軸", "滾珠機構", "敲擊機構", "遊戲機構", "關卡機構", "大型骨架製作",
    "大型互動裝置", "控制元件",
  ],
  燈光聲音與多媒體: [
    "16×16 LED燈板", "8×8矩陣顯示", "LED", "LED燈光", "LED聲光回饋", "WS2812",
    "WS2812全彩LED", "RGB 燈光回饋", "燈光", "聲光互動", "聲光回饋", "聲光驅離",
    "語音播放", "聲音播放", "MP3 警告語音", "DFPlayer Mini", "錄音", "音樂", "音樂引導",
    "多曲目控制", "自動演奏", "頻率調節", "手機 App 編曲", "自行編曲", "竹管音階",
  ],
  資料分析與智慧判斷: [
    "同步判斷", "時間差分析", "訓練數據分析", "姿態判斷", "動作判斷", "動作特徵",
    "跌倒角度判斷", "雙條件觸發", "數據顯示", "數位孿生", "碳排計算", "普拉奇克情緒輪",
    "條件判斷", "防抖動程式",
  ],
  互動遊戲與體感控制: [
    "互動測試", "互動裝置", "互動機構", "光感射擊", "追光互動", "多人遊戲", "遊戲化",
    "遊戲機構", "隨機點播", "隨機目標程式", "雙人互動遊戲", "雙人競跑", "雙人競賽",
    "關卡機構", "展場整合", "聲光互動", "聲光回饋", "體感互動",
  ],
  "App、網頁與使用介面": [
    "手機 App 編曲", "自行編曲", "App或網頁", "網頁", "Android平板", "控制介面",
    "GitHub Pages", "Google表單", "數據顯示",
  ],
  材料工藝與造型製作: [
    "人物造型", "文化科技", "竹材加工", "竹管音階", "竹編QR Code", "圖騰編織",
    "魚形模型", "造型結構", "大型骨架製作",
  ],
  能源環境與科學原理: [
    "自行車發電", "能源感測", "智慧滴灌", "碳排計算", "光影原理", "磁力", "彈性位能",
    "摩擦力", "氣象開放資料", "數位孿生",
  ],
};

const categoriesByTechnology = new Map<string, TechnologyCategory[]>();
for (const [category, technologies] of Object.entries(groups) as [TechnologyCategory, readonly string[]][]) {
  for (const technology of technologies) {
    const current = categoriesByTechnology.get(technology) ?? [];
    if (!current.includes(category)) current.push(category);
    categoriesByTechnology.set(technology, current);
  }
}

export const getTechnologyCategories = (technologies: readonly string[]): TechnologyCategory[] =>
  technologyCategories.filter((category) =>
    technologies.some((technology) => categoriesByTechnology.get(technology)?.includes(category)),
  );

