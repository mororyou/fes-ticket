import { Group, Radio } from '@mantine/core';
import { FC } from "react";
type Props = {
  label: string
  content: []
}
const RadioField:FC<Props> = ({label, content}) => {
  return (
    <Radio.Group label={label}>
      <Group>
        {content && content.map((item, index) => (
          <Radio value={item} label={item} key={index} className="col-span-1" />
        ))}
      </Group>
    </Radio.Group>
  )
}

export default RadioField