import { QuestionnaireFrom } from "@/components/client/forms/Questionnaire"
import Title from "@/components/common/Title"
import { useAuthContext } from "@/context/AuthContext"
import { getQuestionnaire } from "@/fetch/questionnaire"
import { useQuestionnaireMutate } from "@/hooks/questionnaire/useMutate"
import ClientLayout from "@/layout/client"
import { Questionnaire } from "@/types/types"
import { Button, Paper } from '@mantine/core'
import { IconSignature } from '@tabler/icons'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Questionnaire = () => {
  const router = useRouter()
  const {createQuestionnaire, updateQuestionnaire} = useQuestionnaireMutate()
  const {currentUser} = useAuthContext()
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null)
  
  useEffect(() => {
    const f = async () => {
      if (currentUser !== undefined && currentUser?.boothId !== null) {
        const res = await getQuestionnaire(currentUser?.boothId)
        setQuestionnaire(res)
      }
    }
    f()
  }, [currentUser])
  
  return (
    <ClientLayout title="申し込みフォーム設定" error={false}>
      <Title
        title="申し込みフォーム設定"
        btn={
          <Button
            size="xs"
            color="teal"
            onClick={() => {
              router.push('/client/questionnaire/preview')
            }}
          >
            プレビュー
          </Button>
        }
        icon={<IconSignature size={24} className="mr-2 text-gray-700" />}
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Paper shadow="xs" p="md">
            <h4 className="mb-4 border-b border-b-gray-700 border-opacity-60 pb-1">
              フォーム項目
            </h4>
            <QuestionnaireFrom
              questionnaire={questionnaire}
              createMutation={createQuestionnaire}
              updateMutation={updateQuestionnaire}
              boothId={currentUser?.boothId as string}
            />
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Questionnaire