import { MULTISELECT_ITEMS, FILTER_SELECTER_DAYS } from '@/constant/const'
import { getNextSeq } from '@/fetch/apply'
import { getBooth } from '@/fetch/booth'
import { useApplyMutate } from '@/hooks/apply/useMutate'
import { Booth } from '@/types/types'
import {
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  Textarea,
  TextInput,
} from '@mantine/core'
import { GetStaticProps } from 'next'
import { FC, useEffect, useState } from 'react'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const uuid = '67fb30df-8180-4947-a5df-e26fc725db94'
  const booth = await getBooth(uuid)
  const seq = await getNextSeq(uuid)
  return {
    props: {
      uuid,
      seq: seq,
      booth: booth,
    },
  }
}

type Props = {
  id: string
  seq: number
  questionnaire: []
  booth: Booth
}

const Form: FC<Props> = ({ id, seq, questionnaire, booth }) => {
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [dates, setDates] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const [content, setContent] = useState<string>('')
  const [etc, setEtc] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { createApply } = useApplyMutate()

  const submitHandler = async () => {
    await setIsLoading(true)
    await createApply.mutate({
      booth: booth.id as string,
      seq: seq,
      name: name,
      url: url,
      email: email,
      dates: dates,
      categories: categories,
      content: content,
      etc: etc,
      status: 1,
    })
  }

  useEffect(() => {
    if (
      name.length > 1 && // name 2文字以上
      email.length > 4 && // email 4文字以上
      categories.length > 0 && // 相談カテゴリ1つ以上
      dates.length > 0 // 希望日時1つ以上
    ) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [categories, name, email, dates])

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
        <h3 className="text-lg font-semibold leading-8">
          予約受付は終了いたしました。
          <br />
          予約希望の方は、直接ブース（No.50）の方にお越しください。
          <br />
          枠が埋まっている場合は、予約がお取りできない場合がございます。ご了承ください。
        </h3>
      </Paper>
    </div>
  )
}

export default Form

const RequireBadge = () => (
  <span className="rounded-xs ml-2 border border-[#D21577] px-2 py-1 text-xs text-[#D21577] ">
    必須
  </span>
)

const ArbitraryBadge = () => (
  <span className="rounded-xs ml-2 border border-gray-500 px-2 py-1 text-xs text-gray-500">
    任意
  </span>
)

const LoadingComponent = () => (
  <div className="fixed left-0 top-0 z-50 flex min-h-screen w-screen items-center justify-center bg-white bg-opacity-90">
    <div className="loader">
      <p className="heading">送信中</p>
      <div className="loading">
        <div className="load"></div>
        <div className="load"></div>
        <div className="load"></div>
        <div className="load"></div>
      </div>
    </div>
  </div>
)
