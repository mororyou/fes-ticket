import { supabase } from "@/libs/supabase"

export const getApply = async (uuid: string) => {
  const { data, error } = await supabase
    .from('applies')
    .select('*')
    .eq('uuid', uuid)
    .single()

  if (error) throw new Error(error.message)

  return data
}

export const getNextSeq = async (boothId: string) => {
  const { data, error } = await supabase
    .from('applies')
    .select('seq')
    .eq('booth', boothId)
    .order('seq', { ascending: false })
    .limit(1)

  if (error) throw new Error(error.message)

  if (data?.length === 0) {
    return 1
  } else {
    return data[0].seq + 1
  }
}

export const getApplies = async (boothId: string, date: string) => {
  const { data, error } = await supabase
    .from('applies')
    .select('*')
    .neq('status', 99)

  if (error) throw new Error(error.message)

  return data
}

export const updateStatusApplies = async (applyId: string, status: number) => {
  const { data, error } = await supabase
    .from('applies')
    .update({ status: status })
    .eq('uuid', applyId)

  if (error) throw new Error(error.message)

  return data
}