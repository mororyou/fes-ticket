import CheckBoxComponent from "@/components/common/form/CheckBox"
import DateComponent from "@/components/common/form/Date"
import MultiComponent from "@/components/common/form/Multi"
import RadioComponent from "@/components/common/form/Radio"
import SelectComponent from "@/components/common/form/Select"
import TextAreaComponent from "@/components/common/form/TextArea"
import TextInputComponent from "@/components/common/form/TextInput"
import Title from '@/components/common/Title'
import { DATES, SELECTER_DAYS } from '@/constant/const'
import { getNextSeq } from '@/fetch/apply'
import { getBooth } from '@/fetch/booth'
import { getQuestionnaire } from '@/fetch/questionnaire'
import { useApplyMutate } from '@/hooks/apply/useMutate'
import { Booth, RecordProps } from '@/types/types'
import {
  Button,
  Divider,
  MultiSelect,
  Paper,
  SegmentedControl,
  TextInput as TextField,
} from '@mantine/core'
import { IconSignature } from '@tabler/icons'
import { GetServerSideProps } from 'next'
import { FC, useEffect, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const uuid = ctx.params?.id as string
  const questionnaire = await getQuestionnaire(uuid)
  const booth = await getBooth(uuid)
  const seq = await getNextSeq(uuid)
  return {
    props: {
      uuid,
      seq: seq,
      booth: booth,
      questionnaire: questionnaire?.contents,
    },
  }
}

type Props = {
  id: string
  seq: number
  questionnaire: []
  booth: Booth
}

const Apply: FC<Props> = ({ id, seq, questionnaire, booth }) => {
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [dates, setDates] = useState<any>([])
  const [time, setTime] = useState<string>('')
  const [contents, setContents] = useState<any>([])

  const { createApply } = useApplyMutate()

  const changeEventHandler = (
    key: number,
    label: string,
    type: string,
    value: string | [] | Object | boolean,
    content?: object | [] | null
  ) => {
    setContents(
      contents.map((record: any) =>
        key === record.index
          ? {
              index: key,
              label: label,
              value: value,
              content: record.content,
              type: type,
            }
          : record
      )
    )
  }

  const submitHandler = async () => {
    await createApply.mutate({
      booth: booth.id as string,
      dates: dates,
      seq: seq,
      time: time,
      name: name,
      url: url,
      contents: contents,
      status: 1,
    })
  }

  useEffect(() => {
    const records = []
    for (let i = 0; i < questionnaire.length; i++) {
      const el = questionnaire[i]
      const record = {
        index: i,
        label: '',
        value: null,
        type: '',
        content: el['content'],
      }
      records.push(record)
    }
    setContents(records)
  }, [questionnaire])

  return (
    <Paper shadow={'sm'} p="md" m={'md'}>
      <Title
        title={booth.name}
        btn={null}
        icon={<IconSignature size={24} className="mr-2 text-gray-700" />}
      />
      <div className="grid grid-cols-12 gap-y-6">
        <div className="col-span-12">
          <TextField
            label="ユーザー名"
            withAsterisk
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div className="col-span-12">
          <TextField
            label="リベシティプロフィールURL"
            onChange={(e) => {
              setUrl(e.target.value)
            }}
          />
        </div>
        <div className="col-span-12">
          <MultiSelect
            label="希望日時 時間帯"
            data={SELECTER_DAYS}
            onChange={setDates}
          />
        </div>

        <Divider my="sm" className="col-span-12" size={'sm'} />

        {questionnaire &&
          questionnaire.map((apply: RecordProps, index) => {
            return (
              <div key={index} className="col-span-12">
                {(() => {
                  if (apply.type === 'text') {
                    return (
                      <TextInputComponent
                        label={apply.label}
                        name={index}
                        changeHandler={changeEventHandler}
                        type={apply.type}
                      />
                    )
                  } else if (apply.type === 'textarea') {
                    return (
                      <TextAreaComponent
                        name={index}
                        label={apply.label}
                        changeHandler={changeEventHandler}
                        type={apply.type}
                      />
                    )
                  } else if (apply.type === 'checkbox') {
                    return (
                      <CheckBoxComponent
                        label={apply.label}
                        name={index}
                        changeHandler={changeEventHandler}
                        content={apply.content}
                        type={apply.type}
                      />
                    )
                  } else if (apply.type === 'radio') {
                    return (
                      <RadioComponent
                        label={apply.label}
                        name={index}
                        changeHandler={changeEventHandler}
                        content={apply.content}
                        type={apply.type}
                      />
                    )
                  } else if (apply.type === 'select') {
                    return (
                      <SelectComponent
                        label={apply.label}
                        name={index}
                        changeHandler={changeEventHandler}
                        content={apply.content}
                        type={apply.type}
                      />
                    )
                  } else if (apply.type === 'multi') {
                    return (
                      <MultiComponent
                        label={apply.label}
                        name={index}
                        changeHandler={changeEventHandler}
                        content={apply.content}
                        type={apply.type}
                      />
                    )
                  } else if (apply.type === 'date') {
                    return (
                      <DateComponent
                        label={apply.label}
                        name={index}
                        changeHandler={changeEventHandler}
                        type={apply.type}
                      />
                    )
                  }
                })()}
              </div>
            )
          })}
      </div>
      <div className="my-12 flex justify-center md:justify-start">
        <Button
          radius={'xs'}
          onClick={(e) => {
            e.preventDefault()
            submitHandler()
          }}
        >
          送信
        </Button>
      </div>
    </Paper>
  )
}

export default Apply