import { supabase } from "@/libs/supabase"

export const getUserInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select(`
      role,
      booths (
        id,
        name
      )
    `)
    .eq('user_id', userId)
    .single()
  
  if (!error) {
    return data
  } else {
    return null
  }

}