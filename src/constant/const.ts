// サイトタイトル
export const SITE_TITLE = 'リベフェス チケット管理'

// コピーライト
export const COPY_RIGHT = '© 2023 [非公式]リベフェス チケット管理'

export const FROM_MAIL_ADDRESS = 'info@libefes-ticket.com'

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
export const FILTER_SELECTER_DAYS = [
  // {
  //   label: '7/16(日) PM',
  //   value: '2023-07-16-PM',
  //   date: '2023/7/16',
  //   timezone: 'PM',
  // },
  // {
  //   label: '7/17(月) AM',
  //   value: '2023-07-17-AM',
  //   date: '2023/7/17',
  //   timezone: 'AM',
  // },
  {
    label: '7/17(月) PM',
    value: '2023-07-17-PM',
    date: '2023/7/17',
    timezone: 'PM',
  },
]

export const SELECTER_DAYS = [
  {
    label: '7/15(土) PM',
    value: '2023-07-15-PM',
    date: '2023/7/15',
    timezone: 'PM',
  },
  {
    label: '7/16(日) AM',
    value: '2023-07-16-AM',
    date: '2023/7/16',
    timezone: 'AM',
  },
  {
    label: '7/16(日) PM',
    value: '2023-07-16-PM',
    date: '2023/7/16',
    timezone: 'PM',
  },
  {
    label: '7/17(月) AM',
    value: '2023-07-17-AM',
    date: '2023/7/17',
    timezone: 'AM',
  },
  {
    label: '7/17(月) PM',
    value: '2023-07-17-PM',
    date: '2023/7/17',
    timezone: 'PM',
  },
]

export const MULTISELECT_ITEMS = [
  {
    label: 'Webサイト、ホームページ',
    value: 'web',
  },
  {
    label: 'デザイン',
    value: 'design',
  },
  {
    label: 'システム',
    value: 'system',
  },
  {
    label: 'マーケティング',
    value: 'marketing',
  },
  {
    label: '業務改善',
    value: 'improvement',
  },
  {
    label: 'Web集客',
    value: 'attracting',
  },
  {
    label: 'パソコンやスマホの使い方',
    value: 'treatment',
  },
  {
    label: 'キャリア、転職',
    value: 'carrier',
  },
  {
    label: 'その他',
    value: 'etc',
  },
]

// 項目が必須な種別
export const FORM_REQUIRE_ITEMS = ['checkbox', 'radio', 'select', 'multi']

export const RESOUCE_MAPS = [
  { resourceId: 1, resourceTitle: '予約ブース' },
  { resourceId: 2, resourceTitle: '当日ブース' },
]