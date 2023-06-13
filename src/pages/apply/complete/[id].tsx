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

  const router = useRouter()

  const chancelEventHandler = async () => {
    if (confirm('本当にキャンセルしてもよろしいでしょうか？')) {
      await updateStatusApplies(uuid, 99)
      alert('キャンセルしました')
      router.push(`/form`)
    }
  }

  return (
    <Paper shadow={'sm'} p="md" m={'md'}>
      <p className="text-sm font-semibold">
        以下の内容で申し込みが完了しました。
      </p>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 gap-y-3 md:grid-cols-5 md:gap-y-5">
        <p className="col-span-1 border-b border-gray-200 text-sm font-semibold text-gray-800">
          ■ ブース名
        </p>
        <p className="col-span-1 pl-2 text-sm md:col-span-4">{booth.name}</p>

        <p className="col-span-1 border-b border-gray-200 text-sm font-semibold text-gray-800">
          ■ 申込者名
        </p>
        <p className="col-span-1 pl-2 text-sm md:col-span-4">{apply.name}</p>

        <p className="col-span-1 border-b border-gray-200 text-sm font-semibold text-gray-800">
          ■ プロフィールURL
        </p>
        <p className="col-span-1 pl-2 text-sm md:col-span-4">{apply.url}</p>

        <p className="col-span-1 border-b border-gray-200 text-sm font-semibold text-gray-800">
          ■ 日時
        </p>
        <p className="col-span-1 pl-2 text-sm md:col-span-4">
          {/* { apply.date } - {apply.time ? apply.time : "未指定"} */}
        </p>
        {contents &&
          contents.map((record: any, index: number) => {
            return (
              <div
                key={index}
                className="col-span-1 flex w-full grid-cols-1 flex-col md:col-span-5 md:grid-cols-5"
              >
                <p className="col-span-1 border-b border-gray-200 text-sm font-semibold text-gray-800">
                  ■ {record.label}
                </p>
                <div className="col-span-1 pl-2 text-sm md:col-span-4">
                  {typeof record.value !== 'object' ? (
                    <>{record.value}</>
                  ) : (
                    <p className="flex flex-wrap items-center gap-x-3">
                      {record.value &&
                        record.value.map((_val: any, idx: number) => (
                          <span
                            key={idx}
                            className="rounded-sm bg-gray-400 px-4 py-1 text-white"
                          >
                            {_val}
                          </span>
                        ))}
                    </p>
                  )}
                </div>
              </div>
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
