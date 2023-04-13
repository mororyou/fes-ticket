import { Checkbox, Group } from "@mantine/core"
import { FC } from "react"

type Props = {
  label: string
  name: string | number
  type: string
  changeHandler?: any
  value?: []
  content: []
}
const CheckBoxField: FC<Props> = ({ label, name, type, content, value, changeHandler }) => {
  return (
    <Checkbox.Group
      label={label}
      defaultValue={value}
      onChange={(values) => {
        changeHandler(name, label, type, values)
      }}
    >
      <Group>
        {content &&
          content.map((item, index) => (
            <Checkbox value={item} label={item} key={index} />
          ))}
      </Group>
    </Checkbox.Group>
  )
}

export default CheckBoxField