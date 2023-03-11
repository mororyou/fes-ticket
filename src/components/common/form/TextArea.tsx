import { Textarea } from "@mantine/core"
import { FC } from "react"

type Props = {
  label: string
}

const TextAreaField: FC<Props> = ({label}) => {
  return (
    <Textarea label={label} />
  )
}

export default TextAreaField