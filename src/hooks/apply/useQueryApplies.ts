import { supabase } from '@/libs/supabase'
import { Apply } from '@/types/types'
import { useQuery } from 'react-query'

export const useQueryApplies = (date: string) => {
  const getApplies = async () => {
    const { data, error } = await supabase
      .from('applies')
      .select('*')
      .eq('status', 1)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)

    return data
  }

  return useQuery<Apply[], Error>({
    queryKey: ['applies'],
    queryFn: getApplies,
    staleTime: Infinity,
  })
}
