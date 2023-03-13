import CheckBox from "@/components/common/form/CheckBox"
import Date from "@/components/common/form/Date"
import Multi from "@/components/common/form/Multi"
import Radio from "@/components/common/form/Radio"
import Select from "@/components/common/form/Select"
import TextArea from "@/components/common/form/TextArea"
import TextInput from "@/components/common/form/TextInput"
import { getQuestionnaire } from '@/fetch/questionnaire'
import { RecordProps } from "@/types/types"
import { Paper } from "@mantine/core"
import { GetServerSideProps } from 'next'
import { FC } from 'react'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string
  const res = await getQuestionnaire(id)
  return {
    props: {
      id,
      questionnaire: res?.contents
    }
  }
}

type Props = {
  questionnaire: []
}

const Apply: FC<Props> = ({
  questionnaire
}) => {
  return (
    <Paper shadow={"sm"} p="md" m={"md"}>
      <div className="grid grid-cols-12 gap-y-6">
        {questionnaire && questionnaire.map((apply: RecordProps, index) => {
          return (
            <div key={index} className="col-span-12">
              {(() => {
                if (apply.type === "text") {
                  return (
                    <TextInput label={apply.label} />
                  )
                } else if (apply.type === "textarea") {
                  return (
                    <TextArea label={apply.label} />
                  )
                } else if (apply.type === "checkbox") {
                  return (
                    <CheckBox label={apply.label} content={apply.content} />
                  )
                } else if (apply.type === "radio") {
                  return (
                    <Radio label={apply.label} content={apply.content} />
                  )
                } else if (apply.type === "select") {
                  return (
                    <Select label={apply.label} content={apply.content} />
                  )
                } else if (apply.type === "multi") {
                  return (
                    <Multi label={apply.label} content={apply.content} />
                  )
                } else if (apply.type === "date") {
                  return (
                    <Date label={apply.label} />
                  )
                }
              })()}
            </div>
          )
        })}
      </div>
    </Paper>
  )
}

export default Apply