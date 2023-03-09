import { Burger, Header, MediaQuery } from '@mantine/core'
import Link from 'next/link'

const HeaderComponent = (opened: boolean, setOpened: any, theme: any) => (
  <Header height={{ base: 50, md: 70 }} p="md">
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
    </div>
  </Header>
)

export default HeaderComponent
