import { NavItems } from '@/components/admin/NavItems'
import HeaderComponent from '@/components/common/Header'
import NaviComponent from '@/components/common/Nav'
import useStore from '@/store'
import { AppShell, useMantineTheme } from '@mantine/core'
import Head from 'next/head'
import Router from 'next/router'
import { FC, useEffect, useState } from 'react'

type Props = {
  title: string
  active: string | null
  children: React.ReactNode
}

const AdminLayout: FC<Props> = ({ title, active, children }) => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const session = useStore((state) => state.session)
  const sessionUser = useStore((state) => state.sessionUser)

  useEffect(() => {
    if (session) {
      if (sessionUser?.role !== "administrator") {
        Router.push('/client/dashboard')
      }
    } else {
      Router.push('/')
    }
  }, [sessionUser])
  
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <AppShell
        navbar={NaviComponent(opened, NavItems, 'settings')}
        header={HeaderComponent(opened, setOpened, theme)}
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
      >
        <div className="m-2 flex flex-col gap-4">{children}</div>
      </AppShell>
    </>
  )
}

export default AdminLayout
