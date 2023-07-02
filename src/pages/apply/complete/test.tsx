import { MULTISELECT_ITEMS, SELECTER_DAYS } from '@/constant/const'
import { getApply, updateStatusApplies } from '@/fetch/apply'
import { getBooth } from '@/fetch/booth'
import { Apply, Booth } from '@/types/types'
import { Button, Divider, Paper } from '@mantine/core'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

const ApplyComplete = () => {
  const router = useRouter()
  const [dates, setDates] = useState<any>([])
  const [categories, setCategories] = useState<any>([])

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
      <Paper p="md" className="mx-4">
        <div className="mx-8">
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
            <Link
              href={'/form'}
              className="mb-16 flex h-16 w-[290px] items-center justify-center bg-blue-500 text-lg font-bold text-white hover:bg-blue-500 hover:bg-opacity-70"
            >
              ホームに戻る
            </Link>
            <Button
              radius={'xs'}
              className="h-16 w-[290px] bg-[#D21577] text-lg font-bold text-white hover:bg-[#D21577] hover:bg-opacity-70"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              お申し込みをキャンセルする
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default ApplyComplete
