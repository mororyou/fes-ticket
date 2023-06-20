import { MULTISELECT_ITEMS } from '@/constant/const'
import { getApply, updateStatusApplies } from '@/fetch/apply'
import { getBooth } from '@/fetch/booth'
import { Apply, Booth } from '@/types/types'
import { Button, Divider, Paper } from '@mantine/core'
import { GetServerSideProps } from 'next'
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
  const [dates, setDates] = useState<[]>([])
  const [categories, setCategories] = useState<any>([])
  useEffect(() => {
    const tmpCategory = apply.categories as []
    const categoryObj: any[] = []
    tmpCategory.map((category) => {
      const res = MULTISELECT_ITEMS.filter((rec) => rec.value == category)
      categoryObj.push(...res)
    })
    setDates(apply.dates as [])
    setCategories(categoryObj)
  }, [apply])

  const chancelEventHandler = async () => {
    if (confirm('本当にキャンセルしてもよろしいでしょうか？')) {
      await updateStatusApplies(uuid, 99)
      alert('キャンセルしました')
      router.push(`/form`)
    }
  }

  return (
    <Paper
      shadow={'sm'}
      p="md"
      m={'md'}
      className="mx-auto max-w-[600px] lg:w-2/5"
    >
      <p className="text-sm font-semibold">
        以下の内容で申し込みが完了しました。
      </p>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 gap-y-3 md:gap-y-5">
        <dl className="flex flex-col">
          {/* Name */}
          <dt className="mb-2 text-sm font-semibold text-gray-700">
            お名前（リベシティ名）
          </dt>
          <dd className="mb-6 px-2 text-sm text-gray-700">{apply.name}</dd>

          {/* Url */}
          {apply.url && (
            <>
              <dt className="mb-2 text-sm font-semibold text-gray-700">
                リベシティプロフィールURL
              </dt>
              <dd className="mb-6 px-2 text-sm text-gray-700">
                <a
                  href={apply.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500"
                >
                  {apply.url}
                </a>
              </dd>
            </>
          )}

          {/* Mail */}
          <dt className="mb-2 text-sm font-semibold text-gray-700">
            メールアドレス
          </dt>
          <dd className="mb-6 px-2 text-sm text-gray-700">{apply.email}</dd>

          {/* Dates */}
          <dt className="mb-2 text-sm font-semibold text-gray-700">
            希望日時（複数選択可能）
          </dt>
          <dd className="mb-6 grid grid-cols-3 gap-y-4 px-2 text-gray-700">
            {dates?.map((date: any, index: number) => {
              return (
                <span key={index} className="text-sm text-gray-700">
                  {date.label}
                </span>
              )
            })}
          </dd>

          {/* Dates */}
          <dt className="mb-2 text-sm font-semibold text-gray-700">
            相談カテゴリ（複数選択可能）
          </dt>
          <dd className="mb-6 grid grid-cols-3 gap-y-4 px-2 text-gray-700">
            {categories?.map((category: any, index: number) => {
              return (
                <span key={index} className="text-sm text-gray-700">
                  {category.label}
                </span>
              )
            })}
          </dd>

          {/* Mail */}
          <dt className="mb-2 text-sm font-semibold text-gray-700">
            相談内容（具体的にお願いします）
          </dt>
          <dd className="mb-6 px-2 text-sm text-gray-700">{apply.content}</dd>

          {/* Mail */}
          <dt className="mb-2 text-sm font-semibold text-gray-700">その他</dt>
          <dd className="mb-6 px-2 text-sm text-gray-700">{apply.etc}</dd>
        </dl>
      </div>
      <div className="my-12 flex justify-center md:justify-start">
        <Button
          size="sm"
          color={'red'}
          radius={'xs'}
          onClick={(e) => {
            e.preventDefault()
            chancelEventHandler()
          }}
        >
          キャンセル
        </Button>
      </div>
    </Paper>
  )
}

export default ApplyComplete
