import { MULTISELECT_ITEMS, SELECTER_DAYS } from '@/constant/const'
import { getApply, updateStatusApplies } from '@/fetch/apply'
import { getBooth } from '@/fetch/booth'
import { Apply, Booth } from '@/types/types'
import { Button, Divider, Paper } from '@mantine/core'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const uuid = ctx.params?.id as string
  const apply: Apply = await getApply(uuid)
  const booth: Booth = await getBooth(apply.booth)
  return {
    props: {
      uuid: uuid,
      apply: apply,
      booth: booth,
    },
  }
}

type Props = {
  uuid: string
  apply: Apply
  booth: Booth
}

const ApplyComplete: FC<Props> = ({ uuid, apply, booth }) => {
  const router = useRouter()
  const [dates, setDates] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  useEffect(() => {
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
    setDates(dateObj)
    setCategories(categoryObj)
  }, [apply])

  const chancelEventHandler = async () => {
    if (confirm('本当にキャンセルしてもよろしいでしょうか？')) {
      await updateStatusApplies(uuid, 99)
      alert('キャンセルしました')
      router.push(`https://fukuoka-creators.studio.site/`)
    }
  }

  return (
    <div className="mx-auto flex max-w-[600px] flex-col lg:w-2/5">
      <div className="curved">
        <h1 className="text-center text-lg font-bold leading-6 text-white md:text-lg">
          【稼ぐ力をサポート！】ITお悩み相談
          <br />
          by福岡クリエイターズ
          <br />
          <span className="mt-1 text-xl">予約フォーム</span>
        </h1>
      </div>
      <Paper p="md" className="mx-6">
        <p className="mb-8 text-sm leading-6">
          この度は、【ITお悩み相談】へお申し込みいただき誠にありがとうございます。
          <br />
          受付完了の自動返信メールを送信いたしましたので、ご確認をお願いいたします。
          <br />
          現在、予約状況の確認を行っております。予約が確定次第、【予約確定メール】をお送りいたしますのでお待ちいただきますようお願い申し上げます。
        </p>
        <p className="mb-2 text-base font-semibold text-gray-800">
          ＜自動返信メールが届かない場合＞
        </p>
        <p className="mb-8 text-sm leading-6">
          入力いただいたメールアドレスに誤りがあるか、迷惑メールフォルダに振り分けられている可能性がございます。
          <br />
          もしドメイン指定をされている場合は、fukuoka.creators@gmail.comからのメールが受信できるようあらかじめ設定をお願いいたします。
        </p>
        <p className="mb-2 text-base font-semibold text-gray-800">
          ＜予約内容の変更をしたい場合＞
        </p>
        <p className="mb-8 text-sm leading-6">
          以下の「お申し込みをキャンセルする」ボタンよりキャンセルの上、再度お手続きをお願いいたします。
          <br />
          何かご不明点がお問い合わせがございましたら、お気軽にfukuoka.creators@gmail.comまでご連絡ください。
        </p>
        <div className="my-12 flex flex-col items-center justify-center md:justify-center">
          <a
            href={`https://fukuoka-creators.studio.site/`}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-16 flex h-16 w-[290px] items-center justify-center bg-blue-500 text-lg font-bold text-white hover:bg-blue-500 hover:bg-opacity-70"
          >
            ホームに戻る
          </a>
          <Button
            radius={'xs'}
            className="h-16 w-[290px] bg-[#D21577] text-lg font-bold text-white hover:bg-[#D21577] hover:bg-opacity-70"
            onClick={(e) => {
              e.preventDefault()
              chancelEventHandler()
            }}
          >
            お申し込みをキャンセルする
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default ApplyComplete
