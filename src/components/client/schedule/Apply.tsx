import { Paper } from '@mantine/core'
import { Apply } from '@/types/types'
import { IconExternalLink } from '@tabler/icons'
import { FC } from 'react'

type Props = {
  apply: Apply
}

const ApplyItem: FC<Props> = ({ apply }) => (
  <>
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
  </>
)

export default ApplyItem
