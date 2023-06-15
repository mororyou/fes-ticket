import { supabase } from '@/libs/supabase'

export const getClients = async (boothId: string) => {
  const { data, error } = await supabase
    .from('clients')
    .select('value:id, label:name')
    .eq('booth_id', boothId)
    .order('id', { ascending: true })

  if (error) throw new Error(error.message)

  return data
}
