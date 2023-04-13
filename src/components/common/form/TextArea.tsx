import { Textarea } from "@mantine/core"
import { FC } from "react"

type Props = {
  label: string
  name: string | number
  type: string
  value?: string | number | undefined
  changeHandler: any
  content?: object | null | []
}

const TextAreaField: FC<Props> = ({ label, name, type, value, changeHandler, content }) => {
  return (
    <Textarea
      label={label}
      value={value}
      onChange={(e) => {
        changeHandler(name, label, type, e.target.value, content)
      }}
    />
  )
}

export default TextAreaField