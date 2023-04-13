
import { DatePicker } from "@mantine/dates"
import { FC } from "react"

type Props = {
  label: string
  name: string | number
  type: string
  value?: Date | null | undefined
  changeHandler?: any
}

const DateField: FC<Props> = ({ label, name, type, value, changeHandler }) => {
  return (
    <DatePicker
      label={label}
      locale="ja"
      inputFormat="YYYY/MM/DD"
      defaultValue={value && new Date(value)}
      onChange={(e) => {
        changeHandler(name, label, type, e?.toLocaleDateString())
      }}
    />
  )
}

export default DateField
