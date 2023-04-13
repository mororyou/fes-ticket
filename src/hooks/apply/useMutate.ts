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
    async(
      apply: Omit<Apply, "id" | "uuid" | "updated_at" | "created_at">
    ) => {
      const { data, error } = 
        await supabase.from('applies').insert(apply)
      
      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (data) => {
        router.push(`/apply/complete/${data[0].uuid}`)
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      }
    }
  )

  // Update
  const updatedApply = useMutation(
    async(
      apply: EditedApply
    ) => {
      const { data, error } = await supabase.from('applies')
        .update(apply)
        .eq('id', apply.id)
      
      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (data) => {
        router.push(`/apply/complete/${data[0].uuid}`)
        // reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      }
    }
  )

  return {createApply, updatedApply}
}