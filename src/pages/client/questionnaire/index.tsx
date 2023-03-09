import Title from "@/components/common/Title"
import { FORM_REQUIRE_ITEMS, FORM_TYPES } from "@/constant/const"
import ClientLayout from "@/layout/client"
import {
  Button,
  Divider,
  MultiSelect,
  Paper,
  Select,
  TextInput
} from '@mantine/core'
import { IconCircleX, IconPlus, IconSignature } from '@tabler/icons'
import { FC, useEffect, useState } from "react"

type Props = {
  index: number
  label: string
  content: any
  type: string
}

const Questionnaire = () => {

  const [records, setRecords] = useState<Props[]>([])
  // レコード追加
  const pushRecord = () => {
    const idx = records.length
    const record = { index: idx, label: '', content: [], type: '' }
    setRecords([...records, record])
  }

  // レコード削除
  const destroyRecord = (index: number) => {
    const tmpRecords = [...records]
    tmpRecords.splice(index, 1)
    tmpRecords.map((tmpRecord, idx) => {
      tmpRecord.index = idx
    })
    setRecords(tmpRecords)
  }

  useEffect(() => {
    console.group('use effect')
    console.log(records)
    console.groupEnd()
  }, [records])

  const submitConfirmHandler = () => {
    console.group('confirm handler')
    console.groupEnd()
  }

  //
  const submitHandler = () => {
    console.group('submit handler')
    console.log(records)
    console.groupEnd()
  }

  return (
    <ClientLayout title="申し込みフォーム設定" active={"questionnaire"}>
      <Title
        title="申し込みフォーム設定"
        btn={null}
        icon={<IconSignature size={24} className="mr-2 text-gray-700" />}
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Paper shadow="xs" p="md">
            <h4 className="mb-4 border-b border-b-gray-700 border-opacity-60 pb-1">
              フォーム項目
            </h4>
            <GridHead />

            {records.map((record, idx) => {
              return (
                <GridRow
                  key={idx}
                  index={record.index}
                  label={record.label}
                  content={record.content}
                  type={record.type}
                  destroyAction={destroyRecord}
                  records={records}
                  setRecords={setRecords}
                />
              )
            })}

            <Button
              radius={'xs'}
              size="sm"
              leftIcon={<IconPlus size={18} className="mr-1" />}
              onClick={(e) => {
                e.preventDefault()
                pushRecord()
              }}
            >
              項目追加
            </Button>
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Questionnaire

// Grid Head
const GridHead = () => (
  <>
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-1 text-center">No.</div>
      <div className="col-span-2">ラベル</div>
      <div className="col-span-3">種類</div>
      <div className="col-span-5">項目</div>
      <div className="col-span-1"></div>
    </div>
    <Divider my="sm" />
  </>
)

type GridRowProps = {
  index: number
  label: string
  content: []
  type: string
  destroyAction: any
  records: Props[]
  setRecords: any
}

// Grid Row
const GridRow: FC<GridRowProps> = ({
  index,
  content,
  type,
  destroyAction,
  records,
  setRecords,
}) => {
  // 種類変更
  const typeChengeHandler = (idx: number, type: string) => {
    setRecords(
      records.map((record: Props) =>
        idx == record.index
          ? {
              index: record.index,
              label: record.label,
              content: record.content,
              type: type,
            }
          : record
      )
    )
  }
  // ラベル変更
  const labelChangeHandler = (idx: number, label: string) => {
    setRecords(
      records.map((record: Props) =>
        idx == record.index
          ? {
              index: record.index,
              label: label,
              content: record.content,
              type: record.type,
            }
          : record
      )
    )
  }

  // 選択肢変更
  const selectChengeHandler = (idx: number, values: object) => {
    const contents = records[idx].content
    contents.push(values)
    setRecords(
      records.map((record: Props) => {
        return idx == record.index
          ? {
              index: record.index,
              label: record.label,
              content: contents,
              type: record.type,
            }
          : record
      })
    )
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-1 flex items-center justify-center text-center">
          {index + 1}
        </div>
        <div className="col-span-2">
          <TextInput
            placeholder="ラベル"
            size="sm"
            radius="sm"
            onChange={(e) => {
              e.preventDefault()
              labelChangeHandler(index, e.target.value)
            }}
          />
        </div>
        <div className="col-span-3">
          <Select
            placeholder="種類"
            data={FORM_TYPES}
            size="sm"
            radius={'sm'}
            onChange={(value: string) => {
              typeChengeHandler(index, value)
            }}
          />
        </div>
        <div className="col-span-5">
          {FORM_REQUIRE_ITEMS.includes(type) ? (
            <MultiSelect
              placeholder=""
              data={content}
              creatable
              searchable
              getCreateLabel={(query) => `リスト作成 ${query}`}
              onCreate={(query) => {
                const items = { value: query, label: query }
                selectChengeHandler(index, items)
                return items
              }}
            />
          ) : (
            <p className="flex h-full items-center justify-center text-center font-mono">
              ー
            </p>
          )}
        </div>
        <div
          className="col-span-1 flex cursor-pointer items-center justify-center"
          onClick={(e) => {
            destroyAction(index)
          }}
        >
          <IconCircleX size="18" />
        </div>
      </div>
      <Divider my="sm" />
    </>
  )
}