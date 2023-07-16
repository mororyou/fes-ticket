import { getYoyaku02Schedules } from '@/fetch/schedule'
import ClientLayout from '@/layout/client'
import { Divider, Paper } from '@mantine/core'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [receptions, setReceptions] = useState<any>([])

  useEffect(() => {
    const getData = async () => {
      const res = await getYoyaku02Schedules()
      setReceptions(res)
      // setReceptions(res)
    }
    getData()
  }, [])
  return (
    <ClientLayout title="Dashboard" error={false}>
      <Paper shadow="xs" p="sm" m={'sm'}>
        <div className="grid grid-cols-12 items-center gap-4">
          <div className="font-nomal col-span-2 text-sm font-semibold">
            時間
          </div>
          <div className="font-nomal col-span-2 text-sm font-semibold">
            [ブース01][相談者]
          </div>
          <div className="font-nomal col-span-3 text-sm font-semibold">
            [ブース01][担当者]
          </div>
          <div className="font-nomal col-span-2 text-sm font-semibold">
            [ブース02][相談者]
          </div>
          <div className="font-nomal col-span-3 text-sm font-semibold">
            [ブース02][担当者]
          </div>
        </div>
        <Divider my="sm" />
        {receptions &&
          receptions.map((reception: any) => {
            return (
              <>
                <div className="grid grid-cols-12 items-center gap-4">
                  <div className="font-nomal col-span-2 text-sm">
                    {dayjs(reception.start).format('hh時mm分')}〜
                    {dayjs(reception.end).format('hh時mm分')}
                  </div>
                  <div className="font-nomal col-span-2 text-sm">
                    <a
                      href={reception.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reception.user}
                    </a>
                  </div>
                  <div className="font-nomal col-span-3 text-sm">
                    {reception.engineer ? (
                      reception.engineer
                    ) : (
                      <span className="text-red-500">未定</span>
                    )}{' '}
                    /{' '}
                    {reception.designer ? (
                      reception.designer
                    ) : (
                      <span className="text-red-500">未定</span>
                    )}
                  </div>
                  <div className="font-nomal col-span-2 text-sm">
                    <a
                      href={reception.url02}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reception.user02}
                    </a>
                  </div>
                  <div className="font-nomal col-span-3 text-sm">
                    {reception.engineer02 ? (
                      reception.engineer02
                    ) : (
                      <span className="text-red-500">未定</span>
                    )}{' '}
                    /{' '}
                    {reception.designer02 ? (
                      reception.designer02
                    ) : (
                      <span className="text-red-500">未定</span>
                    )}
                  </div>
                </div>
                <Divider my="sm" />
              </>
            )
          })}
      </Paper>
    </ClientLayout>
  )
}

export default Dashboard
