import CheckBoxComponent from '@/components/common/form/CheckBox'
import DateComponent from '@/components/common/form/Date'
import MultiComponent from '@/components/common/form/Multi'
import RadioComponent from '@/components/common/form/Radio'
import SelectComponent from '@/components/common/form/Select'
import TextAreaComponent from '@/components/common/form/TextArea'
import TextInputComponent from '@/components/common/form/TextInput'
import Title from '@/components/common/Title'
import { DATES, SELECTER_DAYS } from '@/constant/const'
import { getNextSeq } from '@/fetch/apply'
import { getBooth } from '@/fetch/booth'
import { getQuestionnaire } from '@/fetch/questionnaire'
import { useApplyMutate } from '@/hooks/apply/useMutate'
import { Booth, RecordProps } from '@/types/types'
import {
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  TextInput as TextField,
} from '@mantine/core'
import { IconSignature } from '@tabler/icons'
import { GetStaticProps } from 'next'
import { FC, useEffect, useState } from 'react'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const uuid = '67fb30df-8180-4947-a5df-e26fc725db94'
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

const Form: FC<Props> = ({ id, seq, questionnaire, booth }) => {
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [dates, setDates] = useState<any>([])
  const [dateDetails, setDateDetails] = useState<string>('')
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
    console.log('送信中...')
    const dateObj: any[] = []
    dates.map((date: string) => {
      const res = SELECTER_DAYS.filter((rec) => rec.value == date)
      dateObj.push(...res)
    })

    const sendData = {
      name: name,
      email: email,
      url: url,
    }

    await fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    }).then(async (res) => {
      if (res.status === 200) {
        console.log('送信完了!!!')
        await createApply.mutate({
          booth: booth.id as string,
          dates: dateObj,
          seq: seq,
          date_details: dateDetails,
          name: name,
          email: email,
          url: url,
          contents: contents,
          status: 1,
        })
      }
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
    <Paper shadow={'sm'} p="md" m={'md'} className="mx-auto lg:w-2/5">
      {/* PC幅 500~600px */}
      <Title
        title={booth.name}
        btn={null}
        icon={<IconSignature size={24} className="mr-2 text-gray-700" />}
      />
      <div className="grid grid-cols-12 gap-y-6">
        <div className="col-span-12">
          <TextField
            label="お名前"
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
          <TextField
            label="メールアドレス"
            withAsterisk
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        {/* チェックボックスに変更 */}
        <div className="col-span-12">
          <Checkbox.Group
            label="希望日時"
            withAsterisk
            value={dates}
            onChange={setDates}
          >
            <Group className="grid w-full grid-cols-2">
              {SELECTER_DAYS &&
                SELECTER_DAYS.map((date, index) => (
                  <div className="col-span-1" key={index}>
                    <Checkbox value={date.value} label={date.label} />
                  </div>
                ))}
            </Group>
          </Checkbox.Group>
          <TextField
            className="mt-4"
            label="希望時間"
            placeholder="細かい希望時間がある方はこちらにご記入ください。"
            onChange={(e) => {
              setDateDetails(e.target.value)
            }}
          />
          <p className="ml-1 mt-1 text-xs text-gray-600">
            時間が確定したらこちらから改めてご連絡します。
          </p>
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

export default Form
