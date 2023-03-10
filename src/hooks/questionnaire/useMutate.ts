import { supabase } from "@/libs/supabase"
import useStore from "@/store"
import { editedQuestionnaire, Questionnaire } from "@/types/types"
import { useMutation } from "react-query"

export const useQuestionnaireMutate = () => {
  // Reset
  const reset = useStore((state) => state.resetEditedQuestionnaire)

  // Insert
  const createQuestionnaire = useMutation(
    async(
      questionnaire: Omit<Questionnaire, "id" | "updated_at" | "created_at">
    ) => {
      const { data, error } =
        await supabase.from('questionnaires')
          .insert(questionnaire)
      
      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  // Update
  const updateQuestionnaire = useMutation(
    async(
      questionnaire: editedQuestionnaire
    ) => {
      const { data, error } = 
        await supabase.from('questionnaires')
          .update({
            contents: questionnaire.contents
          })
          .eq('id', questionnaire.id)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  return { createQuestionnaire, updateQuestionnaire }
}