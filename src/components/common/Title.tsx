import { FC, ReactNode } from 'react'

type Props = {
  icon: ReactNode
  title: string
  btn: ReactNode | null
}

const Title: FC<Props> = ({ icon, title, btn = null }) => (
  <h2 className="mb-6 flex items-center justify-between border-b border-gray-600 pb-1 text-xl font-bold text-gray-700">
    <p className="flex items-center">
      {icon}
      {title}
    </p>
    {btn && btn}
  </h2>
)

export default Title
