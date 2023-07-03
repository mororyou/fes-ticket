import { Paper } from '@mantine/core'
import { Apply } from '@/types/types'
import { FC } from 'react'
import { IconArticle } from '@tabler/icons'

type Props = {
  apply: Apply
  onDragStart: any
}

const ApplyItem: FC<Props> = ({ apply, onDragStart }) => (
  <Paper
    draggable="true"
    shadow="lg"
    p="md"
    className="col-span-1 grid h-16 w-full grid-cols-12 grid-rows-2 items-center gap-5 p-4"
    onDragStart={() => {
      onDragStart(apply)
    }}
  >
    <p className="col-start-1 col-end-9 row-start-1 row-end-2 text-sm">
      {apply.name}
    </p>
  </Paper>
)

export default ApplyItem
