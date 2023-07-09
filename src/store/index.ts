import {
  ApplyState,
  ClientState,
  QuestionnaireState,
  ScheduleState,
} from '@/state/initialState'
import {
  EditedApply,
  EditedClient,
  EditedSchedule,
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
  // Schedule
  editedSchedule: EditedSchedule
  updatedEditedSchedule: (payload: EditedSchedule) => void
  resetEditedSchedule: () => void
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
        name: payload.name,
        url: payload.url,
        email: payload.email,
        dates: payload.dates,
        categories: payload.categories,
        content: payload.content,
        etc: payload.etc,
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

  // Schedule
  editedSchedule: ScheduleState,
  updatedEditedSchedule: (payload) =>
    set({
      editedSchedule: {
        id: payload.id,
        apply_id: payload.apply_id,
        title: payload.title,
        user: payload.user,
        date: payload.date,
        start: payload.start,
        end: payload.end,
        resourceId: payload.resourceId,
        url: payload.url,
        email: payload.email,
        contents: payload.contents,
        designer: payload.designer,
        engineer: payload.engineer,
        categories: payload.categories,
        content: payload.content,
        etc: payload.etc,
        status: payload.status,
      },
    }),
  resetEditedSchedule: () =>
    set({
      editedSchedule: ScheduleState,
    }),
}))

export default useStore
