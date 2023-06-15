import { supabase } from '@/libs/supabase'
import { Schedule } from '@/types/types'
import { useQuery } from 'react-query'

export const useQuerySchedules = () => {
  const getSchedules = async () => {
    const { data, error } = await supabase.from('schedules').select('*')

    if (error) throw new Error(error.message)

    return data
  }

  return useQuery<Schedule[], Error>({
    queryKey: ['schedules'],
    queryFn: getSchedules,
    staleTime: Infinity,
  })
}
