import Title from '@/components/common/Title'
import ClientLayout from '@/layout/client'
import { Paper } from '@mantine/core'
import Image from 'next/image'

const Booth = () => {
  return (
    <ClientLayout title="ブース設定画面">
      <Title
        title="ブース設定"
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
            Booth
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Booth
