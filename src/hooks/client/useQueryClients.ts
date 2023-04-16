import { supabase } from '@/libs/supabase'
import { Client } from '@/types/types'
import { useQuery } from 'react-query'

export default function useQueryClient() {
  const getClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw Error(error.message)

    return data
  }

  return useQuery<Client[], Error>({
    queryKey: ['clients'],
    queryFn: getClients,
    staleTime: Infinity,
  })
}
