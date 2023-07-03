import { Paper } from '@mantine/core'
import { Apply } from '@/types/types'
import { FC } from 'react'
import { MULTISELECT_ITEMS, SELECTER_DAYS } from '@/constant/const'

type Props = {
  apply: Apply
  onDragStart: any
}

const ApplyItem: FC<Props> = ({ apply, onDragStart }) => {
  const tmpDates = apply.dates as []
  const dateObj: any[] = []
  tmpDates.map((date: string) => {
    const res = SELECTER_DAYS.filter((rec) => rec.value == date)
    dateObj.push(...res)
  })

  const tmpCategory = apply.categories as []
  const categoryObj: any[] = []
  tmpCategory.map((category) => {
    const res = MULTISELECT_ITEMS.filter((rec) => rec.value == category)
    categoryObj.push(...res)
  })
  return (
    <Paper
      draggable="true"
      shadow="lg"
      p="md"
      className="flex w-full flex-col gap-y-2"
      onDragStart={() => {
        onDragStart(apply)
      }}
    >
      <p className="col-start-1 col-end-9 row-start-1 row-end-2 text-sm font-bold">
        {apply.name}
      </p>
      <ul className="col-span-full row-start-2 row-end-3 flex flex-wrap gap-2 text-xs">
        {dateObj.map((date, index) => {
          return (
            <li
              key={index}
              className="rounded-sm bg-stone-400 px-2 py-1 text-[0.5rem] text-white"
            >
              {date.label}
            </li>
          )
        })}
      </ul>
      <ul className="col-span-full row-start-2 row-end-3 flex flex-wrap gap-2 text-xs">
        {categoryObj.map((category, index) => {
          return (
            <li
              key={index}
              className="rounded-sm bg-slate-400 px-2 py-1 text-[0.5rem] text-white"
            >
              {category.label}
            </li>
          )
        })}
      </ul>
      <p className="text-xs text-gray-700">{apply.content}</p>
      <p className="text-[0.5rem] text-gray-700">{apply.etc}</p>
    </Paper>
  )
}

export default ApplyItem
