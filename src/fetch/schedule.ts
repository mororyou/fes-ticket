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

export const updateScheduleUser = async (
  id: number,
  eng: string | undefined | null,
  deg: string | undefined | null
) => {
  const { data, error } = await supabase
    .from('schedules')
    .update({
      designer: deg,
      engineer: eng,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  return data
}

export const getYoyakuSchedules = async () => {
  const { data, error } = await supabase.from('view_yoyaku_tantou')

  if (error) throw new Error(error.message)

  return data
}