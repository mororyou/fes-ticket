import { Group, Radio } from '@mantine/core';
import { FC } from "react";
type Props = {
  label: string
  name: string | number
  type: string
  content: []
  changeHandler?: any
  value?: string
}
const RadioField: FC<Props> = ({ label, name, type, content, value, changeHandler }) => {
  return (
    <Radio.Group
      label={label}
      defaultValue={value}
      onChange={(value) => {
        changeHandler(name, label, type, value)
      }}
    >
      <Group>
        {content &&
          content.map((item, index) => (
            <Radio
              value={item}
              label={item}
              key={index}
              className="col-span-1"
            />
          ))}
      </Group>
    </Radio.Group>
  )
}

export default RadioField