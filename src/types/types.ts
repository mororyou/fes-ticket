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
  value: any
}

export type Apply = {
  id: number
  uuid: string
  booth: string
  seq: number
  name: string
  url: string
  email: string
  dates: object | null | []
  categories: object | null | []
  content: string
  etc: string
  status: number
  created_at: string
  updated_at: string
}

export type EditedApply = {
  id: number
  name: string
  url: string
  email: string
  dates: object | null | []
  categories: object | null | []
  content: string
  etc: string
  status: number
}

export type Booth = {
  id: string
  name: string
  location: string
  questionary: boolean
  status: number
  created_at: string
  updated_at: string
}

export type Client = {
  id: number
  booth_id: string
  name: string
  url: string
  skill: string
  date: string
  memo: string
  created_at: string
}

export type EditedClient = {
  id: number
  name: string
  url: string
  skill: string
  date: string
  memo: string
}

export type Event = {
  id: number
  title: string
  user: string
  start: string
  end: string
  resourceId: number | null
  url: string
  contents: Object | null
  date: string
}

export type Schedule = {
  id: number
  title: string
  user: string
  date: string
  start: string
  end: string
  resourceId: number | null
  url: string
  email: string
  contents: Object | null
  designer: string
  engineer: string
  created_at: string
}

export type EditedSchedule = {
  id: number
  title: string
  user: string
  date: string
  start: string
  end: string
  resourceId: number | null
  url: string
  email: string
  contents: Object | null
  designer: string
  engineer: string
}