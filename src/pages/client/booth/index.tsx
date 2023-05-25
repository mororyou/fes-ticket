import Title from '@/components/common/Title'
import ClientLayout from '@/layout/client'
import { Paper } from '@mantine/core'
import { IconFlag } from '@tabler/icons'
import Image from 'next/image'

const Booth = () => {
  return (
    <ClientLayout title="ブース設定画面">
      <Title title="ブース設定" icon={<IconFlag className="mr-2" />} />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Paper shadow="xs" p="md">
            Booth
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Booth
