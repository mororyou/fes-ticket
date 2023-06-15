import { Client } from '@/types/types'
import { ActionIcon, ScrollArea, Table } from '@mantine/core'
import { IconWriting } from '@tabler/icons'
import { FC, memo } from 'react'

type Props = {
  clients: Client[] | undefined
  setOpened: any
  update: any
}

const UsersMemo: FC<Props> = ({ clients, setOpened, update }) => {
  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th className="w-2/12 px-2 text-xs">名前</th>
            <th className="w-2/12 px-2 text-xs">活動予定日</th>
            <th className="w-3/12 px-2 text-xs">スキル</th>
            <th className="w-4/12 px-2 text-xs">Memo</th>
            <th className="w-1/12 px-2 text-xs"></th>
          </tr>
        </thead>
        <tbody>
          {clients &&
            clients.map((client) => {
              return (
                <TableRow
                  key={client.id}
                  client={client}
                  setOpened={setOpened}
                  update={update}
                />
              )
            })}
        </tbody>
      </Table>
    </ScrollArea>
  )
}

type TableRowProps = {
  client: Client
  setOpened: any
  update: any
}

const TableRow: FC<TableRowProps> = ({ client, setOpened, update }) => {
  return (
    <tr>
      <td className="flex flex-col gap-y-1">
        <p>{client.name}</p>
        <a href={client.url} target="_blank" rel="noopener noreferrer">
          <span className="w-auto rounded-full bg-blue-700 px-2 py-1 text-[0.5rem] text-white hover:bg-opacity-70 ">
            プロフィール
          </span>
        </a>
      </td>
      <td>
        <span className="text-xs text-gray-700"></span>
      </td>
      <td>
        <span className="text-xs text-gray-700">{client.skill}</span>
      </td>
      <td>
        <span className="whitespace-pre-wrap text-[0.5rem] text-gray-700">
          {client.memo}
        </span>
      </td>
      <td>
        <ActionIcon variant="subtle">
          <IconWriting
            size={16}
            onClick={(e) => {
              e.preventDefault()
              update({
                id: client.id,
                name: client.name,
                url: client.url,
                date: client.date,
                skill: client.skill,
                memo: client.memo,
              })
              setOpened(true)
            }}
          />
        </ActionIcon>
      </td>
    </tr>
  )
}

export const UsersTable = memo(UsersMemo)
