import { supabase } from "@/libs/supabase"

export const getBooth = async (boothId: string) => {
  const { data, error } = await supabase
    .from('booths')
    .select('*')
    .eq('id', boothId)
    .single()
  
  if (error) {
    return null
  }

  return data
}