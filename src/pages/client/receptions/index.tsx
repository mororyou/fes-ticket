import Title from '@/components/common/Title'
import { DATES, MULTISELECT_ITEMS, SELECTER_DAYS } from '@/constant/const'
import { useAuthContext } from '@/context/AuthContext'
import { getApplies } from '@/fetch/apply'
import ClientLayout from '@/layout/client'
import { Apply } from '@/types/types'
import { Button, Divider, Paper, SegmentedControl } from '@mantine/core'
import { IconListNumbers } from '@tabler/icons'
import dayjs from 'dayjs'
import { FC, useEffect, useState } from 'react'

const Receptions = () => {
  const [date, setDate] = useState('2023-07-15')
  const [receptions, setReceptions] = useState<Apply[]>([])
  const { currentUser } = useAuthContext()

  useEffect(() => {
    const f = async () => {
      if (currentUser !== undefined && currentUser?.boothId !== null) {
        const res = await getApplies(currentUser?.boothId, date)
        setReceptions(res)
      }
    }
    f()
  }, [date, currentUser])

  return (
    <ClientLayout title="申込一覧">
      <Title title="申込一覧" icon={<IconListNumbers className="mr-2" />} />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Paper shadow="xs" p="md">
            {/* <SegmentedControl
              data={DATES}
              value={date}
              onChange={setDate}
              className="mb-8"
            /> */}
            <ReceptionGridHead />
            {receptions &&
              receptions.map((reception: Apply, index: number) => {
                return (
                  <ReceptionGridRow
                    key={index}
                    dates={reception.dates as []}
                    user={reception.name}
                    url={reception.url}
                    categories={reception.categories as []}
                    content={reception.content}
                    etc={reception.etc}
                    created_at={reception.created_at}
                  />
                )
              })}
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Receptions

const ReceptionGridHead = () => (
  <>
    <div className="grid grid-cols-12 items-center gap-x-4">
      <div className="font-nomal col-span-2 text-sm font-semibold">
        申込日時
      </div>
      <div className="font-nomal col-span-2 text-sm font-semibold">
        予約希望時間帯
      </div>
      <div className="font-nomal col-span-2 text-sm font-semibold">
        ユーザー名
      </div>
      <div className="font-nomal col-span-2 text-sm font-semibold">
        相談カテゴリ
      </div>
      <div className="font-nomal col-span-4 text-sm font-semibold">
        <p>相談内容</p>
        <p className="text-xs">詳細</p>
      </div>
    </div>
    <Divider my="sm" />
  </>
)

type ReceptionGridRowProps = {
  dates: [] | null
  user: string
  url?: string | null
  categories: [] | null
  content: string | null
  etc: string | null
  created_at: string
}

const ReceptionGridRow: FC<ReceptionGridRowProps> = ({
  dates,
  user,
  url,
  categories,
  content,
  etc,
  created_at,
}) => {
  const tmpDates = dates as []
  const dateObj: any[] = []
  tmpDates.map((date: string) => {
    const res = SELECTER_DAYS.filter((rec) => rec.value == date)
    dateObj.push(...res)
  })

  const tmpCategory = categories as []
  const categoryObj: any[] = []
  tmpCategory.map((category) => {
    const res = MULTISELECT_ITEMS.filter((rec) => rec.value == category)
    categoryObj.push(...res)
  })

  return (
    <>
      <div className="grid grid-cols-12 items-center gap-x-4">
        <div className="font-nomal col-span-2 flex flex-wrap justify-start text-sm">
          {dayjs(created_at).format('YYYY/MM/DD HH:mm')}
        </div>
        <div className="font-nomal col-span-2 flex flex-wrap justify-start text-sm">
          {dateObj?.map((date: any, index: number) => {
            return (
              <div key={index} className="text-xs font-medium">
                {date.label}
                <span className="px-1 text-gray-500">|</span>
              </div>
            )
          })}
        </div>
        <div className="font-nomal col-span-2 text-sm">
          {url ? (
            <a href={url} className="text-sm text-blue-500">
              {user}
            </a>
          ) : (
            <span className="text-sm">{user}</span>
          )}
        </div>
        <div className="font-nomal col-span-2 flex flex-wrap justify-start text-sm">
          {categoryObj?.map((category: any, index: number) => {
            return (
              <div key={index} className="text-xs font-medium">
                {category.label}
                <span className="px-1 text-gray-500">|</span>
              </div>
            )
          })}
        </div>
        <div className="font-nomal col-span-6 text-sm">
          <p className="text-xs">{content}</p>
          <p className="mt-1 text-xs font-light text-gray-500">{etc}</p>
        </div>
      </div>
      <Divider my="sm" />
    </>
  )
}
