import Title from '@/components/common/Title'
import { getApply } from '@/fetch/apply'
import ClientLayout from '@/layout/client'
import { Apply } from '@/types/types'
import { Button, Paper } from '@mantine/core'
import { IconChecklist, IconChecks, IconClipboardList } from '@tabler/icons'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { FC } from 'react'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string
  const apply: Apply = await getApply(id)
  return {
    props: {
      id: id,
      apply: apply,
    },
  }
}

type Props = {
  id: string
  apply: Apply
}

const Reception: FC<Props> = ({ id, apply }) => {
  const contents = apply.contents as []

  return (
    <ClientLayout title="申し込み詳細">
      <Title
        title="受付詳細"
        icon={<IconChecklist className="mr-2" />}
        btn={
          <Button size="xs" radius={'xs'} color="cyan">
            <Link href={'/client/receptions'} className="text-xs">
              戻る
            </Link>
          </Button>
        }
      />
      <div className="grid grid-cols-12 gap-x-6 gap-y-4">
        <Paper shadow="xs" p="md" className="col-span-12 md:col-span-7">
          <h3 className="mb-6 flex items-center justify-start border-b-[1.5px] border-gray-300 pb-1 text-sm font-semibold text-gray-500">
            <IconChecks className="mr-2" />
            申し込みフォーム内容
          </h3>
          <div className="grid grid-cols-1 gap-y-4">
            {contents &&
              contents.map((record: any, index: number) => {
                return (
                  <div
                    className="col-span-1 grid grid-cols-12 gap-x-2 text-sm"
                    key={index}
                  >
                    <p className="col-span-4 font-semibold">{record.label}</p>
                    {typeof record.value !== 'object' ? (
                      <p className="col-span-8">{record.value}</p>
                    ) : (
                      <p className="col-span-8 flex flex-wrap items-center gap-x-3">
                        {record.value &&
                          record.value.map((_val: any, idx: number) => (
                            <span key={idx}>{_val}</span>
                          ))}
                      </p>
                    )}
                  </div>
                )
              })}
          </div>
        </Paper>
        <Paper shadow="xs" p="md" className="col-span-12 md:col-span-5">
          <h3 className="mb-6 flex items-center justify-start border-b-[1.5px] border-gray-300 pb-1 text-sm font-semibold text-gray-500">
            <IconClipboardList className="mr-2" />
            対応内容
          </h3>
          <div className="flex flex-col"></div>
        </Paper>
      </div>
    </ClientLayout>
  )
}

export default Reception
