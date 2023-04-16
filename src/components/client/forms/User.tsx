import { EditedClient } from '@/types/types'
import {
  Button,
  Drawer,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core'
import { ChangeEvent, FC, FormEvent, memo } from 'react'

type Props = {
  opened: boolean
  setOpened: any
  edited: EditedClient
  boothId: string
  update: (payload: EditedClient) => void
  createMutation: any
  updateMutation: any
}

const UserFormMemo: FC<Props> = ({
  opened,
  setOpened,
  edited,
  boothId,
  update,
  createMutation,
  updateMutation,
}) => {
  const theme = useMantineTheme()

  const submitEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (edited.id === 0) {
      // 新規登録
      createMutation.mutate({
        name: edited.name,
        url: edited.url,
        booth_id: boothId,
        skill: edited.skill,
        date: edited.date,
        memo: edited.memo,
      })
    } else {
      // 更新
      updateMutation.mutate({
        id: edited.id,
        name: edited.name,
        url: edited.url,
        skill: edited.skill,
        date: edited.date,
        memo: edited.memo,
      })
    }
    setOpened(false)
  }
  return (
    <Drawer
      opened={opened}
      position="right"
      size={'50%'}
      title={edited.id ? 'ユーザー情報更新' : '新規ユーザー登録'}
      padding="xl"
      onClose={() => setOpened(false)}
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <form
        className="flex flex-col gap-y-6 px-2 py-6"
        onSubmit={submitEventHandler}
      >
        <TextInput
          label="名前"
          type="text"
          placeholder="名前"
          value={edited.name}
          withAsterisk
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            update({ ...edited, name: e.target.value })
          }
        />
        <TextInput
          label="プロフィールURL"
          type="url"
          placeholder="https://libecity.com/user_profile/~~~~~~"
          value={edited.url}
          withAsterisk
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            update({ ...edited, url: e.target.value })
          }
        />
        <TextInput
          label="スキル"
          type="text"
          value={edited.skill}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            update({ ...edited, skill: e.target.value })
          }
        />
        <TextInput
          label="活動予定日"
          type="text"
          value={edited.date}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            update({ ...edited, date: e.target.value })
          }
        />
        <Textarea
          label="memo"
          value={edited.memo}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            update({ ...edited, memo: e.target.value })
          }
        />
        <Button className="mt-8 w-3/12" radius={'xs'} type="submit">
          {edited.id ? '更新' : '登録'}
        </Button>
      </form>
    </Drawer>
  )
}

export const UserForm = memo(UserFormMemo)
