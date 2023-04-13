import { NativeSelect } from "@mantine/core"
import { FC } from "react"

type Props = {
  label: string
  name: string | number
  type: string
  changeHandler?: any
  content: []
}
const SelectField: FC<Props> = ({ label, content, type, name, changeHandler }) => {
  return (
    <NativeSelect
      label={label}
      data={content}
      onChange={(e) => {
        changeHandler(name, label, type, e.target.value)
      }}
    />
  )
}

export default SelectField