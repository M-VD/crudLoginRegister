import { useContext, useDebugValue } from 'react'
import AuthContext from '../../context/AuthProvider'

const useAuth = () => {
  const { auth } = useContext(AuthContext)
  //add a label to a custom hook in react dev tools
  useDebugValue(auth, (auth) => (auth?.email ? 'Logged In' : 'Logged Out'))
  return useContext(AuthContext)
}

export default useAuth
