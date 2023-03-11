import { NavItems } from '@/components/admin/NavItems'
import HeaderComponent from '@/components/common/Header'
import NaviComponent from '@/components/common/Nav'
import { useAuthContext } from '@/context/AuthContext'
import { AppShell, useMantineTheme } from '@mantine/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

type Props = {
  title: string
  error: boolean
  children: React.ReactNode
}

const AdminLayout: FC<Props> = ({ title, error = false, children }) => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const {currentUser} = useAuthContext()
  const router = useRouter()
  
  useEffect(() => {
    if (currentUser !== undefined) {
      if (currentUser.booth === "") {
        router.push('/error/nonbooth')
      } else {
        if (currentUser.role !== "client") {
          router.push('/admin/dashboard')
        }
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <AppShell
        navbar={!error ? NaviComponent(opened, NavItems, 'settings') : <></>}
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
