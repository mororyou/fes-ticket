import { supabase } from '@/libs/supabase'
import useStore from '@/store'
import { EditedSchedule, Schedule } from '@/types/types'
import { useMutation, useQueryClient } from 'react-query'

export const useScheduleMutate = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedSchedule)

  const createSchedule = useMutation(
    async (schedule: Omit<Schedule, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('schedules').insert(schedule)
      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: async (res: any) => {
        const prevSchedules = queryClient.getQueryData<Schedule[]>([
          'schedules',
        ])
        if (prevSchedules) {
          queryClient.setQueryData(['schedules'], [...prevSchedules], res[0])
        }
        reset()
      },
      onError: async (err: any) => {
        console.log(err.message)
        reset()
      },
    }
  )

  const updatedSchedule = useMutation(
    async (schedule: EditedSchedule) => {
      const { data, error } = await supabase
        .from('schedules')
        .update(schedule)
        .eq('id', schedule.id)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (data: any) => {
        reset()
      },
      onError: (err: any) => {
        console.log(err.message)
        reset()
      },
    }
  )

  return { createSchedule, updatedSchedule }
}
