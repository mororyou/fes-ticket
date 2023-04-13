import Title from '@/components/common/Title'
import { getApply } from '@/fetch/apply'
import ClientLayout from '@/layout/client'
import { Apply } from '@/types/types'
import { Button, Paper } from '@mantine/core'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
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
  return (
    <ClientLayout title="申し込み詳細">
      <Title
        title="受付詳細"
        icon={
          <Image
            src="/images/icon/loincloth-stone.png"
            width={28}
            height={28}
            className="mr-2"
            alt="spats-stone"
          />
        }
        btn={
          <Button size="xs" radius={'xs'} color="cyan">
            <Link href={'/client/receptions'} className="text-xs">
              戻る
            </Link>
          </Button>
        }
      />
      <div className="grid grid-cols-12 gap-x-4">
        <Paper shadow="xs" p="md" className="col-span-7">
          <h3 className="mb-6 flex items-center justify-start border-b-[1.5px] border-gray-300 pb-1 text-sm font-semibold text-gray-500">
            <Image
              src={'/images/icon/spats-stone.png'}
              width={24}
              height={24}
              alt="spats-stone"
              className="mr-2"
            />
            申し込みフォーム内容
          </h3>
          <div className=""></div>
        </Paper>
        <Paper shadow="xs" p="md" className="col-span-5">
          <h3 className="mb-6 flex items-center justify-start border-b-[1.5px] border-gray-300 pb-1 text-sm font-semibold text-gray-500">
            <Image
              src={'/images/icon/spats-stone.png'}
              width={24}
              height={24}
              alt="spats-stone"
              className="mr-2"
            />
            対応内容
          </h3>
          <div className=""></div>
        </Paper>
      </div>
    </ClientLayout>
  )
}

export default Reception
