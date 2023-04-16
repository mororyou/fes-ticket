import { supabase } from '@/libs/supabase'
import useStore from '@/store'
import { Client, EditedClient } from '@/types/types'
import { useMutation } from 'react-query'

export const useClientMutate = () => {
  const reset = useStore((state) => state.resetEditedClient)
  const createClient = useMutation(
    async (client: Omit<Client, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('clients').insert(client)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (data) => {
        console.log(data)
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        console.log(err.message)
        reset()
      },
    }
  )

  const updateClient = useMutation(
    async (client: EditedClient) => {
      const { data, error } = await supabase
        .from('clients')
        .update(client)
        .eq('id', client.id)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (data) => {
        console.log(data)
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        console.log(err.message)
        reset()
      },
    }
  )

  return { createClient, updateClient }
}
