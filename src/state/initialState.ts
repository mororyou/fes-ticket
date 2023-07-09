export const QuestionnaireState = {
  id: 0,
  booth_id: '',
  contents: null,
  delete_flg: false,
  created_at: '',
  updated_At: '',
}

export const ApplyState = {
  id: 0,
  uuid: '',
  booth: '',
  seq: 0,
  name: '',
  url: '',
  email: '',
  dates: null,
  categories: null,
  content: '',
  etc: '',
  status: 0,
  created_at: '',
  updated_At: '',
}

export const ClientState = {
  id: 0,
  booth_id: '',
  name: '',
  url: '',
  skill: '',
  date: '',
  memo: '',
  created_at: '',
}

export const ScheduleState = {
  id: 0,
  apply_id: '',
  title: '',
  user: '',
  date: '',
  start: '',
  end: '',
  resourceId: 0,
  url: '',
  email: '',
  contents: null,
  designer: '',
  engineer: '',
  categories: null,
  content: '',
  etc: '',
  status: 0,
  created_at: '',
}