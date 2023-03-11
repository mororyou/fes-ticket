import { NativeSelect } from "@mantine/core"
import { FC } from "react"

type Props = {
  label: string
  content: []
}
const SelectField:FC<Props> = ({label, content}) => {
  return (
    <NativeSelect label={label} data={content} />
  )
}

export default SelectField