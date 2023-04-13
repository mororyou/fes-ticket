import Title from '@/components/common/Title'
import CheckBoxComponent from '@/components/common/form/CheckBox'
import DateComponent from '@/components/common/form/Date'
import MultiComponent from '@/components/common/form/Multi'
import RadioComponent from '@/components/common/form/Radio'
import SelectComponent from '@/components/common/form/Select'
import TextAreaComponent from '@/components/common/form/TextArea'
import TextInputComponent from '@/components/common/form/TextInput'
import { DATES } from '@/constant/const'
import { useAuthContext } from '@/context/AuthContext'
import { getQuestionnaire } from '@/fetch/questionnaire'
import ClientLayout from '@/layout/client'
import { RecordProps } from '@/types/types'
import {
  Button,
  Divider,
  Paper,
  SegmentedControl,
  TextInput as TextField,
} from '@mantine/core'
import { IconSignature } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const QuestionnairePreview = () => {
  const { currentUser } = useAuthContext()
  const [questionnaire, setQuestionnaire] = useState<[] | null>(null)

  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      if (currentUser !== undefined && currentUser?.boothId !== null) {
        const res = await getQuestionnaire(currentUser?.boothId)
        setQuestionnaire(res?.contents)
      }
    }
    f()
  }, [currentUser])

  return (
    <ClientLayout title="申し込みフォーム - Preview" error={false}>
      <Title
        title="申し込みフォーム - プレビュー"
        btn={
          <Button
            size="xs"
            color="teal"
            onClick={() => {
              router.push('/client/questionnaire')
            }}
          >
            戻る
          </Button>
        }
        icon={<IconSignature size={24} className="mr-2 text-gray-700" />}
      />
      <Paper shadow="xs" p="md">
        <div className="grid grid-cols-12 gap-y-6">
          <div className="col-span-12">
            <TextField label="ユーザー名" />
          </div>

          <div className="col-span-12">
            <TextField label="プロフィールURL" />
          </div>

          <div className="col-span-12">
            <SegmentedControl data={DATES} />
          </div>

          <div className="col-span-12">
            <TextField label="予約時間帯" />
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
                          type={apply.type}
                        />
                      )
                    } else if (apply.type === 'textarea') {
                      return (
                        <TextAreaComponent
                          label={apply.label}
                          name={index}
                          type={apply.type}
                        />
                      )
                    } else if (apply.type === 'checkbox') {
                      return (
                        <CheckBoxComponent
                          label={apply.label}
                          content={apply.content}
                          name={index}
                          type={apply.type}
                        />
                      )
                    } else if (apply.type === 'radio') {
                      return (
                        <RadioComponent
                          label={apply.label}
                          content={apply.content}
                          name={index}
                          type={apply.type}
                        />
                      )
                    } else if (apply.type === 'select') {
                      return (
                        <SelectComponent
                          label={apply.label}
                          content={apply.content}
                          name={index}
                          type={apply.type}
                        />
                      )
                    } else if (apply.type === 'multi') {
                      return (
                        <MultiComponent
                          label={apply.label}
                          content={apply.content}
                          name={index}
                          type={apply.type}
                        />
                      )
                    } else if (apply.type === 'date') {
                      return (
                        <DateComponent
                          label={apply.label}
                          name={index}
                          type={apply.type}
                        />
                      )
                    }
                  })()}
                </div>
              )
            })}
        </div>
      </Paper>
    </ClientLayout>
  )
}

export default QuestionnairePreview
