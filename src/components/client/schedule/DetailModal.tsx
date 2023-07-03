import { Button, Modal, Select } from '@mantine/core'
import { Schedule } from '@/types/types'
import dayjs from 'dayjs'
import { useState, FC } from 'react'
import { useQueryClientSelector } from '@/hooks/client/useQueryClientSelector'

type Props = {
  opend: any
  close: any
  apply: Schedule
}

const DetailModal: FC<Props> = ({ opend, close, apply }) => {
  const [engineer, setEnginner] = useState<string | null>('')
  const [designer, setDesigner] = useState<string | null>('')

  const { data: clients } = useQueryClientSelector()

  const mailNoticeHandler = async () => {
    if (confirm('スケジュール確定メールを送信しますか？　【テスト中未実装】')) {
      // await fetch('/api/mail/notice', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json, text/plain, */*',
      //     'Content-Type': 'application/json',
      //   },
      // }).then(async (res) => {
      //   if (res.status === 200) {
      //   }
      // })
    }
  }

  return (
    <Modal opened={opend} onClose={close} title="詳細登録" size="lg">
      <div className="mb-8 grid grid-cols-12 items-center gap-x-8 gap-y-6">
        {/* 名前 */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          名前
        </label>
        <div className="col-span-8 text-xs text-gray-700">{apply?.user}</div>
        {/* 名前 */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          プロフィールURL
        </label>
        <div className="col-span-8 text-xs text-gray-700">
          {apply?.url ? (
            <a href={apply.url}>リベプロフィールリンク</a>
          ) : (
            'リベシティ外ユーザーもしくはプロフィールURL未登録'
          )}
        </div>
        {/* 日付 */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          日付
        </label>
        <div className="col-span-8 my-auto text-sm text-gray-700">
          {dayjs(apply?.start).format(' YYYY/MM/DD')}
        </div>
        {/* 時間 */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          時間
        </label>
        <div className="col-span-8 text-sm text-gray-700">
          {dayjs(apply?.start).format('HH:mm')} -{' '}
          {dayjs(apply?.end).format('HH:mm')}
        </div>

        {/*  */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          相談カテゴリ
        </label>
        <div className="col-span-8 text-xs text-gray-700"></div>

        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          相談内容
        </label>
        <div className="col-span-8 text-xs text-gray-700">{apply?.content}</div>

        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          その他
        </label>
        <div className="col-span-8 text-xs text-gray-700">{apply?.etc}</div>

        {/* 担当者 - enginner */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          担当者
        </label>
        <div className="col-span-8 my-auto text-sm text-gray-700">
          <Select data={clients as []} onChange={setEnginner} />
        </div>
        {/* 担当者 - designer */}
        <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
          担当者
        </label>
        <div className="col-span-8 my-auto text-sm text-gray-700">
          <Select data={clients as []} onChange={setDesigner} />
        </div>
      </div>
      <div className="flex w-full justify-between">
        {apply?.status === 1 && (
          <Button type="button">対応者登録(未実装)</Button>
        )}
        <Button
          color="grape"
          onClick={(e: any) => {
            e.preventDefaul()
            mailNoticeHandler()
          }}
        >
          メール送信
        </Button>
      </div>
    </Modal>
  )
}

export default DetailModal
