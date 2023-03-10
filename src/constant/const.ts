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
  { label: '日付', value: 'date' },
]

// 項目が必須な種別
export const FORM_REQUIRE_ITEMS = ['checkbox', 'radio', 'select', 'multi']