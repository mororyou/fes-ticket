import { Checkbox, Group } from "@mantine/core"
import { FC } from "react"

type Props = {
  label: string
  content: []
}
const CheckBoxField:FC<Props> = ({label, content}) => {
  return (
    <Checkbox.Group
      label={label}>
      <Group>
        {content && content.map((item, index) => (
          <Checkbox value={item} label={item} key={index}/>
        ))}
      </Group>
    </Checkbox.Group>
  )
}

export default CheckBoxField