import { createContext, useState } from 'react'
type Auth = {
  email?: String
  password?: String
  //roles?: Array<number>
  accessToken?: String
}

type AuthContextType = {
  auth: Auth | null
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>
}
type AuthContextProviderProps = {
  children: React.ReactNode
}
const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useState<Auth | null>(null)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
