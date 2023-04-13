import Title from '@/components/common/Title'
import { DATES } from '@/constant/const'
import { useAuthContext } from '@/context/AuthContext'
import { getApplies } from '@/fetch/apply'
import ClientLayout from '@/layout/client'
import { Apply } from '@/types/types'
import { Button, Divider, Paper, SegmentedControl } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

const Receptions = () => {
  const [date, setDate] = useState('2023-07-15')
  const [receptions, setReceptions] = useState<Apply[]>([])
  const { currentUser } = useAuthContext()

  useEffect(() => {
    const f = async () => {
      if (currentUser !== undefined && currentUser?.boothId !== null) {
        const res = await getApplies(currentUser?.boothId, date)
        setReceptions(res)
      }
    }
    f()
  }, [date, currentUser])

  return (
    <ClientLayout title="受付一覧">
      <Title
        title="受付一覧"
        icon={
          <Image
            src="/images/icon/loincloth-stone.png"
            width={28}
            height={28}
            className="mr-2"
            alt="spats-stone"
          />
        }
      />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Paper shadow="xs" p="md">
            <SegmentedControl
              data={DATES}
              value={date}
              onChange={setDate}
              className="mb-8"
            />
            <ReceptionGridHead />
            {receptions &&
              receptions.map((reception: Apply, index: number) => {
                return (
                  <ReceptionGridRow
                    key={index}
                    uid={reception.uuid}
                    seq={reception.seq}
                    time={reception.time}
                    user={reception.name}
                    url={reception.url}
                  />
                )
              })}
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Receptions

const ReceptionGridHead = () => (
  <>
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-1 text-center text-sm font-semibold">No.</div>
      <div className="col-span-2 text-sm font-semibold">予約時間</div>
      <div className="col-span-2 text-sm font-semibold">ユーザー名</div>
      <div className="col-span-4 text-sm font-semibold">対応(予定)者</div>
      <div className="col-span-1 text-center text-sm font-semibold">
        ステータス
      </div>
      <div className="col-span-2 text-sm font-semibold"></div>
    </div>
    <Divider my="sm" />
  </>
)

type ReceptionGridRowProps = {
  seq: number
  uid: string
  time: string
  user: string
  url?: string | null
}

const ReceptionGridRow: FC<ReceptionGridRowProps> = ({
  seq,
  uid,
  time,
  user,
  url,
}) => (
  <>
    <div className="grid grid-cols-12 items-center gap-x-4">
      <div className="col-span-1 text-center">{seq}</div>
      <div className="col-span-2">{time}</div>
      <div className="col-span-2">
        {user}
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-blue-500 underline"
          >
            [profile]
          </a>
        ) : (
          '[リベ外ユーザー]'
        )}
      </div>
      <div className="col-span-4 text-sm">対応者</div>
      <div className="col-span-1 text-center text-sm">ステータス</div>
      <div className="col-span-2 text-center">
        <Button size="xs" radius={'xs'} color="green">
          <Link href={`/client/receptions/${uid}`} className="text-sm">
            詳細画面
          </Link>
        </Button>
      </div>
    </div>
  </>
)
