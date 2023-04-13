
import { MultiSelect } from "@mantine/core"
import { FC } from "react"

type Props = {
  label: string
  name: string | number
  type: string
  changeHandler?: any
  content: []
  value?: []
}
const MultiSelectField: FC<Props> = ({
  label,
  name,
  type,
  content,
  value,
  changeHandler,
}) => {
  return (
    <MultiSelect
      data={content}
      label={label}
      defaultValue={value}
      onChange={(values) => {
        changeHandler(name, label, type, values)
      }}
    />
  )
}

export default MultiSelectField