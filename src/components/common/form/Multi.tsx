
import { MultiSelect } from "@mantine/core"
import { FC } from "react"

type Props = {
  label: string
  content: []
}
const MultiSelectField:FC<Props> = ({label, content}) => {
  return (
    <MultiSelect data={content} label={label} />
  )
}

export default MultiSelectField