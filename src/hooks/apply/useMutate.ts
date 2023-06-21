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
          url: data[0].url,
          email: data[0].email,
          dates: data[0].dates,
          categories: data[0].categories,
          content: data[0].content,
          etc: data[0].etc,
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
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  return {createApply, updatedApply}
}