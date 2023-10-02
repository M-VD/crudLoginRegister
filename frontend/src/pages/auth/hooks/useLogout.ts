import axios from 'axios'
import useAuth from './useAuth'
const base = process.env.REACT_APP_PUBLIC_API_ENDPOINT
const useLogout = () => {
  const usersLoginBase = `${base}/users`
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth({})
    try {
      const response = await axios('/logout', {
        withCredentials: true,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return logout
}

export default useLogout
