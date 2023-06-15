import { supabase } from '@/libs/supabase'
import { Client } from '@/types/types'
import { useQuery } from 'react-query'

export const useQueryClientSelector = () => {
  const getClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('value:id, label:name')
      .order('id', { ascending: true })

    if (error) throw Error(error.message)

    return data
  }

  return useQuery<Client[], Error>({
    queryKey: ['clientSelector'],
    queryFn: getClients,
    staleTime: Infinity,
  })
}
