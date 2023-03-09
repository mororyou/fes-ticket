import { User } from "@/types/types"
import { Session } from "@supabase/supabase-js"
import { create } from "zustand"
type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  sessionUser: User | null
  setSessionUser: (payload: User | null) => void
}

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  sessionUser: null,
  setSessionUser: (payload) => set({sessionUser: payload})
}))

export default useStore