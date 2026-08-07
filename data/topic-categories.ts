export const topicCategories = [
  "在地文化與藝術",
  "健康運動與照護",
  "安全防災與通報",
  "環境永續與農業",
  "AI與智慧聯網",
  "程式機電與工程",
  "科學探索與創客實作",
  "教育學習與素養",
  "互動遊戲與體感",
  "社會關懷與合作",
] as const;

export type TopicCategory = (typeof topicCategories)[number];

const groups: Record<TopicCategory, readonly string[]> = {
  在地文化與藝術: [
    "八部合音", "文化科技", "日月潭地景", "布農文化", "民俗科技", "在地文化",
    "竹文化", "邵族白鹿傳說", "音樂科技", "圖騰編織", "臺語", "鯉魚意象",
  ],
  健康運動與照護: [
    "健康", "健康促進", "居家運動", "運動科技", "數據驅動訓練", "高齡照護",
    "高齡照顧", "社會照護", "情緒教育", "情緒陪伴", "SDG 3",
  ],
  安全防災與通報: [
    "安全", "防災與預警", "防疫", "防盜", "居家安全", "緊急通報", "遠端通報",
  ],
  環境永續與農業: [
    "永續材料", "食農教育", "能源", "智慧農業", "節水", "綠色交通", "環保再利用",
    "環境", "環境教育", "野生動物友善",
  ],
  AI與智慧聯網: [
    "AI", "AI 人臉辨識", "AI人臉辨識", "AI自主學習", "AI協作開發", "AI教育",
    "AI影像辨識", "AIoT", "物聯網",
  ],
  程式機電與工程: [
    "工程改良", "光電科技", "光影互動", "光線互動", "程式設計", "電路實作",
    "機電整合", "機構設計",
  ],
  科學探索與創客實作: [
    "科學玩具", "創客教育", "科幻教育", "作品迭代",
  ],
  教育學習與素養: [
    "自由創作", "低年級教育", "音樂素養", "教育科技", "寫字學習", "數據素養",
    "遊戲化學習", "SDG 4",
  ],
  互動遊戲與體感: [
    "互動設計", "互動遊戲", "體感互動",
  ],
  社會關懷與合作: [
    "社會關懷", "溝通與合作", "跨校合作", "團隊合作",
  ],
};

const categoryByTopic = new Map<string, TopicCategory>(
  Object.entries(groups).flatMap(([category, topics]) =>
    topics.map((topic) => [topic, category as TopicCategory] as const),
  ),
);

export const getTopicCategories = (topics: readonly string[]): TopicCategory[] =>
  [...new Set(topics.map((topic) => categoryByTopic.get(topic)).filter((category): category is TopicCategory => Boolean(category)))];

