import { supabase } from "@/libs/supabase"
import useStore from "@/store"
import { Apply, EditedApply } from "@/types/types"
import { useRouter } from 'next/router'
import { useMutation } from "react-query"

export const useApplyMutate = () => {
  
  const router = useRouter()
  // Reset
  const reset = useStore((state) => state.resetEditedApply)

  // Insert
  const createApply = useMutation(
    async (apply: Omit<Apply, 'id' | 'uuid' | 'updated_at' | 'created_at'>) => {
      const { data, error } = await supabase.from('applies').insert(apply)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: async (data: any) => {
        const sendData = {
          uuid: data[0].uuid,
          name: data[0].name,
          email: data[0].email,
          url: data[0].url,
          dates: data[0].dates,
          date_details: data[0].date_details,
          contents: data[0].contents,
        }
        await fetch('/api/mail/reception', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        }).then(async (res) => {
          if (res.status === 200) {
            console.log('送信完了!!!')
            reset()
            router.push(`/apply/complete/${data[0].uuid}`)
          }
        })
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  // Update
  const updatedApply = useMutation(
    async (apply: EditedApply) => {
      const { data, error } = await supabase
        .from('applies')
        .update(apply)
        .eq('id', apply.id)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (data: any) => {
        router.push(`/apply/complete/${data[0].uuid}`)
        // reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  return {createApply, updatedApply}
}