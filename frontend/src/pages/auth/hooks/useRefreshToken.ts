import axios from 'axios'
import useAuth from './useAuth'
const base = process.env.REACT_APP_PUBLIC_API_ENDPOINT
const usersrefresh = `${base}`
const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const response = await axios.get(`${usersrefresh}/sessions`, {
      withCredentials: true,
    })
    setAuth((prev: any) => {
      console.log('response', response)
      //console.log('prev', JSON.stringify(prev))
      //console.log('accessToken', response.data.accessToken)
      return {
        ...prev,
        //roles: response.data.roles,
        accessToken: response.data.accessToken,
      }
    })
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken
