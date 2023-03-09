import { NaviItem } from '@/types/types'
import {
  IconCalendarEvent,
  IconDashboard,
  IconListNumbers
} from '@tabler/icons'

export const NavItems: NaviItem[] = [
   {
    pageId: 'dashboard',
    title: 'ダッシュボード',
    color: 'blue',
    icon: <IconDashboard size={16} />,
  },
  {
    pageId: 'author',
    title: 'ユーザー一覧',
    color: 'blue',
    icon: <IconListNumbers size={16} />,
  },
  {
    pageId: 'booths',
    title: 'ブース一覧',
    color: 'blue',
    icon: <IconCalendarEvent size={16} />,
  },
]
