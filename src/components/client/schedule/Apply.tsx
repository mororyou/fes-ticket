import { Paper } from '@mantine/core'
import { Apply } from '@/types/types'
import { IconExternalLink } from '@tabler/icons'
import { FC } from 'react'

type Props = {
  apply: Apply
  onDragStart: any
}

const ApplyItem: FC<Props> = ({ apply, onDragStart }) => (
  <Paper
    onDragStart={() => {
      onDragStart(apply)
    }}
    draggable="true"
    shadow="md"
    p="md"
    className="col-span-1 grid h-16 w-full grid-cols-12 grid-rows-2 gap-5 p-4"
  >
    <p className="col-start-1 col-end-9 row-start-1 row-end-2 text-sm">
      {apply.name}
    </p>
  </Paper>
)

export default ApplyItem
