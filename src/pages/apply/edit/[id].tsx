import CheckBoxComponent from "@/components/common/form/CheckBox"
import DateComponent from "@/components/common/form/Date"
import MultiComponent from "@/components/common/form/Multi"
import RadioComponent from "@/components/common/form/Radio"
import SelectComponent from "@/components/common/form/Select"
import TextAreaComponent from "@/components/common/form/TextArea"
import TextInputComponent from "@/components/common/form/TextInput"
import Title from '@/components/common/Title'
import { getApply } from "@/fetch/apply"
import { getBooth } from "@/fetch/booth"
import { getQuestionnaire } from "@/fetch/questionnaire"
import { useApplyMutate } from "@/hooks/apply/useMutate"
import { Apply, Booth, RecordProps } from "@/types/types"
import { Button, Divider, Paper, TextInput as TextField } from '@mantine/core'
import { DatePicker } from "@mantine/dates"
import { IconSignature } from '@tabler/icons'
import { GetServerSideProps } from "next"
import { FC, useEffect, useState } from "react"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string
  const apply: Apply = await getApply(id)
  const booth: Booth = await getBooth(apply.booth)
  const questionnaire = await getQuestionnaire(apply.booth)
  return {
    props: {
      id: id,
      apply: apply,
      booth: booth,
      questionnaire: questionnaire?.contents,
    }
  }
}

type Props = {
  id: string
  apply: Apply
  booth: Booth
  questionnaire: []
}

const ApplyEdit: FC<Props> = ({
  id, apply, booth, questionnaire
}) => {
  
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [contents, setContents] = useState<any>([])

  const { updatedApply } = useApplyMutate()

  useEffect(() => {
    setName(apply.name)
    setUrl(apply.url)
    setDate(apply.date)
    setTime(apply.time)
    setContents(apply.contents)
  }, [])

  const changeEventHandler = (
    key: number,
    label: string,
    type: string,
    value: string | [] | Object | boolean,
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
          } : record
      )
    )
  }

  const submitHandler = async () => {
    await updatedApply.mutate({
      id: apply.id,
      date: date,
      time: time,
      name: name,
      url: url,
      contents: contents,
      status: apply.status
    })
  }

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
            value={name}
          />
        </div>
        <div className="col-span-12">
          <TextField
            label="プロフィールURL"
            withAsterisk
            onChange={(e) => {
              setUrl(e.target.value)
            }}
            value={url}
          />
        </div>
        <div className="col-span-12">
          <DatePicker
            label="予約日"
            locale="ja"
            defaultValue={new Date(apply.date)}
            inputFormat="YYYY/MM/DD"
            onChange={(e) => {
              setDate(e?.toLocaleDateString() as string)
            }}
          />
        </div>
        <div className="col-span-12">
          <TextField
            label="予約時間帯"
            value={time}
            onChange={(e) => {
              setTime(e.target.value)
            }}
          />
        </div>

        <Divider my="sm" className="col-span-12" size={'sm'} />

        {contents && contents.map((apply: RecordProps, index: number) => {
          return (
            <div key={index} className='col-span-12'>
              {(() => {
                if (apply.type === "text") {
                  return(
                    <TextInputComponent
                      label={apply.label}
                      name={index}
                      changeHandler={changeEventHandler}
                      type={apply.type}
                      value={apply.value}
                    />
                  )
                } else if (apply.type === 'textarea') {
                  return (
                    <TextAreaComponent
                      name={index}
                      label={apply.label}
                      changeHandler={changeEventHandler}
                      type={apply.type}
                      value={apply.value}
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
                      value={apply.value}
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
                      value={apply.value}
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
                      value={apply.value}
                    />
                  )
                } else if (apply.type === 'date') {
                  return (
                    <DateComponent
                      label={apply.label}
                      name={index}
                      changeHandler={changeEventHandler}
                      type={apply.type}
                      value={apply.value}
                    />
                  )
                }
              })()}
            </div>
          )
        })}

      </div>
      <div className="flex justify-center md:justify-start my-12">
        <Button size="sm" color={'green'} radius={'xs'}
          onClick={(e) => {
            e.preventDefault()
            submitHandler()
          }}>
          更新する
        </Button>
      </div>
    </Paper>
  )
}

export default ApplyEdit