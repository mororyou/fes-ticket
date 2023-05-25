import { UsersTable } from '@/components/client/User'
import { UserForm } from '@/components/client/forms/User'
import Title from '@/components/common/Title'
import { useAuthContext } from '@/context/AuthContext'
import { useClientMutate } from '@/hooks/client/useMutate'
import useQueryClient from '@/hooks/client/useQueryClients'
import { useSubscribeClients } from '@/hooks/client/useSubscribeClients'
import ClientLayout from '@/layout/client'
import useStore from '@/store'
import { Button, Paper } from '@mantine/core'
import { IconUser } from '@tabler/icons'
import Image from 'next/image'
import { useState } from 'react'

const Users = () => {
  const [opened, setOpened] = useState(false)
  const editClient = useStore((state) => state.editedClient)
  const update = useStore((state) => state.updatedEditedClient)
  const { currentUser } = useAuthContext()

  const { createClient, updateClient } = useClientMutate()
  const { data: clients } = useQueryClient()
  useSubscribeClients()

  return (
    <ClientLayout title="ユーザー一覧">
      <Title
        title="ユーザー一覧"
        icon={<IconUser className="mr-2" />}
        btn={
          <Button size="xs" color="teal" onClick={() => setOpened(true)}>
            追加
          </Button>
        }
      />
      <UserForm
        opened={opened}
        setOpened={setOpened}
        edited={editClient}
        boothId={currentUser?.boothId as string}
        update={update}
        createMutation={createClient}
        updateMutation={updateClient}
      />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Paper shadow="xs" p="md">
            <UsersTable
              clients={clients}
              setOpened={setOpened}
              update={update}
            />
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Users
