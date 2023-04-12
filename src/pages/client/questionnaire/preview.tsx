import CheckBoxComponent from "@/components/common/form/CheckBox"
import DateComponent from "@/components/common/form/Date"
import MultiComponent from "@/components/common/form/Multi"
import RadioComponent from "@/components/common/form/Radio"
import SelectComponent from "@/components/common/form/Select"
import TextAreaComponent from "@/components/common/form/TextArea"
import TextInputComponent from "@/components/common/form/TextInput"
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
                      <TextInputComponent changeHandler={null} label={apply.label} name={index} type={apply.type} />
                    )
                  } else if (apply.type === "textarea") {
                    return (
                      <TextAreaComponent changeHandler={null} label={apply.label} name={index} type={apply.type}/>
                    )
                  } else if (apply.type === "checkbox") {
                    return (
                      <CheckBoxComponent changeHandler={null} label={apply.label} content={apply.content} name={index} type={apply.type}/>
                    )
                  } else if (apply.type === "radio") {
                    return (
                      <RadioComponent changeHandler={null} label={apply.label} content={apply.content} name={index} type={apply.type}/>
                    )
                  } else if (apply.type === "select") {
                    return (
                      <SelectComponent changeHandler={null} label={apply.label} content={apply.content} name={index} type={apply.type}/>
                    )
                  } else if (apply.type === "multi") {
                    return (
                      <MultiComponent changeHandler={null} label={apply.label} content={apply.content} name={index} type={apply.type}/>
                    )
                  } else if (apply.type === "date") {
                    return (
                      <DateComponent changeHandler={null} label={apply.label} name={index} type={apply.type}/>
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

