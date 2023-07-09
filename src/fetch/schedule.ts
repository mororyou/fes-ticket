import { supabase } from '@/libs/supabase'

export const getSchedules = async (date: string) => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('date', date)

  if (error) throw new Error(error.message)

  return data
}

export const updateScheduleStatus = async (id: number, status: number) => {
  const { data, error } = await supabase
    .from('schedules')
    .update({
      status: status,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  return data
}