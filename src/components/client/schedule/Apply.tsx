import { Paper } from '@mantine/core'
import { Apply } from '@/types/types'
import { IconExternalLink } from '@tabler/icons'
import { FC } from 'react'

type Props = {
  apply: Apply
  onDragStart: any
}

const ApplyItem: FC<Props> = ({ apply, onDragStart }) => (
  <Paper className="grid-row-2 col-span-1 grid h-16 w-full grid-cols-12 gap-5 p-4 shadow-md">
    <p className="col-start-1 col-end-9 row-start-1 row-end-2 text-sm">
      {apply.name}
    </p>
    {apply.url && (
      <a
        href={apply.url}
        target="_blank"
        rel="noopener noreferrer"
        onDragStart={() => {}}
        className="col-start-9 col-end-13 row-start-1 row-end-3 flex items-center justify-end"
      >
        <IconExternalLink size={24} />
      </a>
    )}
  </Paper>
)

export default ApplyItem
