import Title from '@/components/common/Title'
import ClientLayout from '@/layout/client'
import { Paper } from '@mantine/core'
import Image from 'next/image'

const Schedules = () => {
  return (
    <ClientLayout title="スケジュール設定">
      <Title
        title="スケジュール設定"
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
            Schedule
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Schedules
