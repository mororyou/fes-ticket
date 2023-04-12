import { supabase } from "@/libs/supabase"

export const getApply = async (uuid: string) => {
  const { data, error } = await supabase
    .from('applies')
    .select('*')
    .eq('uuid', uuid)
    .single()
  console.log()
  if (error) throw new Error(error.message)

  return data
}

export const getNextSeq = async (boothId: string) => {
 
  const { data, error } = await supabase
    .from('applies')
    .select('seq')
    .eq('booth', boothId)
    .order('seq', {ascending: false})
    .single()
  if (data === null) {
    return 1
  } else {
    if (error) throw new Error(error.message)
    return data.seq + 1
  }
}