// サイトタイトル
export const SITE_TITLE = 'リベフェス チケット管理'

// コピーライト
export const COPY_RIGHT = '© 2023 [非公式]リベフェス チケット管理'

// フォーム種別
export const FORM_TYPES = [
  { label: 'テキストフィールド（１行）', value: 'text' },
  { label: 'テキストフィールド（複数行）', value: 'textarea' },
  { label: 'チェックボックス', value: 'checkbox' },
  { label: 'ラジオボタン', value: 'radio' },
  { label: 'セレクトボックス', value: 'select' },
  { label: 'セレクトボックス（複数選択）', value: 'multi' },
]

// フェス日
export const DATES = [
  { label: '7月15日(土)', value: '2023-07-15' },
  { label: '7月16日(日)', value: '2023-07-16' },
  { label: '7月17日(月)', value: '2023-07-17' },
]

export const SELECTER_DAYS = [
  { label: '7/15 AM', value: '2023-07-15-AM' },
  { label: '7/15 PM', value: '2023-07-15-PM' },
  { label: '7/16 AM', value: '2023-07-16-AM' },
  { label: '7/16 PM', value: '2023-07-16-PM' },
  { label: '7/17 AM', value: '2023-07-17-AM' },
  { label: '7/17 PM', value: '2023-07-17-PM' },
]

// 項目が必須な種別
export const FORM_REQUIRE_ITEMS = ['checkbox', 'radio', 'select', 'multi']