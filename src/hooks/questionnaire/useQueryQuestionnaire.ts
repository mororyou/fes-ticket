import { supabase } from "@/libs/supabase"
import { Questionnaire } from "@/types/types"
import { useQuery } from "react-query"

export default function useQueryQuestionnaire(BoothId: string) {
  const getQuestionnaire = async () => {
    const { data, error } = await supabase
      .from('questionnaires')
      .select('*')
      .eq('booth_id', BoothId)
      .single()
    
    if (error) throw Error(error.message)

    return data
  }

  return useQuery<Questionnaire, Error>({
    queryKey: ['boothQuestionnaire'],
    queryFn: getQuestionnaire,
    staleTime: Infinity
  })
}
