import { supabase } from "@/libs/supabase"

export const getUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) throw Error(error.message)
  
  return data
}