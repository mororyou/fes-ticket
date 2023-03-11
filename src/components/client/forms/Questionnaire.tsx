import { FORM_REQUIRE_ITEMS, FORM_TYPES } from "@/constant/const"
import { Questionnaire, RecordProps } from "@/types/types"
import {
  Button,
  Divider,
  MultiSelect, Select,
  TextInput
} from '@mantine/core'
import { IconCircleX, IconPlus } from '@tabler/icons'
import { FC, memo, useEffect, useState } from "react"

type Props = {
  questionnaire: Questionnaire | null
  createMutation: any
  updateMutation: any
  boothId: string
}

const QuestionnaireFormMemo:FC<Props> = ({
  questionnaire,
  createMutation,
  updateMutation,
  boothId
}) => {
  const [records, setRecords] = useState<any>([])
  
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

  const submitHandler = () => {
    if(records.length > 0) {
      if (questionnaire === null) {
        // 新規登録
        createMutation.mutate({
          booth_id: boothId,
          contents: records,
          delete_flg: false,
        })
      } else {
        // 更新
        updateMutation.mutate({
          id: questionnaire.id,
          booth_id: boothId,
          contents: records,
          delete_flg: false,
        })
      }
    }
  }

  useEffect(() => {
    if (
      questionnaire !== null &&
      questionnaire?.contents !== null
    ) {
      setRecords(questionnaire.contents)
    }
  }, [questionnaire])

  return (
    <>
      <GridHead />
      {records && records.map((record: any, idx: number) => (
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
      ))}
      <div className="flex items-center justify-between mt-12">
        <Button
          radius={'xs'}
          size="sm"
          color="green"
          leftIcon={<IconPlus size={18} className="mr-1" />}
          onClick={(e) => {
            e.preventDefault()
            pushRecord()
          }}
        >
          項目追加
        </Button>
        <Button
          radius={'xs'}
          size="md"
          onClick={(e) => {
            e.preventDefault()
            submitHandler()
          }}
        >
          登録
        </Button>
      </div>
    </>
  )
}


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
  records: RecordProps[]
  setRecords: any
}

// Grid Row
const GridRow: FC<GridRowProps> = ({
  index,
  label,
  content,
  type,
  destroyAction,
  records,
  setRecords,
}) => {
  // 種類変更
  const typeChengeHandler = (idx: number, type: string) => {
    setRecords(
      records.map((record: RecordProps) =>
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
      records.map((record: RecordProps) =>
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
  const selectChengeHandler = (idx: number, values: string) => {
    const contents = records[idx].content
    contents.push(values)
    setRecords(
      records.map((record: RecordProps) => {
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
            value={label}
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
            value={type}
            onChange={(value: string) => {
              typeChengeHandler(index, value)
            }}
          />
        </div>
        <div className="col-span-5">
          {FORM_REQUIRE_ITEMS.includes(type) ? (
            <MultiSelect
              placeholder=""
              creatable
              searchable
              defaultValue={content}
              data={content}
              getCreateLabel={(query) => `リスト作成 ${query}`}
              onCreate={(query) => {
                // const items = { value: query, label: query }
                selectChengeHandler(index, query)
                return query
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

export const QuestionnaireFrom = memo(QuestionnaireFormMemo)