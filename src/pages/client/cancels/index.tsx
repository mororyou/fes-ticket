import Title from '@/components/common/Title'
import { MULTISELECT_ITEMS, SELECTER_DAYS } from '@/constant/const'
import ClientLayout from '@/layout/client'
import { useAuthContext } from '@/context/AuthContext'
import { Apply } from '@/types/types'
import { Divider, Paper } from '@mantine/core'
import { IconCircleX } from '@tabler/icons'
import { FC, useEffect, useState } from 'react'
import { getCancelApplies } from '@/fetch/apply'

const Cancels = () => {
  const [receptions, setReceptions] = useState<Apply[]>([])
  const { currentUser } = useAuthContext()

  useEffect(() => {
    const f = async () => {
      const res = await getCancelApplies()
      setReceptions(res)
    }
    f()
  }, [])

  return (
    <ClientLayout title="キャンセル一覧">
      <Title title="キャンセル一覧" icon={<IconCircleX className="mr-2" />} />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Paper shadow="xs" p="md">
            <CancelGridHead />
            {receptions &&
              receptions.map((reception: Apply, index: number) => {
                return (
                  <CancelGridRow
                    key={index}
                    dates={reception.dates as []}
                    user={reception.name}
                    url={reception.url}
                    categories={reception.categories as []}
                    content={reception.content}
                    etc={reception.etc}
                  />
                )
              })}
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Cancels

const CancelGridHead = () => (
  <>
    <div className="grid grid-cols-12 items-center gap-x-4">
      <div className="font-nomal col-span-2 text-sm font-semibold">
        予約希望時間帯
      </div>
      <div className="font-nomal col-span-2 text-sm font-semibold">
        ユーザー名
      </div>
      <div className="font-nomal col-span-2 text-sm font-semibold">
        相談カテゴリ
      </div>
      <div className="font-nomal col-span-6 text-sm font-semibold">
        <p>相談内容</p>
        <p className="text-xs">詳細</p>
      </div>
    </div>
    <Divider my="sm" />
  </>
)

type CancelGridRowProps = {
  dates: [] | null
  user: string
  url?: string | null
  categories: [] | null
  content: string | null
  etc: string | null
}
const CancelGridRow: FC<CancelGridRowProps> = ({
  dates,
  user,
  url,
  categories,
  content,
  etc,
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
          {dateObj &&
            dateObj.map((date, index) => {
              console.log(date)
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
          {categoryObj &&
            categoryObj.map((category, index) => {
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
