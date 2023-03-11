import {
  getAuth, onAuthStateChanged as onFirebaseAuthStateChanged, signOut
} from 'firebase/auth'
import Router from 'next/router'
import firebaseApp from './config'

const auth = getAuth(firebaseApp)

export const onAuthStateChanged = async (callback: any) => {
  await onFirebaseAuthStateChanged(auth, async (user) => {
    const userInfo = user
      ? {
          uid: user?.uid,
          name: null,
          email: user?.email,
          role: null,
          image: null,
          boothId: "",
          booth: ""
        }
      : null
    if (Router.pathname === '/' && userInfo !== null) {
      Router.push('/client/dashboard')
    }
    callback(userInfo)
  })
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve(null)
        Router.push('/')
      })
      .catch((error) => reject(error))
  })
}
