import { supabase } from '@/libs/supabase'
import { Client } from '@/types/types'
import { useQuery } from 'react-query'

export const useQueryClients = () => {
  const getClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      // .select('value:id, label:name')
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
