import { supabase } from '@/libs/supabase'
import useStore from '@/store'
import { Burger, Button, Header, MediaQuery } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

const HeaderComponent = (opened: boolean, setOpened: any, theme: any) => {

  const router = useRouter()
  const setSessionUser = useStore((state) => state.setSessionUser)
  const logout = () => {
    setSessionUser(null)
    supabase.auth.signOut()
    router.push('/')
  }
  
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: any) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Link href={'/admin/dashboard'}>LOGO</Link>
        <Button color="pink" size="xs" onClick={logout}>
          ログアウト
        </Button>
      </div>
    </Header>
  )
}

export default HeaderComponent
