import { NaviItem } from '@/types/types'
import {
  IconCalendarEvent,
  IconCircleX,
  IconDashboard,
  IconFlag,
  IconHomeCancel,
  IconListNumbers,
  IconSignature,
  IconUser,
} from '@tabler/icons'

export const NavItems: NaviItem[] = [
  {
    pageId: 'dashboard',
    title: 'ダッシュボード',
    color: 'blue',
    icon: <IconDashboard size={16} />,
  },
  {
    pageId: 'receptions',
    title: '申込一覧',
    color: 'blue',
    icon: <IconListNumbers size={16} />,
  },
  {
    pageId: 'schedules',
    title: 'スケジュール',
    color: 'blue',
    icon: <IconCalendarEvent size={16} />,
  },
  {
    pageId: 'cancels',
    title: 'キャンセル一覧',
    color: 'blue',
    icon: <IconCircleX size={16} />,
  },
  {
    pageId: 'users',
    title: 'ユーザー設定',
    color: 'blue',
    icon: <IconUser size={16} />,
  },
  // {
  //   pageId: 'questionnaire',
  //   title: 'フォーム設定',
  //   color: 'blue',
  //   icon: <IconSignature size={16} />,
  // },
  // {
  //   pageId: 'booth',
  //   title: 'ブース設定',
  //   color: 'blue',
  //   icon: <IconFlag size={16} />,
  // },
]
