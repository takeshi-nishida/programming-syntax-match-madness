export const ja = {
  // StartScreen
  title: "Reflex",
  subtitle: "プログラミング構文無限カルタ",
  howToPlay: "遊び方",
  rule1: "だいたい同じ意味のペアを選ぶ",
  rule2: "左右から1枚ずつ選ぶ",
  rule3: "正解するとカードが消えて新しいカードが補充される",
  rule4: "連続正解でコンボが増える！",
  rule5: "全ペアをクリア",
  example: "例",
  equals: "＝",
  
  // Course selection
  selectCourse: "コースを選択",
  courseLevels: "Lv.",
  courseProblems: "問",
  courses: {
    basics: { name: "Basics", desc: "基礎文法・変数・ループ" },
    standard: { name: "Standard", desc: "配列メソッド・モダン構文" },
    advanced: { name: "Advanced", desc: "分割代入・非同期処理" },
  },

  // Game
  combo: "combo",

  // ResultScreen
  cleared: "クリア！",
  clearTime: "クリアタイム",
  maxCombo: "最大コンボ",
  matches: "マッチ数",
  shareResult: "結果をシェア",
  backToCourses: "コース選択に戻る",
  scoreCardHint: "「画像をコピー」を押してから、Xで貼り付けてください（下のボタンからXを開けます）。",
  copySuccess: "画像をコピーしました。Xを開いて貼り付けてください（下のボタンでも開けます）。",
  copyImage: "画像をコピー",
  shareToX: "X にシェア",
  close: "閉じる",

  // Share text
  shareTitle: "Reflex クリア！",
  shareCourse: "コース",
  shareTime: "タイム",
  shareMaxCombo: "最大コンボ",
  sharePairsComplete: "ペア完全制覇！",
  shareHashtags: "#Reflex #JavaScript",
  shareUrl: "https://takeshi-nishida.github.io/programming-syntax-match-madness/",

  // Language switcher
  language: "EN",
} as const;
