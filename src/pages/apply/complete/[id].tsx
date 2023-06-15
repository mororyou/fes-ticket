import { getApply, updateStatusApplies } from '@/fetch/apply'
import { getBooth } from '@/fetch/booth'
import { Apply, Booth } from '@/types/types'
import { Button, Divider, Paper } from '@mantine/core'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

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
  const contents = apply.contents as []
  const dates = apply.dates as []
  const router = useRouter()

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
          <dt className="mb-2 text-sm font-semibold text-gray-700">お名前</dt>
          <dd className="mb-6 px-2 text-gray-700">{apply.name}</dd>

          {/* Url */}
          {apply.url && (
            <>
              <dt className="mb-2 text-sm font-semibold text-gray-700">
                リベシティプロフィールURL
              </dt>
              <dd className="mb-6 px-2 text-gray-700">
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
          <dd className="mb-6 px-2 text-gray-700">{apply.email}</dd>

          {/* Dates */}
          <dt className="mb-2 text-sm font-semibold text-gray-700">希望日時</dt>
          <dd className="mb-6 grid grid-cols-3 gap-y-4 px-2 text-gray-700">
            {dates?.map((date: any, index: number) => {
              return (
                <span key={index} className="text-gray-700">
                  {date.label}
                </span>
              )
            })}
          </dd>

          {/* DateDetails */}
          <dt className="mb-2 text-sm font-semibold text-gray-700">
            希望時間詳細
          </dt>
          <dd className="px-2 text-gray-700">{apply.date_details}</dd>
        </dl>
        <Divider />
        {contents &&
          contents.map((record: any, index: number) => {
            return (
              <dl key={index} className="flex flex-col">
                <dt className="mb-2 text-sm font-semibold text-gray-700">
                  ■ {record.label}
                </dt>
                <dd className="mb-6 px-2 text-gray-700">
                  {typeof record.value !== 'object' ? (
                    <>{record.value}</>
                  ) : (
                    <p className="grid grid-cols-3 items-center gap-4 md:grid-cols-4">
                      {record.value &&
                        record.value.map((_val: any, idx: number) => (
                          <span
                            key={idx}
                            className="rounded-sm bg-gray-400 py-1 text-center text-sm text-white"
                          >
                            {_val}
                          </span>
                        ))}
                    </p>
                  )}
                </dd>
              </dl>
            )
          })}
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
