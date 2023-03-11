import { QuestionnaireFrom } from "@/components/client/forms/Questionnaire"
import Title from "@/components/common/Title"
import { useQuestionnaireMutate } from "@/hooks/questionnaire/useMutate"
import ClientLayout from "@/layout/client"
import useStore from "@/store"
import { Paper } from '@mantine/core'
import { IconSignature } from '@tabler/icons'
import { useEffect } from "react"

const Questionnaire = () => {
  const edited = useStore((state) => state.editedQuestionnaire)
  const update = useStore((state) => state.updatedEditedQuestionnaire)
  const {createQuestionnaire, updateQuestionnaire} = useQuestionnaireMutate()

  useEffect(() => {
  }, [])
  
  return (
    <ClientLayout title="申し込みフォーム設定" error={false}>
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
            <QuestionnaireFrom
              edited={edited}
              update={update}
              createMutation={createQuestionnaire}
              updateMutation={updateQuestionnaire}
            />
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Questionnaire