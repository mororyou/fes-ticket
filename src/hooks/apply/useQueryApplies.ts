import { supabase } from '@/libs/supabase'
import { Apply } from '@/types/types'
import { useQuery } from 'react-query'

export const useQueryApplies = (view: string) => {
  const getApplies = async () => {
    const { data, error } = await supabase.from(view)

    if (error) throw new Error(error.message)

    return data
  }

  return useQuery<Apply[], Error>({
    queryKey: ['applies'],
    queryFn: getApplies,
    staleTime: Infinity,
  })
}
