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

export const getAppliesView = async (date: string) => {
  let view = ''
  switch (date) {
    case '2023-07-15':
      view = 'view_applies_filter_1day'
      break
    case '2023-07-16':
      view = 'view_applies_filter_2day'
      break
    case '2023-07-17':
      view = 'view_applies_filter_3day'
      break
    default:
      view = 'view_applies_filter_1day'
      break
  }
  const { data, error } = await supabase.from(view)

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
    .neq('status', 90)
    .neq('status', 99)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return data
}

export const getCancelApplies = async () => {
  const { data, error } = await supabase
    .from('applies')
    .select('*')
    .eq('status', 99)
    .order('created_at', { ascending: true })

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

