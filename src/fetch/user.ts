import { supabase } from "@/libs/supabase"

export const getUserInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from('view_user_role')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (!error) {
    return data
  } else {
    return null
  }

}