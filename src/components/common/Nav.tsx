import { NaviItem } from '@/types/types'
import { Group, Navbar, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import Link from 'next/link'

const NaviComponent = (
  opened: boolean,
  naviitems: NaviItem[],
  directory: string
) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 250, lg: 300 }}
    >
      {naviitems &&
        naviitems.map((item: NaviItem) => {
          return (
            <Link href={`/${directory}/${item.pageId}`} key={item.pageId}>
              <UnstyledButton
                sx={(theme) => ({
                  display: 'block',
                  width: '100%',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[0]
                      : theme.black,

                  '&:hover': {
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                })}
              >
                <Group>
                  <ThemeIcon color={item.color} variant="light">
                    {item.icon}
                  </ThemeIcon>
                  <Text size={'sm'}>{item.title}</Text>
                </Group>
              </UnstyledButton>
            </Link>
          )
        })}
    </Navbar>
  )
}

export default NaviComponent
