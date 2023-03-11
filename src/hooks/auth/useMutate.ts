import firebaseApp from '@/libs/firebase/config'
import errorMsgHandler from '@/libs/firebase/error'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from 'react'
import { useMutation } from 'react-query'

export const useMutateAuth = () => {
  const auth = getAuth(firebaseApp)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const reset = () => {
    setEmail('')
    setPassword('')
  }

  // ログイン
  const loginMutation = useMutation(
    async () => {
      await signInWithEmailAndPassword(auth, email, password)
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (error: any) => {
        const msg = errorMsgHandler(error)
        alert(msg)
        reset()
      },
    }
  )

  // 会員登録
  const registerMutation = useMutation(
    async () => {
      await createUserWithEmailAndPassword(auth, email, password)
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (error: any) => {
        const msg = errorMsgHandler(error)
        alert(msg)
        reset()
      },
    }
  )

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation
  }
}
