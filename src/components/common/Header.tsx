import { logout } from '@/libs/firebase/auth'
import { Burger, Button, Header, MediaQuery } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

const HeaderComponent = (opened: boolean, setOpened: any, theme: any) => {
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: any) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Link href={'/client/dashboard'}>
          <Image src={'/images/logo_fc.png'} width={200} height={60} alt="" />
        </Link>
        <Button color="pink" size="xs" onClick={logout}>
          ログアウト
        </Button>
      </div>
    </Header>
  )
}

export default HeaderComponent
