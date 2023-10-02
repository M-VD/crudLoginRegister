import axios from 'axios'

const base = process.env.REACT_APP_PUBLIC_API_ENDPOINT
const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGYzNTdmYTljMzg4MDE4MTBlYTBmZjUiLCJzZXNzaW9uSUQiOiI2NGYzNWE5MTljMzg4MDE4MTBlYTEwMGIiLCJpYXQiOjE2OTM2NzAwMzMsImV4cCI6MTY5MzY3MDkzM30.URnscERQfRWbwgkyPrqi0OeekqrqxbZGVYbV-q-FYMo'

const userRegistersBase = `${base}/users`
const usersSessionsBase = `${base}/sessions`
export const axiosPrivate = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
export async function getUser(email: string) {
  return await axios.get(`${usersSessionsBase}/${email}`)
}
export const loginUser = async (payload: {
  email: String

  password: String
}) => {
  return await axios.post(usersSessionsBase, payload, {
    withCredentials: true,
  })
}
export const registerUser = async (payload: {
  email: String
  password: String
  passwordConfirmation: String
  firstName: String
  lastName: String
}) => {
  return await axios.post(userRegistersBase, payload, {
    withCredentials: true,
  })
}

export const refresh = async () => {
  return await axios.get(usersSessionsBase, {
    withCredentials: true,
    /* headers: {
      Authorization: `Bearer ${accessToken}`,
    },*/
  })
}
