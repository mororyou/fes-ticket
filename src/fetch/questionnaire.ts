import { supabase } from "@/libs/supabase"

export const getQuestionnaire = async (BoothId: string) => {
  const { data, error } = await supabase
    .from('questionnaires')
    .select('*')
    .eq('booth_id', BoothId)
    .single()

  if (error) {
    return null
  }

  return data
}