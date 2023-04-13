import { TextInput } from '@mantine/core';
import { FC } from "react";

type Props = {
  label: string
  name: string | number
  type: string
  value?: string | number | undefined
  changeHandler?: any
}

const TextInputField: FC<Props> = ({ label, name, type, value, changeHandler }) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChange={(e) => {
        changeHandler(name, label, type, e.target.value)
      }}
    />
  )
}

export default TextInputField