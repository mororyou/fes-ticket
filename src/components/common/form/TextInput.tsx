import { TextInput } from '@mantine/core';
import { FC } from "react";

type Props = {
  label: string
  // onChange: () => void
}

const TextInputField:FC<Props> = ({label}) => {
  return (
    <TextInput label={label}  />
  )
}

export default TextInputField