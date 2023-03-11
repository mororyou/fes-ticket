import CheckBox from "@/components/common/form/CheckBox"
import Date from "@/components/common/form/Date"
import Multi from "@/components/common/form/Multi"
import Radio from "@/components/common/form/Radio"
import Select from "@/components/common/form/Select"
import TextArea from "@/components/common/form/TextArea"
import TextInput from "@/components/common/form/TextInput"
import { useAuthContext } from "@/context/AuthContext"
import { getQuestionnaire } from "@/fetch/questionnaire"
import ClientLayout from "@/layout/client"
import { RecordProps } from "@/types/types"
import { Paper } from "@mantine/core"
import { useEffect, useState } from "react"

const QuestionnairePreview = () => {
  const {currentUser} = useAuthContext()
  const [questionnaire, setQuestionnaire] = useState<[] | null>(null)

  useEffect(() => {
    const f = async () => {
      if(currentUser !== undefined && currentUser?.boothId !== null) {
        const res = await getQuestionnaire(currentUser?.boothId)
        setQuestionnaire(res?.contents)
      }
    }
    f()
  }, [])

  return (
    <ClientLayout title="申し込みフォーム - Preview" error={false}>
      <Paper shadow="xs" p="md">
        <h4 className="mb-4 border-b border-b-gray-700 border-opacity-60 pb-1">
          申し込みフォーム　プレビュー
        </h4>
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
    </ClientLayout>
  )
}

export default QuestionnairePreview

