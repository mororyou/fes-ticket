import { MULTISELECT_ITEMS, SELECTER_DAYS } from '@/constant/const'
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
        {isLoading && <LoadingComponent />}
        <p className="rounded-md border border-gray-200 bg-white p-2 text-sm leading-6 text-gray-700">
          ※フォーム送信後、後日「予約確定メール」をお送りします。そちらのメールをもって予約確定となりますので、必ずご確認をお願いします。
          <br />
          ※相談時間は最大30分です。予約確定メールにて、予約が確保できた時間をお知らせします。
          <br />
          ※すでに枠が埋まってしまっている場合など、ご希望に添えず、予約をお取りできない場合もございます。あらかじめご了承ください。
        </p>
        <Divider className="my-5" />
        <div className="grid grid-cols-12 gap-y-6">
          <div className="col-span-12">
            <TextInput
              className="text-base"
              label={
                <label className="mb-2 flex items-center">
                  お名前（リベシティ名）
                  <RequireBadge />
                </label>
              }
              variant="filled"
              styles={{
                input: { fontSize: '16px', backgroundColor: '#F7F7F7' },
              }}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>
          <div className="col-span-12">
            <TextInput
              label={
                <label className="mb-2 flex items-center">
                  リベシティプロフィールURL
                  <ArbitraryBadge />
                </label>
              }
              variant="filled"
              type="text"
              styles={{
                input: { fontSize: '16px', backgroundColor: '#F7F7F7' },
              }}
              onChange={(e) => {
                setUrl(e.target.value)
              }}
            />
          </div>
          <div className="col-span-12">
            <TextInput
              label={
                <label className="mb-2 flex items-center">
                  メールアドレス
                  <RequireBadge />
                </label>
              }
              type="email"
              variant="filled"
              styles={{
                input: { fontSize: '16px', backgroundColor: '#F7F7F7' },
              }}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          {/* チェックボックスに変更 */}
          <div className="col-span-12">
            <Checkbox.Group
              label={
                <label className="mb-2 flex items-center">
                  希望日時（複数選択可能）
                  <RequireBadge />
                </label>
              }
              value={dates}
              onChange={setDates}
            >
              <Group className="grid w-full grid-cols-2">
                <div className="col-span-1"></div>
                {SELECTER_DAYS &&
                  SELECTER_DAYS.map((date, index) => {
                    return (
                      <div className="col-span-1" key={index}>
                        <Checkbox value={date.value} label={date.label} />
                      </div>
                    )
                  })}
              </Group>
            </Checkbox.Group>
          </div>

          <Divider className="col-span-full my-5" />

          <div className="col-span-12">
            <Checkbox.Group
              label={
                <label className="mb-2 flex items-center">
                  相談カテゴリ（複数選択可能）
                  <RequireBadge />
                </label>
              }
              value={categories}
              onChange={setCategories}
            >
              <Group className="grid w-full grid-cols-2">
                {MULTISELECT_ITEMS &&
                  MULTISELECT_ITEMS.map((category, index) => (
                    <div className="col-span-1" key={index}>
                      <Checkbox value={category.value} label={category.label} />
                    </div>
                  ))}
              </Group>
            </Checkbox.Group>
          </div>

          <div className="col-span-12">
            <Textarea
              label={
                <label className="mb-2 flex items-center">
                  相談内容（具体的にお願いします）
                  <ArbitraryBadge />
                </label>
              }
              variant="filled"
              minRows={4}
              styles={{
                input: {
                  fontSize: '16px',
                  backgroundColor: '#F7F7F7',
                  '::placeholder': {
                    color: '#AAA',
                  },
                },
              }}
              placeholder="例：自社のWEBサイトを改善したいけど方法がわからない / エンジニアになるための勉強法を教えてほしい / リベシティのアプリの使い方がわからない"
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />
          </div>

          <div className="col-span-12">
            <Textarea
              label={
                <label className="mb-2 flex items-center">
                  その他
                  <ArbitraryBadge />
                </label>
              }
              variant="filled"
              minRows={4}
              styles={{
                input: {
                  fontSize: '16px',
                  backgroundColor: '#F7F7F7',
                  '::placeholder': {
                    color: '#AAA',
                  },
                },
              }}
              placeholder="ご要望や希望時間がある方は、こちらにご入力ください"
              value={etc}
              onChange={(e) => {
                setEtc(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="my-12 flex justify-center md:justify-center">
          <Button
            radius={'xs'}
            className="h-20 w-[290px] bg-[#D21577] text-lg font-bold text-white hover:bg-[#D21577] hover:bg-opacity-70"
            onClick={(e) => {
              e.preventDefault()
              submitHandler()
            }}
            disabled={disable}
          >
            送信
          </Button>
        </div>
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