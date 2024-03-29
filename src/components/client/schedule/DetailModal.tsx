import { Button, Modal, Select } from '@mantine/core'
import { Client, Schedule } from '@/types/types'
import dayjs from 'dayjs'
import { useState, useEffect, FC } from 'react'
import { useQueryClientSelector } from '@/hooks/client/useQueryClientSelector'
import { getApply } from '@/fetch/apply'
import { updateScheduleStatus, updateScheduleUser } from '@/fetch/schedule'
import { MULTISELECT_ITEMS } from '@/constant/const'

type Props = {
  opend: any
  close: any
  schedule: Schedule
  status: boolean
  setStatus: any
}

const DetailModal: FC<Props> = ({
  opend,
  close,
  schedule,
  status,
  setStatus,
}) => {
  const [engineer, setEnginner] = useState<string | null>()
  const [designer, setDesigner] = useState<string | null>()
  const [categories, setCategories] = useState<any[]>()

  const { data: clients } = useQueryClientSelector()

  useEffect(() => {
    setEnginner(schedule?.engineer)
    setDesigner(schedule?.designer)
    const tmpCategory = schedule?.categories as []
    const categoryObj: any[] = []
    tmpCategory?.map((category) => {
      const res = MULTISELECT_ITEMS.filter((rec) => rec.value == category)
      categoryObj.push(...res)
    })
    setCategories(categoryObj)
    console.log(schedule)
  }, [schedule])

  const mailNoticeHandler = async () => {
    if (confirm('スケジュール確定メールを送信しますか？　【テスト中未実装】')) {
      const apply = await getApply(schedule.apply_id)
      const sendData = {
        schedule: schedule,
        apply: apply,
      }
      await fetch('/api/mail/notice', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      }).then(async (res) => {
        if (res.status === 200) {
          alert('メールの送信が完了しました')
          setStatus(true)
          updateScheduleStatus(schedule.id, 2)
        }
      })
    }
  }

  const personHandler = async () => {
    if (confirm('担当者を登録してもよろしいですか？')) {
      try {
        await updateScheduleUser(schedule.id, engineer, designer)
        alert('登録しました')
      } catch (error) {
        alert('エラーが発生しました')
      }
    }
  }

  return (
    <Modal opened={opend} onClose={close} title="詳細登録" size="lg">
      <div className="mb-8 grid grid-cols-12 items-center gap-x-8 gap-y-6">
        {/* 名前 */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          名前
        </label>
        <div className="col-span-8 text-xs text-gray-700">{schedule?.user}</div>
        {/* 名前 */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          プロフィールURL
        </label>
        <div className="col-span-8 text-xs text-gray-700">
          {schedule?.url ? (
            <a href={schedule.url}>リベプロフィールリンク</a>
          ) : (
            'リベシティ外ユーザーもしくはプロフィールURL未登録'
          )}
        </div>
        {/* 日付 */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          日付
        </label>
        <div className="col-span-8 my-auto text-sm text-gray-700">
          {dayjs(schedule?.start).format(' YYYY/MM/DD')}
        </div>
        {/* 時間 */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          時間
        </label>
        <div className="col-span-8 text-sm text-gray-700">
          {dayjs(schedule?.start).format('HH:mm')} -{' '}
          {dayjs(schedule?.end).format('HH:mm')}
        </div>

        {/*  */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          相談カテゴリ
        </label>
        <div className="col-span-8 text-xs text-gray-700">
          {categories?.map((category: any, index: number) => (
            <span key={index}>
              <li>{category.label}</li>
            </span>
          ))}
        </div>

        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          相談内容
        </label>
        <div className="col-span-8 text-xs text-gray-700">
          {schedule?.content}
        </div>

        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          その他
        </label>
        <div className="col-span-8 text-xs text-gray-700">{schedule?.etc}</div>

        {/* 担当者 - enginner */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          担当者
        </label>
        <div className="col-span-8 my-auto text-sm text-gray-700">
          <Select
            data={clients as []}
            onChange={setEnginner}
            value={engineer}
          />
        </div>
        {/* 担当者 - designer */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          担当者
        </label>
        <div className="col-span-8 my-auto text-sm text-gray-700">
          <Select
            data={clients as []}
            onChange={setDesigner}
            value={designer}
          />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <Button
          type="button"
          onClick={() => {
            personHandler()
          }}
        >
          対応者登録(未実装)
        </Button>
        {!status ? (
          <Button
            color="grape"
            type="button"
            onClick={() => {
              mailNoticeHandler()
            }}
          >
            メール送信
          </Button>
        ) : (
          <Button color="dark" disabled>
            送信済み
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default DetailModal
