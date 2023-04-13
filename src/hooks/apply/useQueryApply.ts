import { supabase } from "@/libs/supabase"
import { Apply } from "@/types/types"
import { useQuery } from "react-query"

export default function useQueryApply(ApplyId: number) {
  const getApply = async () => {
    const { data, error } = await supabase
      .from('applies')
      .select('*')
      .eq('id', ApplyId)
      .single()
    
    if (error) throw Error(error.message)

    return data
  }

  return useQuery<Apply, Error>({
    queryKey: ['apply'],
    queryFn: getApply,
    staleTime: Infinity
  })
}