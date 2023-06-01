import { supabase } from '@/libs/supabase'

export const getSchedules = async (date: string) => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('date', date)

  if (error) throw new Error(error.message)

  return data
}
