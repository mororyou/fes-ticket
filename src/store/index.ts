import { ApplyState, QuestionnaireState } from "@/state/initialState"
import { EditedApply, User, editedQuestionnaire } from "@/types/types"
import { Session } from "@supabase/supabase-js"
import { create } from "zustand"
type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  sessionUser: User | null
  setSessionUser: (payload: User | null) => void
  // Questionnaire
  editedQuestionnaire: editedQuestionnaire
  updatedEditedQuestionnaire: (payload: editedQuestionnaire) => void
  resetEditedQuestionnaire: () => void
  // Apply
  editedApply: EditedApply
  updatedEditedApply: (payload: EditedApply) => void
  resetEditedApply: () => void
}

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  sessionUser: null,
  setSessionUser: (payload) => set({ sessionUser: payload }),
  
  // Questionnaire
  editedQuestionnaire: QuestionnaireState,
  updatedEditedQuestionnaire: (payload) => 
    set({
      editedQuestionnaire: {
        id: payload.id,
        contents: payload.contents,
        delete_flg: payload.delete_flg
      },
    }),
  resetEditedQuestionnaire: () => 
    set({
      editedQuestionnaire: QuestionnaireState
    }),
  
  // Apply
  editedApply: ApplyState,
  updatedEditedApply: (payload) => 
    set({
      editedApply: {
        id: payload.id,
        date: payload.date,
        time: payload.time,
        name: payload.name,
        url: payload.url,
        contents: payload.contents,
        status: payload.status
      },
    }),
  resetEditedApply: () => {
    set({
      editedApply: ApplyState
    })
  }
}))

export default useStore