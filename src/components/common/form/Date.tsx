
import { DatePicker } from "@mantine/dates"
import { FC } from "react"

type Props = {
  label: string
}

const DateField:FC<Props> = ({label}) => {
  return (
    <DatePicker label={label} />
  )
}

export default DateField
