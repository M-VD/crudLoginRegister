import axios from 'axios'

const base = process.env.REACT_APP_PUBLIC_API_ENDPOINT

const userRegistersBase = `${base}/users`
const usersSessionsBase = `${base}/sessions`
const usersRefreshBase = `${base}/refresh`
export function loginUser(payload: { email: String; password: String }) {
  return axios.post(usersSessionsBase, payload, {
    withCredentials: true,
  })
}
export function registerUser(payload: {
  email: String
  password: String
  passwordConfirmation: String
  firstName: String
  lastName: String
}) {
  return axios.post(userRegistersBase, payload, {})
}

export const refresh = async () => {
  const response = await axios.get(usersRefreshBase, {
    withCredentials: true,
  })
}
export const axiosPrivate = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
