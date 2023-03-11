import { getUserInfo } from "@/fetch/user";
import { onAuthStateChanged } from "@/libs/firebase/auth";
import { StateUser } from "@/types/types";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  currentUser: StateUser | undefined
  signInCheck: boolean
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  signInCheck: false  
})

type Props = {
  children: ReactNode
}

export const AuthProvider:FC<Props> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<StateUser | undefined>(undefined)
  const [signInCheck, setSignInCheck] = useState(false)

  useEffect(() => {
    onAuthStateChanged(async (user: StateUser) => {
      if (user) {
        const userInfo = await getUserInfo(user.uid)
        if (userInfo !== null) {
          user.role = userInfo.role
          user.booth = userInfo.booths.name
          user.boothId = userInfo.booths.id
        }
        setCurrentUser(user)
        setSignInCheck(true)
      } else {
        setSignInCheck(false)
      }
    })
  }, [])

  if (signInCheck) {
    return (
      <AuthContext.Provider value={{ currentUser, signInCheck }}>
        {children}
      </AuthContext.Provider>
    )
  } return (
    <>
      {children}
    </>
  )
}

export const useAuthContext = () => useContext(AuthContext)