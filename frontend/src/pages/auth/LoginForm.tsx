import styles from '../form.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect, useContext } from 'react'

import { getUser, loginUser } from './api/index'
import AuthContext from '../context/AuthProvider'

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }
  const handleCreate = async () => {
    try {
      const res = await loginUser({ email, password })
      console.log('user', res.data)

      //setAuth({ user, pwd, roles, accessToken })

      const accessToken = res?.data?.accessToken
      // const roles = response?.data?.roles
      setAuth({ email, password, accessToken })
      setEmail('')
      setPassword('')

      navigate('/refresh')

      //clear state and controlled inputs
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          setErrMsg('No Server Response')
        } else if (err.response?.status === 409) {
          setErrMsg('Username Taken')
        } else {
          setErrMsg('Registration Failed')
        }
      }
    }
  }

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>

          <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button
            onClick={() => {
              handleCreate()
            }}
          >
            Create
          </button>
        </form>
      </section>
    </div>
  )
}
export default LoginForm
