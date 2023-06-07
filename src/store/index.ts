import {
  ApplyState,
  ClientState,
  QuestionnaireState,
} from '@/state/initialState'
import {
  EditedApply,
  EditedClient,
  User,
  editedQuestionnaire,
} from '@/types/types'
import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
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
  // Client
  editedClient: EditedClient
  updatedEditedClient: (payload: EditedClient) => void
  resetEditedClient: () => void
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
        delete_flg: payload.delete_flg,
      },
    }),
  resetEditedQuestionnaire: () =>
    set({
      editedQuestionnaire: QuestionnaireState,
    }),

  // Apply
  editedApply: ApplyState,
  updatedEditedApply: (payload) =>
    set({
      editedApply: {
        id: payload.id,
        dates: payload.dates,
        time: payload.time,
        name: payload.name,
        url: payload.url,
        contents: payload.contents,
        status: payload.status,
      },
    }),
  resetEditedApply: () =>
    set({
      editedApply: ApplyState,
    }),

  // Client
  editedClient: ClientState,
  updatedEditedClient: (payload) =>
    set({
      editedClient: {
        id: payload.id,
        name: payload.name,
        url: payload.url,
        skill: payload.skill,
        date: payload.date,
        memo: payload.memo,
      },
    }),
  resetEditedClient: () =>
    set({
      editedClient: ClientState,
    }),
}))

export default useStore
