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

export type Questionnaire = {
  id: number
  booth_id: string
  contents: object | null
  delete_flg: boolean
  created_at: string
  updated_At: string
}

export type editedQuestionnaire = {
  id: number
  contents: object | null
  delete_flg: boolean
}