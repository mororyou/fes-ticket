export type NaviItem = {
  pageId: string
  title: string
  color: string
  icon: React.ReactNode
}

export type User = {
  id: number
  user_id: string
  booth_id: string
  role: string
  created_at: string
}

export type StateUser = {
  uid: string
  name: string
  email: string
  image: string
  boothId: string | null
  booth: string | null
  role: string
}

export type Questionnaire = {
  id: number
  booth_id: string | undefined
  contents: object | null
  delete_flg: boolean
  created_at: string
  updated_at: string
}

export type editedQuestionnaire = {
  id: number
  contents: object | null
  delete_flg: boolean
}

export type RecordProps = {
  index: number
  label: string
  content: any
  type: string
}
