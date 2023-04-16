import { supabase } from '@/libs/supabase'
import { Client } from '@/types/types'
import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

export const useSubscribeClients = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const subsc = supabase
      .from('clients')
      .on('INSERT', (payload: SupabaseRealtimePayload<Client>) => {
        let previousClient = queryClient.getQueryData<Client[]>(['clients'])
        if (!previousClient) {
          previousClient = []
        }
        queryClient.setQueryData(
          ['clients'],
          [
            ...previousClient,
            {
              id: payload.new.id,
              booth_id: payload.new.booth_id,
              name: payload.new.name,
              url: payload.new.url,
              skill: payload.new.skill,
              date: payload.new.date,
              memo: payload.new.memo,
              created_at: payload.new.created_at,
            },
          ]
        )
      })
      .on('UPDATE', (payload: SupabaseRealtimePayload<Client>) => {
        let previousClient = queryClient.getQueryData<Client[]>(['clients'])
        if (!previousClient) {
          previousClient = []
        }
        queryClient.setQueryData(
          ['clients'],
          previousClient.map((client) =>
            client.id === payload.new.id
              ? {
                  id: payload.new.id,
                  booth_id: payload.new.booth_id,
                  name: payload.new.name,
                  url: payload.new.url,
                  skill: payload.new.skill,
                  date: payload.new.date,
                  memo: payload.new.memo,
                  created_at: payload.new.created_at,
                }
              : client
          )
        )
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<Client>) => {
        let previousClient = queryClient.getQueryData<Client[]>(['clients'])
        if (!previousClient) {
          previousClient = []
        }
        queryClient.setQueryData(
          ['client'],
          previousClient.filter((client) => client.id !== payload.old.id)
        )
      })
      .subscribe()

    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }
    return () => {
      removeSubscription()
    }
  }, [queryClient])
}
